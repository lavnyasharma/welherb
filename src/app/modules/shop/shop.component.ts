import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../../../services/api.service";
import { CartService } from "../../../services/cart.service";
import { ToastrService } from "ngx-toastr";
import { combineLatest, Observable } from "rxjs";
import { ProfileService, UserProfile } from "../../../services/profile.service";

@Component({
  selector: "app-shop",
  templateUrl: "./shop.component.html",
  styleUrls: ["./shop.component.css"],
})
export class ShopComponent implements OnInit {
  dosage: {
    morning?: string;
    afternoon?: string;
    evening?: string;
    error?: string;
  } = {};

  color = "#9ae2fa";
  product: any;
  productImages: string[] = [];
  selectedImage: string = "";
  selectedCapsule: number = 0;
  quantity = 1;
  isInCart: boolean = false;
  private productId: string | null = null;

  savedProfiles$: Observable<UserProfile[]>;
  selectedProfile$: Observable<UserProfile | null>;
  isDropdownOpen = false;
  isLoading = false; // Add loading state

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private cartService: CartService,
    private toastr: ToastrService,
    private router: Router,
    private profileService: ProfileService
  ) {
    this.savedProfiles$ = this.profileService.savedProfiles$;
    this.selectedProfile$ = this.profileService.selectedProfile$;
  }

  priceMap: any = {};
  showModal = false;

  ngOnInit(): void {
    // Subscribe to paramMap to handle route changes (same component navigation)
    this.route.paramMap.subscribe((params) => {
      const productId = params.get("id");
      this.productId = productId;

      if (productId) {
        // Reset state for new product
        this.isLoading = true; // Start loading
        this.selectedImage = "";
        this.selectedCapsule = 0;
        this.quantity = 1;
        this.product = null; // Clear previous product

        this.apiService.getOneProduct(productId).subscribe({
          next: (data: any) => {
            this.priceMap = data.price;

            // Determine valid sizes from size array or price keys
            const sizeOptions =
              data.size && data.size.length > 0
                ? data.size
                : Object.keys(data.price);
            const defaultSize = sizeOptions[0];

            this.product = {
              id: data._id,
              title: data.name,
              subtitle: data.description,
              faq: data.faq,
              price: data.price[defaultSize]?.price,
              priceMap: data.price,
              capsuleOptions: sizeOptions,
              dietary_advice: data.dietary_advice,
              helps_how: data.helps_how,
              helps_who: data.helps_who,
              product_benefits: data.product_benefits,
              important_info: data.important_info,
              ingredients: data.ingredients?.map((ing: any) => ({
                ...ing,
                image: "/welherb" + ing.url,
              })),
              how_to_use: data.how_to_use || [],
              features: {
                reduces: [
                  "Joint pain & inflammation",
                  "Knee pain, swelling & stiffness",
                ],
                calms: [
                  "Promotes to regenerate & lubricate joint cartilage",
                  "Supports joint mobility",
                ],
                boosts: [
                  "Improves joint mobility & strength",
                  "Helps relieve from arthritis, leg arthritis, PCOS and more",
                ],
              },
              rating: 4.9,
              reviews: 1000,
            };

            this.productImages = data.images?.map(
              (image: string) => "/welherb" + image
            ) || [
              "assets/arth-ease-main.jpg",
              "assets/arth-ease-thumb1.jpg",
              "assets/arth-ease-thumb2.jpg",
              "assets/arth-ease-thumb3.jpg",
              "assets/arth-ease-thumb4.jpg",
            ];
            this.selectedImage = this.productImages[0];
            this.selectedCapsule = Number(defaultSize) || 30;

            // Check cart status for the NEW product
            this.checkCartStatus();
            this.isLoading = false; // Stop loading on success
          },
          error: (err) => {
            console.error("Failed to load product", err);
            this.isLoading = false; // Stop loading on error
          },
        });
      }
    });

    // Also subscribe to cart changes to keep the button state updated
    combineLatest([
      this.cartService.cartLoaded,
      this.cartService.cartItems$,
    ]).subscribe(([loaded, cartItems]) => {
      if (loaded) {
        this.checkCartStatus();
      }
    });
  }

  checkCartStatus() {
    if (this.productId) {
      this.isInCart = this.cartService.isProductInCart(this.productId);
      console.log("Cart check:", {
        productId: this.productId,
        isInCart: this.isInCart,
      });
    }
  }

  addToCart() {
    if (!this.productId) return;

    if (!this.cartService.isProductInCart(this.productId)) {
      this.cartService.addToCart(
        this.productId,
        this.selectedCapsule.toString()
      );
      this.toastr.success("Product added to cart", "Success");
      this.isInCart = true;
    }
  }

  selectImage(image: string) {
    this.selectedImage = image;
  }

  selectCapsule(capsule: number | string) {
    this.selectedCapsule = Number(capsule);
    if (this.product && this.product.priceMap) {
      const priceData = this.product.priceMap[capsule];
      this.product.price =
        priceData && priceData.price
          ? priceData.price
          : priceData || this.product.price;
    }
  }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  openModal(id: string) {
    this.apiService.getDosage(id).subscribe(
      (data: any) => {
        if (data?.error) {
          this.dosage = { error: "No dosage available!" };
        } else {
          this.dosage = data;
        }
        this.showModal = true;
      },
      (error) => {
        this.dosage = { error: "No dosage available!" };
        this.showModal = true;
      }
    );
  }

  closeModal() {
    this.showModal = false;
  }

  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectProfile(profile: UserProfile): void {
    this.profileService.switchProfile(profile);
    this.isDropdownOpen = false;
    // Optionally reload dosage for new profile
    if (this.product?.id) {
      this.openModal(this.product.id);
    }
  }

  buyNow() {
    // Implement buy now functionality
    this.addToCart();
    this.router.navigate(["/cart"]);
  }
}
