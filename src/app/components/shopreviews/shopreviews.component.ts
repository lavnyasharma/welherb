import { Component } from "@angular/core";

interface Rating {
  stars: number;
  count: number;
}

interface Review {
  id: number;
  author: string;
  avatar: string;
  content: string;
  stars: number;
}

@Component({
  selector: "app-shopreviews",
  templateUrl: "./shopreviews.component.html",
  styleUrls: ["./shopreviews.component.css"],
})
export class ShopreviewsComponent {
  ratings: Rating[] = [
    { stars: 5, count: 203 },
    { stars: 4, count: 1100 },
    { stars: 3, count: 20 },
    { stars: 2, count: 9 },
    { stars: 1, count: 1 },
  ];

  reviews: Review[] = [
    {
      id: 1,
      author: "Dr. Anupama",
      avatar: "assets/doctor-avatar.jpg",
      content:
        "When it comes to landing pages, popups, and even emails, shorter testimonials tend to be more effective.",
      stars: 5,
    },
    {
      id: 2,
      author: "Dr. Anupama",
      avatar: "assets/doctor-avatar.jpg",
      content:
        "When it comes to landing pages, popups, and even emails, shorter testimonials tend to be more effective.",
      stars: 5,
    },
    {
      id: 3,
      author: "Dr. Anupama",
      avatar: "assets/doctor-avatar.jpg",
      content:
        "When it comes to landing pages, popups, and even emails, shorter testimonials tend to be more effective.",
      stars: 5,
    },
  ];

  newReview = {
    name: "",
    email: "",
    review: "",
    rating: 5,
  };

  getStarsArray(count: number): number[] {
    return Array(5)
      .fill(0)
      .map((_, i) => (i < count ? 1 : 0));
  }

  getTotalRatings(): number {
    return this.ratings.reduce((total, rating) => total + rating.count, 0);
  }

  getAverageRating(): number {
    const total = this.getTotalRatings();
    const weighted = this.ratings.reduce(
      (sum, rating) => sum + rating.stars * rating.count,
      0
    );
    return total > 0 ? weighted / total : 0;
  }

  getRatingPercentage(count: number): number {
    const total = this.getTotalRatings();
    return total > 0 ? (count / total) * 100 : 0;
  }

  submitReview() {
    if (this.newReview.name && this.newReview.email && this.newReview.review) {
      // Handle review submission
      console.log("Review submitted:", this.newReview);
      // Reset form
      this.newReview = {
        name: "",
        email: "",
        review: "",
        rating: 5,
      };
    }
  }

  setRating(rating: number) {
    this.newReview.rating = rating;
  }
}
