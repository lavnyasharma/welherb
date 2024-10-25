import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'] // Corrected styleUrl to styleUrls
})
export class ProductCardComponent {
  @ViewChild('carousel', { static: false }) carousel!: ElementRef; // Added ViewChild to access carousel

  selectedProductIndex: number = 0;

  products = [
    {
      name: 'Sample Product 1',
      image: 'https://ewsorupyhavslsemnmhd.supabase.co/storage/v1/object/public/car-images/6.png',
      shortDescLeft: [
        'If you have swollen joints with severe pain',
        'Feel feverish all the time',
        'Have high ESR and don’t know why?'
      ],
      shortDescRight: ['Right bullet point 1', 'Right bullet point 2'],
      color: '#83BFD7'
    },
    {
      name: 'Sample Product 2',
      image: 'https://via.placeholder.com/400',
      shortDescLeft: ['Left bullet point 1', 'Left bullet point 2'],
      shortDescRight: ['Right bullet point 1', 'Right bullet point 2'],
      color: '#33B5FF'
    },
    {
      name: 'Sample Product 3',
      image: 'https://via.placeholder.com/400',
      shortDescLeft: ['Left bullet point 1', 'Left bullet point 2'],
      shortDescRight: ['Right bullet point 1', 'Right bullet point 2'],
      color: '#8D33FF'
    },
    {
      name: 'Sample Product 4',
      image: 'https://via.placeholder.com/400',
      shortDescLeft: ['Left bullet point 1', 'Left bullet point 2'],
      shortDescRight: ['Right bullet point 1', 'Right bullet point 2'],
      color: '#8D33FF'
    },
    {
      name: 'Sample Product 5',
      image: 'https://via.placeholder.com/400',
      shortDescLeft: ['Left bullet point 1', 'Left bullet point 2'],
      shortDescRight: ['Right bullet point 1', 'Right bullet point 2'],
      color: '#8D33FF'
    },
    {
      name: 'Sample Product 6',
      image: 'https://via.placeholder.com/400',
      shortDescLeft: ['Left bullet point 1', 'Left bullet point 2'],
      shortDescRight: ['Right bullet point 1', 'Right bullet point 2'],
      color: '#8D33FF'
    }
  ];

  get selectedProduct() {
    return this.products[this.selectedProductIndex];
  }

  selectProduct(index: number) {
    this.selectedProductIndex = index;
  }

  scrollLeft() {
    if (this.carousel) {
      this.carousel.nativeElement.scrollBy({ left: -200, behavior: 'smooth' });
    }
  }

  scrollRight() {
    if (this.carousel) {
      this.carousel.nativeElement.scrollBy({ left: 200, behavior: 'smooth' });
    }
  }
}
