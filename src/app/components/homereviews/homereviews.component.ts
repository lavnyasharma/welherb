import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-homereviews',
  templateUrl: './homereviews.component.html',
  styleUrl: './homereviews.component.css'
})
export class HomereviewsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  reviews = [
    {
      id: 1,
      name: 'Rajeev Singh',
      benefit: 'ESR COUNT',
      text: 'Good for body pains, inflammation, ESR...our whole family uses without second thought!',
      bgColor: '#d4e157',
      hasFullContent: false
    },
    {
      id: 2,
      name: 'Rajeev Singh',
      benefit: 'ESR COUNT',
      text: 'It has reduced my mom\'s ESR to normal in 1 month!',
      bgColor: '#e1bee7',
      hasFullContent: true
    },
    {
      id: 3,
      name: 'Rajeev Singh',
      benefit: 'ESR COUNT',
      text: 'Good for body pains, inflammation, ESR...our whole family uses without second thought!',
      bgColor: '#80deea',
      hasFullContent: false
    },
    {
      id: 4,
      name: 'Rajeev Singh',
      benefit: 'ESR COUNT',
      text: 'Excellent results! Highly recommended for inflammation issues.',
      bgColor: '#ffcc80',
      hasFullContent: false
    },
    {
      id: 5,
      name: 'Rajeev Singh',
      benefit: 'ESR COUNT',
      text: 'Amazing product! Our family has seen great improvements.',
      bgColor: '#f48fb1',
      hasFullContent: false
    }
  ];

  // Create infinite loop by tripling the array
  get infiniteReviews() {
    return [...this.reviews, ...this.reviews, ...this.reviews];
  }

  currentIndex = 6; // Start at middle set (second copy)
  autoSlideInterval: any;
  scrollTimeout: any;
  isScrollingProgrammatically = false;

  ngOnInit() {
    this.startAutoSlide();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.scrollToIndex(this.currentIndex, false);
      this.updateActiveCard();
    }, 100);

    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.addEventListener('scroll', () => {
        if (this.isScrollingProgrammatically) return;
        
        clearTimeout(this.scrollTimeout);
        this.scrollTimeout = setTimeout(() => {
          this.updateActiveCard();
          this.checkAndResetLoop();
        }, 100);
      });
    }
  }

  ngOnDestroy() {
    this.stopAutoSlide();
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
  }

  updateActiveCard() {
    const container = this.scrollContainer?.nativeElement;
    if (!container) return;

    const cards = container.querySelectorAll('.review-card');
    if (cards.length === 0) return;

    const containerRect = container.getBoundingClientRect();
    const viewportCenter = containerRect.left + containerRect.width / 2;

    let newActiveIndex = this.currentIndex;
    let minDistance = Infinity;

    cards.forEach((card: Element, index: number) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(viewportCenter - cardCenter);

      if (distance < minDistance) {
        minDistance = distance;
        newActiveIndex = index;
      }
    });

    if (newActiveIndex !== this.currentIndex) {
      this.currentIndex = newActiveIndex;
    }
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.next();
    }, 4000);
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  next() {
    this.currentIndex = this.currentIndex + 1;
    if (this.currentIndex >= this.infiniteReviews.length) {
      this.currentIndex = this.reviews.length; // Jump to second set
    }
    this.scrollToIndex(this.currentIndex, true);
  }

  prev() {
    this.currentIndex = this.currentIndex - 1;
    if (this.currentIndex < 0) {
      this.currentIndex = this.reviews.length - 1; // Jump to second set
    }
    this.scrollToIndex(this.currentIndex, true);
  }

  checkAndResetLoop() {
    const totalReviews = this.reviews.length;
    
    // If we're in the first set, jump to the second set (middle)
    if (this.currentIndex < totalReviews) {
      this.isScrollingProgrammatically = true;
      this.currentIndex = this.currentIndex + totalReviews;
      this.scrollToIndex(this.currentIndex, false);
      setTimeout(() => {
        this.isScrollingProgrammatically = false;
      }, 100);
    }
    // If we're in the third set, jump to the second set (middle)
    else if (this.currentIndex >= totalReviews * 2) {
      this.isScrollingProgrammatically = true;
      this.currentIndex = this.currentIndex - totalReviews;
      this.scrollToIndex(this.currentIndex, false);
      setTimeout(() => {
        this.isScrollingProgrammatically = false;
      }, 100);
    }
  }

  scrollToIndex(index: number, smooth: boolean = true) {
    this.isScrollingProgrammatically = true;
    
    setTimeout(() => {
      const container = this.scrollContainer?.nativeElement;
      if (!container) return;

      const cards = container.querySelectorAll('.review-card');
      const targetCard = cards[index] as HTMLElement;

      if (targetCard) {
        const containerRect = container.getBoundingClientRect();
        const cardRect = targetCard.getBoundingClientRect();
        const scrollLeft = container.scrollLeft + (cardRect.left - containerRect.left) - (containerRect.width / 2) + (cardRect.width / 2);

        container.scrollTo({
          left: scrollLeft,
          behavior: smooth ? 'smooth' : 'auto'
        });

        setTimeout(() => {
          this.updateActiveCard();
          this.isScrollingProgrammatically = false;
        }, smooth ? 600 : 100);
      }
    }, 10);
  }

  setActive(index: number) {
    this.currentIndex = index;
    this.scrollToIndex(index, true);
    this.stopAutoSlide();
    this.startAutoSlide();
  }

  getDotIndex(cardIndex: number): number {
    return cardIndex % this.reviews.length;
  }

  isActiveDot(dotIndex: number): boolean {
    return this.getDotIndex(this.currentIndex) === dotIndex;
  }

  setActiveDot(dotIndex: number) {
    // Find the card in the middle set that corresponds to this dot
    const targetIndex = this.reviews.length + dotIndex;
    this.setActive(targetIndex);
  }

  onMouseEnter() {
    this.stopAutoSlide();
  }

  onMouseLeave() {
    this.startAutoSlide();
  }
}