import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';

interface Product {
  name: string;
  id: string;
  price: { [key: string]: number } | number;
  category: string[];
  image: string;
  rating?: number;
  sizes: string[];
  selectedSize: string;
  displayPrice: number;
}

@Component({
  selector: 'app-shopall',
  templateUrl: './shopall.component.html',
  styleUrls: ['./shopall.component.css']
})
export class ShopallComponent implements OnInit {
  selectedSort = 'low';
  priceRange = 5000;
  products: Product[] = [];
  filteredProducts: Product[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getAllProducts().subscribe((data: any[]) => {
      this.products = data.map((item) => {
        const sizes = item.size || [];
        const firstSize = sizes.length ? sizes[0] : null;
        const price = typeof item.price === 'object' ? item.price : { [firstSize]: item.price };
        return {
          name: item.name,
          price: price,
          id:item._id,
          category: item.categories || [],
          image: "/welherb" + item.default_image,
          rating: item.rating || 0,
          sizes: sizes,
          selectedSize: firstSize, 
          displayPrice: firstSize ? price[firstSize] : 0
        };
      });

      this.filteredProducts = [...this.products];
    });
  }

  sortProducts() {
    this.filteredProducts.sort((a, b) =>
      this.selectedSort === 'low'
        ? a.displayPrice - b.displayPrice
        : b.displayPrice - a.displayPrice
    );
  }

  filterByPrice() {
    this.filteredProducts = this.products.filter(
      (product) => product.displayPrice <= this.priceRange
    );
    this.sortProducts();
  }

  updatePrice(product: Product, selectedSize: string) {
    product.selectedSize = selectedSize;
    product.displayPrice = product.price[selectedSize];
  }
  addToCart(productId: string) {
    this.apiService.addToCart(productId).subscribe(
      (response) => {
        console.log('Product added to cart successfully:', response);
        alert('Product added to cart!');
      },
      (error) => {
        console.error('Error adding product to cart:', error);
        alert('Failed to add product to cart.');
      }
    );
  }
  
}
