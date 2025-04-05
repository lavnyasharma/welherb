
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  taxRate = 3;

  constructor(
    private apiService: ApiService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((cartItemIds) => {
      console.log('Cart items updated:', cartItemIds);
      // Call API to get full details of items
      this.apiService.getCartItems().subscribe(
        (response: any[]) => {
          this.cartItems = response
            .filter(item => item?.product || item?.name) // Handle both structures
            .map(item => {
              const product = item.product || item;
              const selectedSize = item.size || 30;

              return {
                id: item._id,
                name: product.name || 'Unnamed',
                subtitle: `Size: ${selectedSize}`,
                category: product.categories?.join(', ') || '',
                productType: product.product_type || '',
                image: product.default_image ? '/welherb' + product.default_image : '',
                price: product.price?.[selectedSize] || 0,
                inStock: true
              };
            });
        },
        (error) => {
          console.error('Error fetching cart items:', error);
        }
      );
    });
  }

  get subtotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price, 0);
  }

  get total(): number {
    return this.subtotal + (this.subtotal * this.taxRate) / 100;
  }

  removeItem(id: string): void {
    this.cartService.removeFromCart(id);
    this.cartItems = this.cartItems.filter(item => item.id !== id);
  }


  checkout(): void {
    alert('Proceeding to checkout...');
  }
}
