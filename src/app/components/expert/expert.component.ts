import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

interface BlogPost {
  id: number;
  title: string;
  date: string;
  image: string;
  categories: string[];
  readTime: string;
}

interface EssentialReading {
  title: string;
  readTime: string;
  categories: string[];
}

@Component({
  selector: "app-expert",
  templateUrl: "./expert.component.html",
  styleUrl: "./expert.component.css",
})
export class ExpertComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}
  searchQuery: string = "";

  recentPosts: BlogPost[] = [
    {
      id: 1,
      title: "Anupans often work synergistically with the medicine",
      date: "18 June, 2025",
      image: "assets/images/blog1.jpg",
      categories: ["Nutrition", "Routine", "Yoga"],
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "Anupans often work synergistically with the medicine",
      date: "18 June, 2025",
      image: "assets/images/blog2.jpg",
      categories: ["Nutrition", "Routine", "Yoga"],
      readTime: "5 min read",
    },
    {
      id: 3,
      title: "Anupans often work synergistically with the medicine",
      date: "18 June, 2025",
      image: "assets/images/blog3.jpg",
      categories: ["Nutrition", "Routine", "Yoga"],
      readTime: "5 min read",
    },
  ];

  categories: string[] = [
    "Nutrition",
    "Routine",
    "Ingredients",
    "Daily Steps",
    "Yoga",
    "Health Concerns",
  ];

  essentialReadings: EssentialReading[] = [
    {
      title: "Anupans often work synergistically with the medicine",
      readTime: "5 min read",
      categories: ["Yoga", "Routine"],
    },
    {
      title: "Anupans often work synergistically with the medicine",
      readTime: "5 min read",
      categories: ["Yoga", "Routine"],
    },
    {
      title: "Anupans often work synergistically with the medicine",
      readTime: "5 min read",
      categories: ["Yoga", "Routine"],
    },
  ];

  onSearch(): void {
    // Implement search functionality here
  }

  onCategoryClick(category: string): void {
    // Implement category filtering here
  }

  onViewMore(): void {
    this.router.navigate(["/blogs-open"]);
  }

  onPostClick(post: BlogPost): void {
    // Navigate to post detail page
  }
}
