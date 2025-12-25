import { Injectable } from "@angular/core";
import { BehaviorSubject, forkJoin } from "rxjs";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private cartItems: string[] = [];
  private cartItemsSubject = new BehaviorSubject<string[]>([]); // BehaviorSubject holds the latest value
  cartLoaded = new BehaviorSubject<boolean>(false);

  cartItems$ = this.cartItemsSubject.asObservable();

  constructor(private apiService: ApiService) {
    this.loadCartItems();
  }

  loadCartItems() {
    const token = localStorage.getItem("auth_token");
    if (token) {
      this.apiService.getCartItems().subscribe(
        (items: any[]) => {
          console.log("Cart API Response:", items);
          this.cartItems = items.map((item) => item._id);
          console.log("Cart Item IDs:", this.cartItems);
          this.cartItemsSubject.next([...this.cartItems]);
          this.cartLoaded.next(true);
        },
        (error) => {
          console.error("Error fetching cart items:", error);
          this.cartLoaded.next(true);
        }
      );
    } else {
      // Load from local storage
      const localCart = JSON.parse(localStorage.getItem("dummy_cart") || "[]");
      this.cartItems = localCart.map((item: any) => item.productId);
      this.cartItemsSubject.next([...this.cartItems]);
      this.cartLoaded.next(true);
    }
  }

  addToCart(productId: string, size: string) {
    const token = localStorage.getItem("auth_token");
    if (token) {
      // Authenticated: Call API
      if (!this.cartItems.includes(productId)) {
        this.apiService.addToCart(productId, size).subscribe(() => {
          this.cartItems.push(productId);
          this.cartItemsSubject.next([...this.cartItems]);
          console.log(
            "Product added to cart (API). Current cart:",
            this.cartItems
          );
        });
      }
    } else {
      // Unauthenticated: Use Local Storage
      let localCart = JSON.parse(localStorage.getItem("dummy_cart") || "[]");
      if (!localCart.some((item: any) => item.productId === productId)) {
        localCart.push({ productId, size });
        localStorage.setItem("dummy_cart", JSON.stringify(localCart));

        this.cartItems.push(productId);
        this.cartItemsSubject.next([...this.cartItems]);
        console.log(
          "Product added to cart (Local). Current cart:",
          this.cartItems
        );
      }
    }
  }

  removeFromCart(productId: string) {
    const token = localStorage.getItem("auth_token");
    if (token) {
      this.apiService.removeCartItem(productId).subscribe(() => {
        this.cartItems = this.cartItems.filter((id) => id !== productId);
        this.cartItemsSubject.next([...this.cartItems]);
      });
    } else {
      // Remove from Local Storage
      let localCart = JSON.parse(localStorage.getItem("dummy_cart") || "[]");
      localCart = localCart.filter((item: any) => item.productId !== productId);
      localStorage.setItem("dummy_cart", JSON.stringify(localCart));

      this.cartItems = this.cartItems.filter((id) => id !== productId);
      this.cartItemsSubject.next([...this.cartItems]);
    }
  }

  syncLocalCart() {
    const localCart = JSON.parse(localStorage.getItem("dummy_cart") || "[]");
    if (localCart.length === 0) {
      this.loadCartItems(); // Just refresh server items
      return;
    }

    const observables = localCart.map((item: any) =>
      this.apiService.addToCart(item.productId, item.size)
    );

    // Using forkJoin to wait for all additions
    forkJoin(observables).subscribe({
      next: () => {
        console.log("Synced local cart to server.");
        localStorage.removeItem("dummy_cart");
        this.loadCartItems(); // Reload from server to get merged state
      },
      error: (err) => {
        console.error("Sync failed", err);
        this.loadCartItems();
      },
    });
  }

  clearCart() {
    this.cartItems = [];
    this.cartItemsSubject.next([...this.cartItems]);
  }

  isProductInCart(productId: string): boolean {
    return this.cartItems.includes(productId);
  }
}
