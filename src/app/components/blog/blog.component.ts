import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Carousel } from 'primeng/carousel';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit, OnDestroy {
  @ViewChild('blogCarousel') carousel!: Carousel;
  
  activeIndex: number = 0;
  autoplayInterval: any;
  
  // Blog data matching the image design
  blogs = [
    {
      title: 'Anupans often work synergistically with the medicine',
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop&crop=center',
      category: 'Nutrition',
      author: {
        name: 'Rasaura',
        avatar: ''
      },
      views: 'View'
    },
    {
      title: 'Anupans often work synergistically with the medicine',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center',
      category: 'Nutrition',
      author: {
        name: 'Rasaura',
        avatar: ''
      },
      views: 'View'
    },
    {
      title: 'Anupans often work synergistically with the medicine',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop&crop=center',
      category: 'Nutrition',
      author: {
        name: 'Rasaura',
        avatar: ''
      },
      views: 'View'
    },
    {
      title: 'Understanding Ayurvedic Principles in Modern Life',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center',
      category: 'Wellness',
      author: {
        name: 'Rasaura',
        avatar: ''
      },
      views: 'View'
    },
    {
      title: 'Natural Remedies for Better Health',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&crop=center',
      category: 'Remedies',
      author: {
        name: 'Rasaura',
        avatar: ''
      },
      views: 'View'
    }
  ];

  // Responsive options for different screen sizes
  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  ngOnInit() {
    // Start autoplay
    this.startAutoplay();
  }

  ngOnDestroy() {
    // Clean up autoplay interval
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
  }

  /**
   * Update active index when carousel page changes
   */
  updateActiveIndex(event: any) {
    this.activeIndex = event.page ?? 0;
    this.resetAutoplay();
  }

  /**
   * Navigate to previous slide
   */
  previousSlide() {
    if (this.carousel) {
      this.carousel.navBackward(new MouseEvent('click'));
    }
    this.resetAutoplay();
  }

  /**
   * Navigate to next slide
   */
  nextSlide() {
    if (this.carousel) {
      this.carousel.navForward(new MouseEvent('click'));
    }
    this.resetAutoplay();
  }

  /**
   * Go to specific slide
   */
  goToSlide(index: number) {
    if (this.carousel && index !== this.activeIndex) {
      const currentPage = this.activeIndex;
      const targetPage = index;
      
      if (targetPage > currentPage) {
        // Navigate forward
        for (let i = currentPage; i < targetPage; i++) {
          setTimeout(() => {
            this.carousel.navForward(new MouseEvent('click'));
          }, (i - currentPage) * 100);
        }
      } else {
        // Navigate backward
        for (let i = currentPage; i > targetPage; i--) {
          setTimeout(() => {
            this.carousel.navBackward(new MouseEvent('click'));
          }, (currentPage - i) * 100);
        }
      }
    }
    this.resetAutoplay();
  }

  /**
   * Start autoplay functionality
   */
  private startAutoplay() {
    this.autoplayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // 5 seconds
  }

  /**
   * Reset autoplay timer
   */
  private resetAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
    this.startAutoplay();
  }

  /**
   * Handle touch/swipe events for mobile
   */
  onTouchStart(event: TouchEvent) {
    // Store initial touch position for swipe detection
    const touch = event.touches[0];
    (event.target as any).touchStartX = touch.clientX;
  }

  onTouchEnd(event: TouchEvent) {
    // Handle swipe gesture
    const touch = event.changedTouches[0];
    const startX = (event.target as any).touchStartX;
    const endX = touch.clientX;
    const diffX = startX - endX;

    // Minimum swipe distance
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        this.nextSlide();
      } else {
        this.previousSlide();
      }
    }
  }

  /**
   * Handle keyboard navigation
   */
  onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        this.previousSlide();
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.nextSlide();
        break;
      case 'Home':
        event.preventDefault();
        this.goToSlide(0);
        break;
      case 'End':
        event.preventDefault();
        this.goToSlide(this.blogs.length - 1);
        break;
    }
  }

  /**
   * Handle blog card click
   */
  onBlogClick(blog: any, index: number) {
    console.log('Blog clicked:', blog);
    // Navigate to full blog post
    // Example: this.router.navigate(['/blog', blog.slug]);
  }

  /**
   * Handle more blogs button click
   */
  onMoreBlogsClick() {
    console.log('More blogs clicked');
    // Navigate to blog listing page
    // Example: this.router.navigate(['/blogs']);
  }

  /**
   * Track by function for performance optimization
   */
  trackByBlog(index: number, blog: any) {
    return blog.title || index;
  }
}