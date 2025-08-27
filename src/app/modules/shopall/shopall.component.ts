import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { CartService } from '../../../services/cart.service';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

interface ProductBadge {
  type: 'new' | 'featured';
  text: string;
}

interface Product {
  name: string;
  id: string;
  price: { [key: string]: number } | number;
  category: string[];
  image: string;
  rating?: number;
  reviewCount?: number;
  sizes: string[];
  selectedSize: string;
  displayPrice: number;
  badges?: ProductBadge[];
  featured?: boolean;
  isNew?: boolean;
  
}

@Component({
  selector: 'app-shopall',
  templateUrl: './shopall.component.html',
  styleUrls: ['./shopall.component.css']
})
export class ShopallComponent implements OnInit, OnDestroy {
  // Sorting and Filtering
  selectedSort = 'featured';
  priceRange = 5000;
  selectedCategories: string[] = [];
  showDesktopFilters = false;
  availableCategories: string[] = [];
  
  // Products and Display
  products: Product[] = [];
  filteredProducts: Product[] = [];
  displayedProducts: Product[] = [];
  
  // UI State
  cartLoaded = false;
  isLoading = true;
  isLoadingMore = false;
  hasMoreProducts = false;
  showMobileFilters = false;
  gridView = '3'; // '2', '3', or '4'
  
  // Cart and Wishlist
  cartItemsSet = new Set<string>();
  wishlistItemsSet = new Set<string>();
  
  // Pagination
  currentPage = 1;
  itemsPerPage = 12;
  
  private destroy$ = new Subject<void>();
  private priceChangeSubject = new Subject<number>();

  constructor(
    private apiService: ApiService,
    private cartService: CartService,
    private router: Router,  
    private route: ActivatedRoute, 
    private toastr: ToastrService
  ) {
    // Debounce price changes for better UX
    this.priceChangeSubject
      .pipe(
        debounceTime(300),
        takeUntil(this.destroy$)
      )
      .subscribe(price => {
        this.priceRange = price;
        this.filterByPrice();
      });
  }

