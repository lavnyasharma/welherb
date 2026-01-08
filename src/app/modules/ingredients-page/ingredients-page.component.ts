import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../services/api.service";

export interface IngredientDetail {
  name: string;
  image: string;
  benefits: string[];
  great_for: string[];
  description?: string;
  foundIn?: {
    name: string;
    image: string;
    price: string;
  }[];
}

@Component({
  selector: "app-ingredients-page",
  templateUrl: "./ingredients-page.component.html",
  styleUrl: "./ingredients-page.component.css",
})
export class IngredientsPageComponent implements OnInit {
  images: any[] = [];
  isLoading: boolean = true;
  isModalOpen: boolean = false;
  selectedIngredient: any = null;

  constructor(private apiservice: ApiService) {
    this.apiservice.ingredients$.subscribe((data) => {
      // Map the data to retrieve the full object
      this.images = data.map((item: any) => ({
        ...item,
        image: "/welherb" + item.url,
        // Ensure great_for is distinct if needed, or just use as is from API
      }));
      this.isLoading = false;
    });
  }

  ngOnInit(): void {
    this.apiservice.getIngredients();
  }

  // Track by function for better performance with *ngFor
  trackByName(index: number, item: any): string {
    return item.name;
  }

  // Handle ingredient card click
  onIngredientClick(ingredient: any): void {
    this.selectedIngredient = ingredient;
    this.isModalOpen = true;
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
  }

  // Handle modal close
  onModalClose(): void {
    this.isModalOpen = false;
    this.selectedIngredient = null;
    // Restore body scroll
    document.body.style.overflow = "auto";
  }

  // Handle backdrop click
  onBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.onModalClose();
    }
  }

  // Get ingredient detail for the selected ingredient
  getCurrentIngredientDetail(): IngredientDetail {
    if (this.selectedIngredient) {
      return this.selectedIngredient;
    }

    // Return a safe default if nothing is selected (though modal shouldn't open then)
    return {
      name: "",
      image: "",
      benefits: [],
      great_for: [],
    };
  }

  // Handle product check functionality
  checkProduct(product: any): void {
    // Add your product navigation logic here
    // For example: this.router.navigate(['/product', product.id]);
  }

  // Handle image loading errors
  onImageError(event: any): void {
    // You can set a default image here if needed
    // event.target.src = '/assets/images/default-ingredient.jpg';
  }
}
