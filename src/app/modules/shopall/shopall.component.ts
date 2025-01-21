import { Component,NgModule } from '@angular/core';
import { products } from './products-data';




@Component({
  selector: 'app-shopall',
  templateUrl: './shopall.component.html',
  styleUrl: './shopall.component.css'
})
export class ShopallComponent {
  selectedSort = 'low';
  priceRange = 5000; // Max range
  filteredProducts;

  products = [
    {
      name: 'Rainbow Love Ring',
      price: 2457,
      category: 'Eclipse | Ring',
      image: 'https://www.velonna.co/_next/image?url=https%3A%2F%2Fpldwzgpchvgtdycyfaky.supabase.co%2Fstorage%2Fv1%2F%2Fobject%2Fpublic%2Fvelonnabucket%2Fuploads%2Fproducts%2F1185%2F0M1A1085.jpg&w=1200&q=75',
      rating: 4.5
    },
    {
      name: 'Royal May Ring',
      price: 1632,
      category: 'Cascade | Ring',
      image: 'https://www.velonna.co/_next/image?url=https%3A%2F%2Fpldwzgpchvgtdycyfaky.supabase.co%2Fstorage%2Fv1%2F%2Fobject%2Fpublic%2Fvelonnabucket%2Fuploads%2Fproducts%2F1185%2F0M1A1085.jpg&w=1200&q=75',
      rating: 4.3
    },
    {
      name: 'Golden Bracelet',
      price: 4567,
      category: 'Elegance | Bracelet',
      image: 'https://www.velonna.co/_next/image?url=https%3A%2F%2Fpldwzgpchvgtdycyfaky.supabase.co%2Fstorage%2Fv1%2F%2Fobject%2Fpublic%2Fvelonnabucket%2Fuploads%2Fproducts%2F1185%2F0M1A1085.jpg&w=1200&q=75',
      rating: 4.8
    },
    {
      name: 'Silver Charm',
      price: 1234,
      category: 'Amethyst | Pendant',
      image: 'https://www.velonna.co/_next/image?url=https%3A%2F%2Fpldwzgpchvgtdycyfaky.supabase.co%2Fstorage%2Fv1%2F%2Fobject%2Fpublic%2Fvelonnabucket%2Fuploads%2Fproducts%2F1185%2F0M1A1085.jpg&w=1200&q=75',
      rating: 4.1
    },
    {
      name: 'Silver Charm',
      price: 1234,
      category: 'Amethyst | Pendant',
      image: 'https://www.velonna.co/_next/image?url=https%3A%2F%2Fpldwzgpchvgtdycyfaky.supabase.co%2Fstorage%2Fv1%2F%2Fobject%2Fpublic%2Fvelonnabucket%2Fuploads%2Fproducts%2F1185%2F0M1A1085.jpg&w=1200&q=75',
      rating: 4.1
    },
    {
      name: 'Silver Charm',
      price: 1234,
      category: 'Amethyst | Pendant',
      image: 'https://www.velonna.co/_next/image?url=https%3A%2F%2Fpldwzgpchvgtdycyfaky.supabase.co%2Fstorage%2Fv1%2F%2Fobject%2Fpublic%2Fvelonnabucket%2Fuploads%2Fproducts%2F1185%2F0M1A1085.jpg&w=1200&q=75',
      rating: 4.1
    },
     {
      name: 'Silver Charm',
      price: 1234,
      category: 'Amethyst | Pendant',
      image: 'https://www.velonna.co/_next/image?url=https%3A%2F%2Fpldwzgpchvgtdycyfaky.supabase.co%2Fstorage%2Fv1%2F%2Fobject%2Fpublic%2Fvelonnabucket%2Fuploads%2Fproducts%2F1185%2F0M1A1085.jpg&w=1200&q=75',
      rating: 4.1
    },
    
  ];



  constructor() {
    this.filteredProducts = [...this.products];
  }

  sortProducts() {
    if (this.selectedSort === 'low') {
      this.filteredProducts.sort((a, b) => a.price - b.price);
    } else {
      this.filteredProducts.sort((a, b) => b.price - a.price);
    }
  }

  filterByPrice() {
    this.filteredProducts = this.products.filter(
      (product) => product.price <= this.priceRange
    );
    this.sortProducts();
  }  
}