  ngOnInit(): void {
    this.setupCartSubscription();
    this.setupWishlistSubscription();
    this.loadProducts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Data Loading
  private loadProducts(): void {
    this.route.queryParams.subscribe(params => {
      const categoryParam = params['category'];
  
      this.apiService.getAllProducts(categoryParam).subscribe({
        next: (data: any[]) => {
          console.log('API Response:', data);
          this.products = data.map((item) => this.mapProductFromAPI(item));
          this.extractCategories();
          this.filteredProducts = [...this.products];
          this.applyAllFilters();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading products:', error);
          this.toastr.error('Failed to load products', 'Error');
          this.isLoading = false;
        }
      });
    });
  }

  private mapProductFromAPI(item: any): Product {
    const sizes = item.size || [];
    const firstSize = sizes.length ? sizes[0] : '';
    const price = typeof item.price === 'object' ? item.price : { [firstSize]: item.price };
    
    // Generate badges
    const badges: ProductBadge[] = [];
  
    if (item.isNew || this.isNewProduct(item.createdAt)) {
      badges.push({ type: 'new', text: 'NEW' });
    }
    if (item.featured) {
      badges.push({ type: 'featured', text: 'FEATURED' });
    }

    return {
      name: item.name,
      price: price,
      id: item._id,
      category: item.categories || [],
      image: '/welherb' + item.default_image,
      rating: item.rating || 0,
      reviewCount: item.reviewCount || 0,
      sizes: sizes,
      selectedSize: firstSize,
      displayPrice: firstSize ? (typeof price === 'object' ? price[firstSize] : price) : 0,
      badges: badges,
      featured: item.featured || false,
      isNew: item.isNew || this.isNewProduct(item.createdAt),
    };
  }

  private isNewProduct(createdAt: string): boolean {
    if (!createdAt) return false;
    const created = new Date(createdAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - created.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30; // Consider new if created within 30 days
  }

  private extractCategories(): void {
    const categorySet = new Set<string>();
    this.products.forEach(product => {
      product.category.forEach(cat => categorySet.add(cat));
    });
    this.availableCategories = Array.from(categorySet).sort();
  }

  private setupCartSubscription(): void {
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

  private setupWishlistSubscription(): void {
    // Assuming you have a wishlist service
    // this.wishlistService.wishlistItems$
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe(items => {
    //     this.wishlistItemsSet = new Set(items);
    //   });
  }

  // Filtering and Sorting
  sortProducts(): void {
    this.filteredProducts.sort((a, b) => {
      switch (this.selectedSort) {
        case 'low':
          return a.displayPrice - b.displayPrice;
        case 'high':
          return b.displayPrice - a.displayPrice;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'featured':
        default:
          // Featured items first, then by rating, then by name
          if (a.featured !== b.featured) {
            return b.featured ? 1 : -1;
          }
          if (a.rating !== b.rating) {
            return (b.rating || 0) - (a.rating || 0);
          }
          return a.name.localeCompare(b.name);
      }
    });
    this.updateDisplayedProducts();
  }

  filterByPrice(): void {
    this.applyAllFilters();
  }

  onPriceChange(): void {
    this.priceChangeSubject.next(this.priceRange);
  }

  onCategoryChange(event: any): void {
    const category = event.target.value;
    const checked = event.target.checked;
    
    if (checked) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories = this.selectedCategories.filter(cat => cat !== category);
    }
    
    this.applyAllFilters();
  }

  private applyAllFilters(): void {
    let filtered = [...this.products];
    
    // Price filter
    filtered = filtered.filter(product => product.displayPrice <= this.priceRange);
    
    // Category filter
    if (this.selectedCategories.length > 0) {
      filtered = filtered.filter(product => 
        product.category.some(cat => this.selectedCategories.includes(cat))
      );
    }
    
    this.filteredProducts = filtered;
    this.currentPage = 1;
    this.sortProducts();
  }

  private updateDisplayedProducts(): void {
    const startIndex = 0;
    const endIndex = this.currentPage * this.itemsPerPage;
    this.displayedProducts = this.filteredProducts.slice(startIndex, endIndex);
    this.hasMoreProducts = endIndex < this.filteredProducts.length;
  }

  // Filter Management
  hasActiveFilters(): boolean {
    return this.priceRange < 5000 || this.selectedCategories.length > 0;
  }

  getActiveFilterCount(): number {
    let count = 0;
    if (this.priceRange < 5000) count++;
    count += this.selectedCategories.length;
    return count;
  }

  clearAllFilters(): void {
    this.priceRange = 5000;
    this.selectedCategories = [];
    this.selectedSort = 'featured';
    this.applyAllFilters();
    this.toastr.info('All filters cleared', 'Filters');
  }

  clearPriceFilter(): void {
    this.priceRange = 5000;
    this.applyAllFilters();
  }

  removeCategory(category: string): void {
    this.selectedCategories = this.selectedCategories.filter(cat => cat !== category);
    this.applyAllFilters();
  }

  getCategoryCount(category: string): number {
    return this.products.filter(product => 
      product.category.includes(category)
    ).length;
  }

  // Mobile UI
  toggleMobileFilters(): void {
    this.showMobileFilters = !this.showMobileFilters;
  }

  closeMobileFilters(): void {
    this.showMobileFilters = false;
  }

  applyMobileFilters(): void {
    this.closeMobileFilters();
    this.toastr.success(`Showing ${this.filteredProducts.length} products`, 'Filters Applied');
  }

  // Grid View
  setGridView(view: string): void {
    this.gridView = view;
  }

  // Product Actions
  updatePrice(product: Product, selectedSize: string): void {
    product.selectedSize = selectedSize;
    if (typeof product.price === 'object') {
      product.displayPrice = product.price[selectedSize];
    }
  }

  handleCartAction(product: Product): void {
    if (this.isInCart(product.id)) {
      this.navigateToCart();
    } else {
      this.addToCart(product.id, product.selectedSize);
    }
  }

addToCart(productId: string, size: string): void {
  // Check if user is authenticated by looking for auth_token in localStorage
  const authToken = localStorage.getItem('auth_token');
  
  if (!authToken) {
    // User is not authenticated, redirect to login
    this.toastr.warning('Please login to add items to cart', 'Authentication Required');
    this.router.navigate(['/login']);
    return;
  }

  // User is authenticated, proceed with adding to cart
  if (this.isInCart(productId)) {
    return;
  }

  this.cartService.addToCart(productId, size);
  this.toastr.success('Product added to cart', 'Success');
}


// Optional: You can also create a helper method for authentication check
private isUserAuthenticated(): boolean {
  return !!localStorage.getItem('auth_token');
}


  isInCart(productId: string): boolean {
    return this.cartItemsSet.has(productId);
  }

  navigateToCart(): void {
    this.router.navigate(['/cart']);
  }

  // Wishlist Actions
  toggleWishlist(productId: string): void {
    if (this.isInWishlist(productId)) {
      // Remove from wishlist
      this.wishlistItemsSet.delete(productId);
      this.toastr.info('Removed from wishlist', 'Wishlist');
    } else {
      // Add to wishlist
      this.wishlistItemsSet.add(productId);
      this.toastr.success('Added to wishlist', 'Wishlist');
    }
  }

  isInWishlist(productId: string): boolean {
    return this.wishlistItemsSet.has(productId);
  }

  // Product Navigation
  navigateToProduct(productId: string): void {
    this.router.navigate(['/shop', productId]);
  }

  openQuickView(product: Product): void {
    // Implement quick view modal
    console.log('Opening quick view for:', product.name);
    // You can implement a modal service here
  }

  // Pagination
  loadMoreProducts(): void {
    if (this.isLoadingMore || !this.hasMoreProducts) return;
    
    this.isLoadingMore = true;
    this.currentPage++;
    
    // Simulate loading delay
    setTimeout(() => {
      this.updateDisplayedProducts();
      this.isLoadingMore = false;
    }, 500);
  }

  // Utility Functions
  trackProduct(index: number, product: Product): string {
    return product.id;
  }

  onImageError(event: any): void {
    // event.target.src = '/assets/images/placeholder-product.jpg';
  }

  getStarArray(rating: number): boolean[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating);
    }
    return stars;
  }
  toggleDesktopFilters(): void {
  this.showDesktopFilters = !this.showDesktopFilters;
  
  // Optional: Close mobile filters if they're open
  if (this.showDesktopFilters && this.showMobileFilters) {
    this.showMobileFilters = false;
  }
}

// Optional: Add a method to close desktop filters (useful for overlay clicks)
closeDesktopFilters(): void {
  this.showDesktopFilters = false;
}

// Update the existing closeMobileFilters method to also handle desktop filters

}
