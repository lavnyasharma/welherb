import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ApiService } from './../../../services/api.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @ViewChild('carousel', { static: false }) carousel!: ElementRef;
  
  selectedProductIndex: number = 0;
  products: any[] = [];

  constructor(private apiservice: ApiService) {
    this.apiservice.products$.subscribe(data => {
      console.log(data);
      this.products = data.map((item: any) => ({
        name: item.name,
        image: '/welherb' + item.background_image,
        shortDescLeft: item.helps_how,     // <-- corrected here
        shortDescRight: item.helps_who,    // <-- and here
        color: item.background_color
      }));
      
   
    });
  }

  get selectedProduct() {
    return this.products[this.selectedProductIndex];
  }

  ngOnInit() {
   

    this.apiservice.getHomeProducts();
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
