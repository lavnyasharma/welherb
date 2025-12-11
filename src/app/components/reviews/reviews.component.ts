import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

interface CarouselReview {
  id: number;
  name: string;
  image: string;
  benefit: string;
  quote: string;
  rating: number;
  type: 'esr' | 'digestick';
}

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
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent implements OnInit, OnDestroy, AfterViewInit {
  // --- Home Reviews Carousel Data & Logic ---
  @ViewChild('carouselTrack') carouselTrack!: ElementRef;

  carouselReviews: CarouselReview[] = [
    {
      id: 1,
      name: 'Rajeev Singh',
      image: 'assets/images/rajeev.jpg',
      benefit: 'Benefited from ESR COUNT',
      quote: 'It has reduced my mom\'s ESR to normal in 1 month!',
      rating: 5,
      type: 'esr'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      image: 'assets/images/priya.jpg',
      benefit: 'Benefited from DIGESTICK',
      quote: 'Good for body pains, inflammation, ESR...our whole family uses without second thought!',
      rating: 5,
      type: 'digestick'
    },
    {
      id: 3,
      name: 'Amit Kumar',
      image: 'assets/images/amit.jpg',
      benefit: 'Benefited from ESR COUNT',
      quote: 'Amazing results! My inflammation markers improved significantly within weeks.',
      rating: 5,
      type: 'esr'
    },
    {
      id: 4,
      name: 'Sneha Patel',
      image: 'assets/images/sneha.jpg',
      benefit: 'Benefited from DIGESTICK',
      quote: 'Excellent for digestion and overall wellness. Highly recommended!',
      rating: 5,
      type: 'digestick'
    }
  ];

  displayReviews: CarouselReview[] = [];
  private animationFrame: number = 0;
  private scrollPosition: number = 0;
  private scrollSpeed: number = 0.5;
  progressPosition: number = 0; 

  // --- Detailed Reviews Data ---
  ratingDistribution: RatingDistribution[] = [
    { stars: 5.0, percentage: 80 },
    { stars: 4.0, percentage: 15 },
    { stars: 3.0, percentage: 5 },
    { stars: 2.0, percentage: 2 },
    { stars: 1.0, percentage: 0 }
  ];

  detailedReviews: DetailedReview[] = [
    {
      id: 1,
      initial: 'S',
      name: 'Sheetal Soni',
      date: '08/11/2025',
      stars: 5,
      title: 'Safe & Effective Ayurveda',
      content: 'After trying several remedies without success, I finally found an Ayurvedic medicine that delivers genuine results. It feels completely safe, natural, and provides deep healing from within, improving overall balance, wellness, and long-term health for a healthier lifestyle.',
      verified: true
    },
    {
      id: 2,
      initial: 'S',
      name: 'Sheetal Soni',
      date: '08/11/2025',
      stars: 5,
      title: 'Safe & Effective Ayurveda',
      content: 'After trying several remedies without success, I finally found an Ayurvedic medicine that delivers genuine results. It feels completely safe, natural, and provides deep healing from within, improving overall balance, wellness.',
      verified: true
    },
    {
      id: 3,
      initial: 'S',
      name: 'Sheetal Soni',
      date: '08/11/2025',
      stars: 5,
      title: 'Safe & Effective Ayurveda',
      content: 'After trying several remedies without success, I finally found an Ayurvedic medicine that delivers genuine results. It feels completely safe, natural, and provides deep healing from within.',
      verified: true
    }
  ];

  // Pagination
  currentPage: number = 1;
  totalPages: number = 7;
  pages: number[] = [1, 2, 3, 4, 5, 6, 7]; // Simplified for now

  ngOnInit(): void {
    // Create multiple copies for infinite scroll for carousel
    this.displayReviews = [...this.carouselReviews, ...this.carouselReviews, ...this.carouselReviews];
  }

  ngAfterViewInit(): void {
    this.startAutoScroll();
  }

  ngOnDestroy(): void {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }

  // Carousel Logic
  private startAutoScroll(): void {
    const animate = () => {
      this.scrollPosition += this.scrollSpeed;
      
      if (this.carouselTrack) {
        const track = this.carouselTrack.nativeElement;
        const cardWidth = 400; 
        const resetPoint = this.carouselReviews.length * cardWidth;

        if (this.scrollPosition >= resetPoint) {
          this.scrollPosition = 0;
        }

        track.style.transform = `translateX(-${this.scrollPosition}px)`;

        const progressPercentage = (this.scrollPosition / resetPoint) * 300;
        this.progressPosition = progressPercentage;
      }

      this.animationFrame = requestAnimationFrame(animate);
    };

    this.animationFrame = requestAnimationFrame(animate);
  }

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }

  getStarsArray(count: number): number[] {
    return Array(5).fill(0).map((_, i) => i < count ? 1 : 0);
  }
}