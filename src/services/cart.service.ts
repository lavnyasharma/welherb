import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: string[] = [];
  private cartItemsSubject = new BehaviorSubject<string[]>([]); // BehaviorSubject holds the latest value
  cartLoaded = new BehaviorSubject<boolean>(false);

  cartItems$ = this.cartItemsSubject.asObservable();

  constructor(private apiService: ApiService) {
    this.loadCartItems();
  }

  private loadCartItems() {
    this.apiService.getCartItems().subscribe(
      (items: any[]) => {
        console.log('API Response:', items);
        this.cartItems = items.map(item => item._id);
        this.cartItemsSubject.next([...this.cartItems]);
        this.cartLoaded.next(true); // <-- cart is loaded
      },
      (error) => {
        console.error('Error fetching cart items:', error);
        this.cartLoaded.next(true); // even on error, to avoid infinite loading
      }
    );
  }
  

  addToCart(productId: string, size: string){
    if (!this.cartItems.includes(productId)) {
      this.apiService.addToCart(productId, size).subscribe(() => {
        this.cartItems.push(productId);
        this.cartItemsSubject.next([...this.cartItems]); // Emit updated cart data
      });
    }
  }
  removeFromCart(productId: string) {
    this.apiService.removeCartItem(productId).subscribe(() => {
      this.cartItems = this.cartItems.filter(id => id !== productId);
      this.cartItemsSubject.next([...this.cartItems]); // Emit updated cart
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
