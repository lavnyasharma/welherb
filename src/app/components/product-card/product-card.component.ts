import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../../services/api.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  mainCategories = ['ESR', 'Liver', 'Thyroid', 'Women', 'Men', 'Heart'];
  categoryProductMap: { [key: string]: any[] } = {};
  selectedCategoryIndex: number = 0;
  subProducts: any[] = [];
  selectedProductIndex: number = 0;

  constructor(private apiservice: ApiService) {
    this.apiservice.products$.subscribe(data => {
      for (let cat of this.mainCategories) {
        this.categoryProductMap[cat] = data.filter(
          (prod: any) =>
            prod.categories && prod.categories.map((c: string) => c.toLowerCase()).includes(cat.toLowerCase())
        );
      }
      this.updateSubProducts();
    });
  }

  ngOnInit() {
    this.apiservice.getHomeProducts();
  }

  selectCategory(index: number) {
    this.selectedCategoryIndex = index;
    this.selectedProductIndex = 0;
    this.updateSubProducts();
  }

  selectProduct(index: number) {
    this.selectedProductIndex = index;
  }

  updateSubProducts() {
    let cat = this.mainCategories[this.selectedCategoryIndex];
    this.subProducts = this.categoryProductMap[cat] || [];
  }

  get selectedProduct() {
    return this.subProducts[this.selectedProductIndex];
  }

  getBackgroundStyle() {
    if (this.selectedProduct?.background_image) {
      return {
        'background-image': `url(/welherb${this.selectedProduct.background_image})`,
        'background-size': 'cover',
        'background-position': 'center center',
        'background-repeat': 'no-repeat',
        'image-rendering': 'crisp-edges',
      };
    }
    return { 'background': '#fff' };
  }
}
