import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "./../../../services/api.service";
import { CartService } from "./../../../services/cart.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.css"],
})
export class ProductCardComponent implements OnInit {
  mainCategories = ["Diabetes", "ESR", "Gut", "Joints", "Liver", "Thyroid"];
  categoryProductMap: { [key: string]: any[] } = {};
  selectedCategoryIndex: number = 0;
  subProducts: any[] = [];
  selectedProductIndex: number = 0;

  constructor(
    private apiservice: ApiService,
    private cartService: CartService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.apiservice.products$.subscribe((data) => {
      for (let cat of this.mainCategories) {
        this.categoryProductMap[cat] = data.filter(
          (prod: any) =>
            prod.categories &&
            prod.categories
              .map((c: string) => c.toLowerCase())
              .includes(cat.toLowerCase())
        );
      }
      this.updateSubProducts();
    });
  }

  ngOnInit() {
    this.apiservice.getHomeProducts();
  }

  selectCategory(index: number) {
    this.selectedCategoryIndex = index;
    this.selectedProductIndex = 0;
    this.updateSubProducts();
  }

  selectProduct(index: number) {
    this.selectedProductIndex = index;
  }

  updateSubProducts() {
    let cat = this.mainCategories[this.selectedCategoryIndex];
    this.subProducts = this.categoryProductMap[cat] || [];
  }

  get selectedProduct() {
    return this.subProducts[this.selectedProductIndex];
  }

  getBackgroundStyle() {
    if (this.selectedProduct?.background_image) {
      return {
        "background-image": `url(/welherb${this.selectedProduct.background_image})`,
        "background-size": "cover",
        "background-position": "center 60%",
        "background-repeat": "no-repeat",
      };
    }
    return { background: "#9AE2FA" }; /* Light blue fallback like in design */
  }

  learnMore() {
    if (this.selectedProduct?._id) {
      this.router.navigate(["/shop", this.selectedProduct._id]);
    }
  }

  buyNow() {
    if (!this.selectedProduct?._id) {
      this.toastr.error("Product not available", "Error");
      return;
    }

    // Check if user is authenticated
    const authToken = localStorage.getItem("auth_token");
    if (!authToken) {
      this.toastr.warning(
        "Please login to purchase",
        "Authentication Required"
      );
      this.router.navigate(["/login"]);
      return;
    }

    // Get the first available size or default size
    const size = this.selectedProduct.size?.[0] || "30";

    // Add to cart
    if (!this.cartService.isProductInCart(this.selectedProduct._id)) {
      this.cartService.addToCart(this.selectedProduct._id, size.toString());
      this.toastr.success("Product added to cart", "Success");
    }

    // Navigate to cart
    this.router.navigate(["/cart"]);
  }
}
