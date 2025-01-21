import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems = [
    {
      id: 1,
      name: 'Ocean Breeze Pendant',
      subtitle: 'Serenity',
      category: 'Universal',
      price: 1900,
      image: 'https://www.velonna.co/_next/image?url=https%3A%2F%2Fpldwzgpchvgtdycyfaky.supabase.co%2Fstorage%2Fv1%2F%2Fobject%2Fpublic%2Fvelonnabucket%2Fproduct_thumbnails%2F0M1A9178.jpg&w=640&q=75', // Adjust the image path
      inStock: true,
    },
    {
      id: 2,
      name: 'Spring Flora Tops',
      subtitle: 'Lavender',
      category: 'Universal',
      price: 1800,
      image: 'https://www.velonna.co/_next/image?url=https%3A%2F%2Fpldwzgpchvgtdycyfaky.supabase.co%2Fstorage%2Fv1%2F%2Fobject%2Fpublic%2Fvelonnabucket%2Fproduct_thumbnails%2F0M1A9178.jpg&w=640&q=75', // Adjust the image path
      inStock: true,
    },
  ];

  taxRate = 3; // Example tax rate
  get subtotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price, 0);
  }

  get total(): number {
    return this.subtotal + (this.subtotal * this.taxRate) / 100;
  }

  removeItem(id: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== id);
  }

  checkout(): void {
    alert('Proceeding to checkout...');
  }
}
