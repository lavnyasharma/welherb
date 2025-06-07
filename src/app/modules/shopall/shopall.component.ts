import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { CartService } from '../../../services/cart.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
export class ShopallComponent implements OnInit, OnDestroy {
  selectedSort = 'low';
  priceRange = 5000;
  products: Product[] = [];
  cartLoaded = false;
  filteredProducts: Product[] = [];
  cartItemsSet = new Set<string>();
  private destroy$ = new Subject<void>();

  constructor(
    private apiService: ApiService,
    private cartService: CartService,
    private router: Router,  
    private route: ActivatedRoute, private toastr: ToastrService

  ) {}

  ngOnInit(): void {
    
    this.route.queryParams.subscribe(params => {
      const categoryParam = params['category'];
  
      this.apiService.getAllProducts(categoryParam).subscribe((data: any[]) => {
        console.log('API Response:', data);
        this.products = data.map((item) => {
          const sizes = item.size || [];
          const firstSize = sizes.length ? sizes[0] : '';
          const price = typeof item.price === 'object' ? item.price : { [firstSize]: item.price };
          return {
            name: item.name,
            price: price,
            id: item._id,
            category: item.categories || [],
            image: '/welherb' + item.default_image,
            rating: item.rating || 0,
            sizes: sizes,
            selectedSize: firstSize,
            displayPrice: firstSize ? price[firstSize] : 0
          };
        });
  
        this.filteredProducts = [...this.products];
        this.filterByPrice(); // Optional: Apply price filtering if needed
      });
    });
  
    this.cartService.cartItems$
      .pipe(takeUntil(this.destroy$))
      .subscribe(items => {
        this.cartItemsSet = new Set(items);
      });
  
    this.cartService.cartLoaded
      .pipe(takeUntil(this.destroy$))
      .subscribe(loaded => {
        this.cartLoaded = loaded;
      });
  }
  

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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

  addToCart(productId: string, size: string) {
    if (this.isInCart(productId)) {
 
      return;
    }

        this.cartService.addToCart(productId, size);
        this.toastr.success('Product added to cart', 'Success');
      
     
  }

  isInCart(productId: string): boolean {
    return this.cartItemsSet.has(productId);
  }
  navigateToProduct(productId: string) {
    this.router.navigate(['/shop', productId]);
  }
}
