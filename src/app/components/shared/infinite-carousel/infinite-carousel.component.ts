import {
  Component,
  Input,
  TemplateRef,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  HostListener,
  SimpleChanges,
  OnChanges,
} from "@angular/core";

@Component({
  selector: "app-infinite-carousel",
  templateUrl: "./infinite-carousel.component.html",
  styleUrls: ["./infinite-carousel.component.css"],
})
export class InfiniteCarouselComponent
  implements AfterViewInit, OnDestroy, OnChanges
{
  @Input() items: any[] = [];
  @Input() itemTemplate!: TemplateRef<any>;
  @Input() gap: number = 24;

  @ViewChild("carouselTrack") carouselTrack!: ElementRef;
  @ViewChild("progressLine") progressLine!: ElementRef;

  displayItems: any[] = [];
  animationFrame: number = 0;
  scrollPosition: number = 0;
  scrollSpeed: number = 0.5;
  progressPosition: number = 0;
  isDragging: boolean = false;
  isAutoScrollPaused: boolean = false;
  cardWidth: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["items"] && this.items) {
      // Triple the items for infinite loop effect
      this.displayItems = [...this.items, ...this.items, ...this.items];
      // Recalculate card width if view is initialized
      if (this.carouselTrack) {
        setTimeout(() => this.measureCardWidth(), 100);
      }
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.measureCardWidth();
      this.startAutoScroll();
    }, 100);
  }

  ngOnDestroy(): void {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }

  private measureCardWidth(): void {
    if (
      this.carouselTrack &&
      this.carouselTrack.nativeElement.children.length > 0
    ) {
      const firstCard = this.carouselTrack.nativeElement
        .children[0] as HTMLElement;
      this.cardWidth = firstCard.offsetWidth + this.gap;

      // Use a robust retry mechanism if width is 0 (not rendered yet)
      if (this.cardWidth <= this.gap) {
        requestAnimationFrame(() => this.measureCardWidth());
      }
    }
  }

  private startAutoScroll(): void {
    const animate = () => {
      // Retry measurement if 0
      if (this.cardWidth === 0) {
        this.measureCardWidth();
      }

      if (
        !this.isAutoScrollPaused &&
        this.cardWidth > 0 &&
        this.items.length > 0
      ) {
        this.scrollPosition += this.scrollSpeed;
        this.updateCarouselState();
      }
      this.animationFrame = requestAnimationFrame(animate);
    };
    this.animationFrame = requestAnimationFrame(animate);
  }

  private updateCarouselState(): void {
    if (this.carouselTrack) {
      const track = this.carouselTrack.nativeElement;
      const resetPoint = this.items.length * this.cardWidth;

      if (this.scrollPosition >= resetPoint) {
        this.scrollPosition = 0;
      } else if (this.scrollPosition < 0) {
        this.scrollPosition = resetPoint - 1;
      }

      track.style.transform = `translateX(-${this.scrollPosition}px)`;

      // Calculate progress (multiplied by 300 to match progress line range 0-300%)
      const progressPercentage = (this.scrollPosition / resetPoint) * 300;
      this.progressPosition = progressPercentage;
    }
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
      setTimeout(() => {
        this.isAutoScrollPaused = false;
      }, 2000);
    }
  }

  onWheel(event: WheelEvent): void {
    if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) {
      return;
    }

    event.preventDefault();
    this.isAutoScrollPaused = true;

    this.scrollPosition += event.deltaX * 0.5;

    // Ensure cardWidth is measured if not already
    if (this.cardWidth === 0) this.measureCardWidth();

    this.updateCarouselState();

    // Resume auto-scroll after 2 seconds
    clearTimeout((this as any).scrollTimeout);
    (this as any).scrollTimeout = setTimeout(() => {
      this.isAutoScrollPaused = false;
    }, 2000);
  }

  private updateCarouselFromProgress(event: MouseEvent): void {
    if (!this.progressLine || !this.carouselTrack || this.cardWidth === 0)
      return;

    const progressElement = this.progressLine.nativeElement;
    const rect = progressElement.getBoundingClientRect();
    const clickX = event.clientX - rect.left;

    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const resetPoint = this.items.length * this.cardWidth;

    this.scrollPosition = percentage * resetPoint;
    this.updateCarouselState();
  }
}
