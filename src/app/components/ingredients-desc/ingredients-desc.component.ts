import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  Input,
} from "@angular/core";

@Component({
  selector: "app-ingredients-desc",
  templateUrl: "./ingredients-desc.component.html",
  styleUrls: ["./ingredients-desc.component.css"],
})
export class IngredientsDescComponent implements AfterViewInit, OnDestroy {
  @Input() ingredients: any[] = [];

  activeCategories = ["Arth Ease"];
  categories = ["Arth Ease", "Arth Ease Afternoon"];

  ngAfterViewInit() {
    // Logic moved to infinite-carousel
  }

  ngOnDestroy() {
    // Logic moved to infinite-carousel
  }

  selectCategory(category: string) {
    if (this.activeCategories.includes(category)) {
      this.activeCategories = this.activeCategories.filter(
        (c) => c !== category
      );
    } else {
      this.activeCategories.push(category);
    }
  }

  isCategoryActive(category: string): boolean {
    return this.activeCategories.includes(category);
  }

  // New method to handle image loading errors
  onImageError(event: Event, ingredient: any) {
    const imgElement = event.target as HTMLImageElement;
    if (ingredient.fallbackImage) {
      imgElement.src = ingredient.fallbackImage;
    } else {
      // Show a placeholder or hide the image
      imgElement.style.display = "none";
      // You could also show a default placeholder image here
      imgElement.src = "assets/images/placeholder.jpg";
    }
  }

  // Method to check if image loads successfully
  onImageLoad(event: Event, ingredient: any) {}

  // flippedIngredients: Set<string> = new Set();
  activeFlippedId: string | null = null;

  onInfoClick(ingredient: any, event: Event) {
    event.stopPropagation();
    const id = ingredient.id || ingredient.name; // Fallback to name if id is missing

    // If currently flipped, unflip it. Else, flip this one (which implicitly unflips others)
    if (this.activeFlippedId === id) {
      this.activeFlippedId = null;
    } else {
      this.activeFlippedId = id;
    }
  }

  isFlipped(ingredient: any): boolean {
    const id = ingredient.id || ingredient.name;
    return this.activeFlippedId === id;
  }

  trackByFn(index: number, item: any) {
    return item.id;
  }
}
