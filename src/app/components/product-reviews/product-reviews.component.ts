import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-product-reviews",
  templateUrl: "./product-reviews.component.html",
  styleUrls: ["./product-reviews.component.css"],
})
export class ProductReviewsComponent implements OnInit {
  @Input() ratingDistribution: any[] = [];
  @Input() detailedReviews: any[] = [];

  // Pagination
  currentPage: number = 1;

  constructor() {}

  ngOnInit(): void {}

  getStarsArray(count: number): number[] {
    return Array(5)
      .fill(0)
      .map((_, i) => (i < count ? 1 : 0));
  }
}
