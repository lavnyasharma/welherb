import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

interface Review {
  id: number;
  name: string;
  image: string;
  benefit: string;
  quote: string;
  rating: number;
  type: 'esr' | 'digestick';
}

@Component({
  selector: 'app-homereviews',
  templateUrl: './homereviews.component.html',
  styleUrl: './homereviews.component.css'
})
export class HomereviewsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('carouselTrack') carouselTrack!: ElementRef;

  reviews: Review[] = [
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

  displayReviews: Review[] = [];
  private animationFrame: number = 0;
  private scrollPosition: number = 0;
  private scrollSpeed: number = 0.5;
  progressPosition: number = 0; // Tracks the green line position (0-300%)

  ngOnInit(): void {
    // Create multiple copies for infinite scroll
    this.displayReviews = [...this.reviews, ...this.reviews, ...this.reviews];
  }

  ngAfterViewInit(): void {
    this.startAutoScroll();
  }

  ngOnDestroy(): void {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }

  private startAutoScroll(): void {
    const animate = () => {
      this.scrollPosition += this.scrollSpeed;
      
      if (this.carouselTrack) {
        const track = this.carouselTrack.nativeElement;
        const cardWidth = 400; // Approximate width of one card + gap
        const resetPoint = this.reviews.length * cardWidth;

        if (this.scrollPosition >= resetPoint) {
          this.scrollPosition = 0;
        }

        track.style.transform = `translateX(-${this.scrollPosition}px)`;

        // Update progress line position to sync with carousel
        // Progress line should move proportionally with the carousel (0% to 300% range for 25% width indicator)
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
}