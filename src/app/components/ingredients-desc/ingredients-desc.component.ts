import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from "@angular/core";

@Component({
  selector: "app-ingredients-desc",
  templateUrl: "./ingredients-desc.component.html",
  styleUrls: ["./ingredients-desc.component.css"],
})
export class IngredientsDescComponent implements AfterViewInit, OnDestroy {
  // Updated ingredients with shorter, more reliable image URLs
  ingredients = [
    {
      id: 1,
      name: "Neem",
      image:
        "https://images.unsplash.com/photo-1527018796019-4e6c2d6d7ed1?w=400&h=400&fit=crop", // Placeholder - replace with your working URLs
      fallbackImage: "assets/images/neem.jpg", // Local fallback
      description:
        "Known for its antibacterial and purifying properties. Neem has been used in traditional medicine for centuries.",
    },
    {
      id: 2,
      name: "Guduchi",
      image:
        "https://images.unsplash.com/photo-1544047950-0c356e0e6c8b?w=400&h=400&fit=crop", // Placeholder
      fallbackImage: "assets/images/guduchi.jpg",
      description:
        "An Ayurvedic herb that supports vitality and immune system health. Also known as Giloy.",
    },
    {
      id: 3,
      name: "Brimestone",
      image:
        "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400&h=400&fit=crop", // Placeholder
      fallbackImage: "assets/images/brimestone.jpg",
      description:
        "A sulfur-based mineral with numerous health benefits. Used in traditional remedies for skin conditions.",
    },
    {
      id: 4,
      name: "Gum Arabic",
      image:
        "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=400&h=400&fit=crop", // Placeholder
      fallbackImage: "assets/images/gum-arabic.jpg",
      description:
        "A natural gum used for its soothing properties. Helps in digestive health and wound healing.",
    },
    {
      id: 5,
      name: "Sacred Fig",
      image:
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=400&fit=crop", // Placeholder
      fallbackImage: "assets/images/sacred-fig.jpg",
      description:
        "A revered plant with calming effects. Known for its spiritual significance and medicinal properties.",
    },
    {
      id: 6,
      name: "Ashwagandha",
      image:
        "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=400&fit=crop", // Placeholder
      fallbackImage: "assets/images/ashwagandha.jpg",
      description:
        "Helps in reducing stress and boosting immunity. An adaptogenic herb for overall wellness.",
    },
  ];

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

  onInfoClick(ingredient: any, event: Event) {
    event.stopPropagation();

    alert(ingredient.description);
  }

  trackByFn(index: number, item: any) {
    return item.id;
  }
}
