import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostListener,
  Input,
} from "@angular/core";

export interface Review {
  id: number;
  name: string;
  image: string;
  benefit: string;
  quote: string;
  rating: number;
  type: "esr" | "digestick";
}

@Component({
  selector: "app-reviews-carousel",
  templateUrl: "./reviews-carousel.component.html",
  styleUrls: ["./reviews-carousel.component.css"],
})
export class ReviewsCarouselComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @ViewChild("carouselTrack") carouselTrack!: ElementRef;
  @ViewChild("progressLine") progressLine!: ElementRef;

  @Input() reviews: Review[] = [
    {
      id: 1,
      name: "Rajeev Singh",
      image:
        "assets/happy-man-student-with-afro-hairdo-shows-white-teeth-being-good-mood-after-classes.svg",
      benefit: "Benefited from ESR COUNT",
      quote: "It has reduced my mom's ESR to normal in 1 month!",
      rating: 5,
      type: "esr",
    },
    {
      id: 2,
      name: "Priya Sharma",
      image:
        "assets/happy-man-student-with-afro-hairdo-shows-white-teeth-being-good-mood-after-classes.svg",
      benefit: "Benefited from DIGESTICK",
      quote:
        "Good for body pains, inflammation, ESR...our whole family uses without second thought!",
      rating: 5,
      type: "digestick",
    },
    {
      id: 3,
      name: "Amit Kumar",
      image:
        "assets/happy-man-student-with-afro-hairdo-shows-white-teeth-being-good-mood-after-classes.svg",
      benefit: "Benefited from ESR COUNT",
      quote:
        "Amazing results! My inflammation markers improved significantly within weeks.",
      rating: 5,
      type: "esr",
    },
    {
      id: 4,
      name: "Sneha Patel",
      image:
        "assets/happy-man-student-with-afro-hairdo-shows-white-teeth-being-good-mood-after-classes.svg",
      benefit: "Benefited from DIGESTICK",
      quote:
        "Excellent for digestion and overall wellness. Highly recommended!",
      rating: 5,
      type: "digestick",
    },
  ];

  displayReviews: Review[] = [];
  private animationFrame: number = 0;
  private scrollPosition: number = 0;
  private scrollSpeed: number = 0.5;
  progressPosition: number = 0;
  private isDragging: boolean = false;
  private isAutoScrollPaused: boolean = false;
  private cardWidth: number = 400;

  ngOnInit(): void {
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
      if (!this.isAutoScrollPaused) {
        this.scrollPosition += this.scrollSpeed;

        if (this.carouselTrack) {
          const track = this.carouselTrack.nativeElement;
          const resetPoint = this.reviews.length * this.cardWidth;

          if (this.scrollPosition >= resetPoint) {
            this.scrollPosition = 0;
          }

          track.style.transform = `translateX(-${this.scrollPosition}px)`;
          const progressPercentage = (this.scrollPosition / resetPoint) * 300;
          this.progressPosition = progressPercentage;
        }
      }

      this.animationFrame = requestAnimationFrame(animate);
    };

    this.animationFrame = requestAnimationFrame(animate);
  }

  onProgressClick(event: MouseEvent): void {
    if (this.isDragging) return;
    this.updateCarouselFromProgress(event);
  }

  onProgressMouseDown(event: MouseEvent): void {
    this.isDragging = true;
    this.isAutoScrollPaused = true;
    this.updateCarouselFromProgress(event);
  }

  @HostListener("document:mousemove", ["$event"])
  onMouseMove(event: MouseEvent): void {
    if (this.isDragging) {
      this.updateCarouselFromProgress(event);
    }
  }

  @HostListener("document:mouseup")
  onMouseUp(): void {
    if (this.isDragging) {
      this.isDragging = false;
      // Resume auto-scroll after 2 seconds
      setTimeout(() => {
        this.isAutoScrollPaused = false;
      }, 2000);
    }
  }

  onWheel(event: WheelEvent): void {
    // Only handle horizontal scrolling (trackpad side swipe)
    // Allow vertical scrolling to pass through for page scroll
    if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) {
      return; // Let vertical scroll pass through
    }

    event.preventDefault();
    this.isAutoScrollPaused = true;

    this.scrollPosition += event.deltaX * 0.5;

    if (this.carouselTrack) {
      const track = this.carouselTrack.nativeElement;
      const resetPoint = this.reviews.length * this.cardWidth;

      if (this.scrollPosition >= resetPoint) {
        this.scrollPosition = 0;
      } else if (this.scrollPosition < 0) {
        this.scrollPosition = resetPoint - 1;
      }

      track.style.transform = `translateX(-${this.scrollPosition}px)`;
      this.progressPosition = (this.scrollPosition / resetPoint) * 300;
    }

    // Resume auto-scroll after 2 seconds of inactivity
    clearTimeout((this as any).scrollTimeout);
    (this as any).scrollTimeout = setTimeout(() => {
      this.isAutoScrollPaused = false;
    }, 2000);
  }

  private updateCarouselFromProgress(event: MouseEvent): void {
    if (!this.progressLine || !this.carouselTrack) return;

    const progressElement = this.progressLine.nativeElement;
    const rect = progressElement.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));

    const resetPoint = this.reviews.length * this.cardWidth;
    this.scrollPosition = percentage * resetPoint;

    const track = this.carouselTrack.nativeElement;
    track.style.transform = `translateX(-${this.scrollPosition}px)`;

    this.progressPosition = percentage * 300;
  }

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }
}
