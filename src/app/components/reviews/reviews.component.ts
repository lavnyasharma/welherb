import { Component } from "@angular/core";

interface DetailedReview {
  id: number;
  initial: string;
  name: string;
  date: string;
  stars: number;
  title: string;
  content: string;
  verified: boolean;
}

interface RatingDistribution {
  stars: number; // e.g. 5.0
  percentage: number; // 0-100
}

@Component({
  selector: "app-reviews",
  templateUrl: "./reviews.component.html",
  styleUrl: "./reviews.component.css",
})
export class ReviewsComponent {
  // --- Detailed Reviews Data ---
  ratingDistribution: RatingDistribution[] = [
    { stars: 5.0, percentage: 80 },
    { stars: 4.0, percentage: 15 },
    { stars: 3.0, percentage: 5 },
    { stars: 2.0, percentage: 2 },
    { stars: 1.0, percentage: 0 },
  ];

  detailedReviews: DetailedReview[] = [
    {
      id: 1,
      initial: "S",
      name: "Sheetal Soni",
      date: "08/11/2025",
      stars: 5,
      title: "Safe & Effective Ayurveda",
      content:
        "After trying several remedies without success, I finally found an Ayurvedic medicine that delivers genuine results. It feels completely safe, natural, and provides deep healing from within, improving overall balance, wellness, and long-term health for a healthier lifestyle.",
      verified: true,
    },
    {
      id: 2,
      initial: "S",
      name: "Sheetal Soni",
      date: "08/11/2025",
      stars: 5,
      title: "Safe & Effective Ayurveda",
      content:
        "After trying several remedies without success, I finally found an Ayurvedic medicine that delivers genuine results. It feels completely safe, natural, and provides deep healing from within, improving overall balance, wellness.",
      verified: true,
    },
    {
      id: 3,
      initial: "S",
      name: "Sheetal Soni",
      date: "08/11/2025",
      stars: 5,
      title: "Safe & Effective Ayurveda",
      content:
        "After trying several remedies without success, I finally found an Ayurvedic medicine that delivers genuine results. It feels completely safe, natural, and provides deep healing from within.",
      verified: true,
    },
  ];

  // Pagination
  currentPage: number = 1;
  totalPages: number = 7;
  pages: number[] = [1, 2, 3, 4, 5, 6, 7]; // Simplified for now

  getStarsArray(count: number): number[] {
    return Array(5)
      .fill(0)
      .map((_, i) => (i < count ? 1 : 0));
  }
}
