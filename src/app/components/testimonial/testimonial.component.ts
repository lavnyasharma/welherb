import { Component } from '@angular/core';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.css'
})
export class TestimonialComponent {
  testimonials: any[] = [];
  responsiveOptions: any[];

  constructor() {
    this.testimonials = [
      {
        name: "John Doe",
        position: "CEO at Company",
        testimonial: "PrimeNG has greatly improved our development process!",
        image: "https://i.pravatar.cc"
      },
      {
        name: "Jane Smith",
        position: "Marketing Head",
        testimonial: "The UI components are amazing and easy to integrate.",
        image: "https://i.pravatar.cc"
      },
      {
        name: "Alex Johnson",
        position: "Developer",
        testimonial: "I highly recommend PrimeNG for fast and responsive UI development.",
        image: "https://i.pravatar.cc"
      },
      {
        name: "Michael Brown",
        position: "Project Manager",
        testimonial: "PrimeNG offers great components for enterprise-level applications.",
        image: "https://i.pravatar.cc"
      }
    ];

    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }


}
