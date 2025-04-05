import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {

 testimonials = [
    {
      name: 'Mr. Chandan',
      review: 'When it comes to landing pages, popups, and even emails, shorter testimonials tend to be more effective.',
      stars: 5,
      image: 'https://i.pravatar.cc/300'
    },
    {
      name: 'Ms. Priya',
      review: 'When it comes to landing pages, popups, and even emails, shorter testimonials tend to be more effective. ',
      stars: 4,
      image: 'https://i.pravatar.cc/300'
    },
    {
      name: 'John Doe',
      review: 'When it comes to landing pages, popups, and even emails, shorter testimonials tend to be more effective. ',
      stars: 5,
      image: 'https://i.pravatar.cc/300'
    },
    {
      name: 'Sarah Smith',
      review: 'When it comes to landing pages, popups, and even emails, shorter testimonials tend to be more effective. ',
      stars: 5,
      image: 'https://i.pravatar.cc/300'
    },
    {
      name: 'Ankit Verma',
      review: 'When it comes to landing pages, popups, and even emails, shorter testimonials tend to be more effective. ',
      stars: 4,
      image: 'https://i.pravatar.cc/300'
    },
    {
      name: 'Ritika Sharma',
      review: 'When it comes to landing pages, popups, and even emails, shorter testimonials tend to be more effective. ',
      stars: 5,
      image: 'https://i.pravatar.cc/300'
    }
  ];

  isMobile = window.innerWidth <= 768;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = window.innerWidth <= 768;
  }

  isMobileView(): boolean {
    return this.isMobile;
  }
}