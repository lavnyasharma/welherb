import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostListener,
} from "@angular/core";
import { ApiService } from "../../../services/api.service";

@Component({
  selector: "app-blog",
  templateUrl: "./blog.component.html",
  styleUrls: ["./blog.component.css"],
})
export class BlogComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild("carouselTrack") carouselTrack!: ElementRef;
  @ViewChild("progressLine") progressLine!: ElementRef;

  // Blog data - expanded with more sample blogs
  // Blog data
  blogs: any[] = [];
  displayBlogs: any[] = [];

  private animationFrame: number = 0;
  private scrollPosition: number = 0;
  private scrollSpeed: number = 0.5;
  progressPosition: number = 0;
  private isDragging: boolean = false;
  private isAutoScrollPaused: boolean = false;
  private cardWidth: number = 350;

  constructor(private apiService: ApiService) {} // Inject ApiService

  ngOnInit(): void {
    this.loadBlogs();
  }

  loadBlogs() {
    this.apiService.getRandomBlogs().subscribe({
      next: (data: any[]) => {
        // Map API response to match UI structure if needed
        // Assuming API returns array of objects close to what we need
        this.blogs = data.map((blog) => ({
          title: blog.title || blog.name, // Fallback if name is used
          image:
            blog.image ||
            blog.thumbnail ||
            "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop&crop=center",
          category: blog.category || "Wellness",
          author: blog.author || { name: "Rasaura", avatar: "" },
          views: "View",
          id: blog._id || blog.id,
        }));

        // Duplicate blogs for seamless infinite scroll
        this.displayBlogs = [...this.blogs, ...this.blogs, ...this.blogs];
      },
      error: (err) => {
        console.error("Failed to fetch blogs", err);
        // Fallback to empty or maybe keep some hardcoded as fallback?
        // User asked to remove hardcoded, so we leave it empty or handle error gracefully.
      },
    });
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
          const resetPoint = this.blogs.length * this.cardWidth;

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
      const resetPoint = this.blogs.length * this.cardWidth;

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

    const resetPoint = this.blogs.length * this.cardWidth;
    this.scrollPosition = percentage * resetPoint;

    const track = this.carouselTrack.nativeElement;
    track.style.transform = `translateX(-${this.scrollPosition}px)`;

    this.progressPosition = percentage * 300;
  }

  onBlogClick(blog: any, index: number): void {}

  onMoreBlogsClick(): void {}

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src =
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjhGOUZBIi8+CjxwYXRoIGQ9Ik0xNzUgMTI1SDE4NVYxMzVIMTc1VjEyNVoiIGZpbGw9IiM2Qzc1N0QiLz4KPHBhdGggZD0iTTE2NSAxNDVIMjM1VjE1NUgxNjVWMTQ1WiIgZmlsbD0iIzZDNzU3RCIvPgo8L3N2Zz4K";
    img.alt = "Image not available";
  }

  onImageLoad(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.style.opacity = "1";
  }
}
