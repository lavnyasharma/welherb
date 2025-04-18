import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.css'
})
export class TestimonialComponent {
  constructor(private router: Router) {}
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
  showNow(){
    this.router.navigate(['/shopall']);
  }
  viewMore(){
    this.router.navigate(['/reviews']);
  }
}