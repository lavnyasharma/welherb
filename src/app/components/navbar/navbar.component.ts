// navbar.component.ts
import { Component, HostListener, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ApiService } from '../../../services/api.service'; // Add this import
import { MenuItem } from 'primeng/api';
import { CartService } from '../../../services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild('searchInput', { static: false }) searchInput!: ElementRef;
  
  items: any;
  shopSections: any[] = [];
  profileItems: MenuItem[] = [];
  cartItemCount = 0;
  isLoggedIn: boolean = false;
  menuOpen = false;
  shopDropdownOpen = false;
  isDesktopView = true;

  // Search functionality properties
  searchValue = '';
  searchResults: any[] = [];
  isSearching = false;
  showSearchResults = false;
  searchSubject = new Subject<string>();

  // Scroll behavior properties
  lastScrollTop = 0;
  isOfferVisible = true;
  isNavbarVisible = true;
  scrollThreshold = 50;
  navbarHideThreshold = 100;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private authService: AuthService, 
    private cartService: CartService,
    private apiService: ApiService // Add this
  ) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItemCount = items.length;
    });

    this.authService.authToken$.subscribe(token => {
      this.isLoggedIn = !!token;
    });

    this.isLoggedIn = this.authService.isAuthenticated();

    this.profileItems = [
      { label: 'Profile', icon: 'pi pi-user', command: () => this.profile() },
      { label: 'Logout', icon: 'pi pi-sign-out', command: () => this.logout() }
    ];

    this.items = [
      {
        label: 'Shop',
        icon: 'pi pi-cart',
        items: [
          { label: 'Shop All', routerLink: '/shopall' },
          { separator: true },
          {
            label: 'By Concern',
            items: [
              { label: 'Blood Deficiency', routerLink: ['/shopall'], queryParams: { category: 'blood-deficiency' } },
              { label: 'Blood Pressure', routerLink: ['/shopall'], queryParams: { category: 'blood-pressure' } },
              { label: 'Body Fatigue', routerLink: ['/shopall'], queryParams: { category: 'body-fatigue' } },
              { label: 'Cholesterol', routerLink: ['/shopall'], queryParams: { category: 'cholesterol' } },
              { label: 'Diabetes', routerLink: ['/shopall'], queryParams: { category: 'diabetes' } },
              { label: 'ESR', routerLink: ['/shopall'], queryParams: { category: 'esr' } },
              { label: 'Gut', routerLink: ['/shopall'], queryParams: { category: 'gut' } },
              { label: 'Joint/Body Pains', routerLink: ['/shopall'], queryParams: { category: 'Joint/Body Pains' } },
              { label: 'Liver', routerLink: ['/shopall'], queryParams: { category: 'liver' } },
              { label: 'Multivitamins', routerLink: ['/shopall'], queryParams: { category: 'ayurvedic-multivitamins' } },
              { label: 'Piles', routerLink: ['/shopall'], queryParams: { category: 'piles' } },
              { label: 'Prostate', routerLink: ['/shopall'], queryParams: { category: 'prostate' } },
              { label: 'Thyroid', routerLink: ['/shopall'], queryParams: { category: 'thyroid' } }
            ]
          },
          { separator: true },
          {
            label: 'By Benefits',
            items: [
              { label: "Men's Wellness", routerLink: '/shop/mens-wellbeing' },
              { label: "Women's Wellness", routerLink: '/shop/womens-wellbeing' },
              { label: 'Weight Management', routerLink: '/shop/weight-management' }
            ]
          },
          { separator: true },
          {
            label: 'By Categories',
            items: [
              { label: 'New Launch!', routerLink: '/shop/new-launch' },
              { label: 'Powders', routerLink: '/shop/powders' },
              { label: 'Tablets', routerLink: '/shop/tablets' },
              { label: 'Capsules', routerLink: '/shop/capsules' },
              { label: 'Syrup', routerLink: '/shop/syrup' }
            ]
          }
        ]
      },
      {
        label: 'Combos',
        icon: 'pi pi-box',
        routerLink: '/shop'
      },
      {
        label: 'About Us',
        icon: 'pi pi-search',
        routerLink: '/discover'
      },
      {
        label: 'Expert Help',
        icon: 'pi pi-question-circle',
        routerLink: '/expert-help'
      },
      {
        label: 'Reviews',
        icon: 'fa-solid fa-shop',
        routerLink: '/reviews'
      }
    ];

    this.prepareShopSections();
    this.checkViewport();
    this.setupSearchDebounce();
  }

  setupSearchDebounce() {
    this.searchSubject.pipe(
      debounceTime(300), // Wait 300ms after user stops typing
      distinctUntilChanged(), // Only emit if value is different from previous
      switchMap(searchTerm => {
        if (searchTerm.length >= 3) {
          this.isSearching = true;
          return this.apiService.searchSomething(searchTerm);
        } else {
          this.isSearching = false;
          this.showSearchResults = false;
          return [];
        }
      })
    ).subscribe({
      next: (results) => {
        this.searchResults = results || [];
        this.isSearching = false;
        this.showSearchResults = true;
      },
      error: (error) => {
        console.error('Search error:', error);
        this.searchResults = [];
        this.isSearching = false;
        this.showSearchResults = false;
      }
    });
  }

  onSearchInput(event: any) {
    const value = event.target.value.trim();
    this.searchValue = value;
    
    if (value.length >= 3) {
      this.searchSubject.next(value);
    } else {
      this.showSearchResults = false;
      this.searchResults = [];
      this.isSearching = false;
    }
  }

  onSearchFocus() {
    if (this.searchValue.length >= 3 && this.searchResults.length > 0) {
      this.showSearchResults = true;
    }
  }

  onSearchBlur() {
    // Delay hiding to allow clicking on results
    setTimeout(() => {
      this.showSearchResults = false;
    }, 200);
  }

  selectSearchResult(product: any) {

    this.searchValue = product.name;

    // Navigate to product detail page
  this.navigateToProduct(product._id);
  }

  clearSearch() {
    this.searchValue = '';
    this.searchResults = [];
    this.showSearchResults = false;
    this.isSearching = false;
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    this.isOfferVisible = currentScroll < this.scrollThreshold;
    
    if (currentScroll > this.lastScrollTop && currentScroll > this.navbarHideThreshold) {
      this.isNavbarVisible = false;
      this.showSearchResults = false; // Hide search results when navbar hides
    } else if (currentScroll < this.lastScrollTop) {
      this.isNavbarVisible = true;
    }
    
    if (currentScroll <= 10) {
      this.isNavbarVisible = true;
      this.isOfferVisible = true;
    }
    
    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }

  @HostListener('window:resize', [])
  onWindowResize() {
    this.checkViewport();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const searchContainer = target.closest('.search-container');
    if (!searchContainer) {
      this.showSearchResults = false;
    }
  }

  prepareShopSections() {
    const shopItems = this.items[0]?.items || [];
    this.shopSections = [];

    for (const item of shopItems) {
      if (item.label && item.routerLink) {
        this.shopSections.push({
          heading: item.label,
          items: [{ label: item.label, routerLink: item.routerLink }]
        });
      } else if (item.items) {
        this.shopSections.push({
          heading: item.label,
          items: item.items
        });
      }
    }
  }

  checkViewport() {
    this.isDesktopView = window.innerWidth > 768;
    if (this.isDesktopView) {
      this.menuOpen = false;
      this.shopDropdownOpen = false;
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    if (!this.menuOpen) {
      this.shopDropdownOpen = false;
    }
  }

  toggleShopDropdown() {
    if (!this.isDesktopView) {
      this.shopDropdownOpen = !this.shopDropdownOpen;
    }
  }

  closeMenu() {
    this.menuOpen = false;
    this.shopDropdownOpen = false;
  }

  navigateHome() {
    this.router.navigate(['/home']);
    this.closeMenu();
  }

  handleCartClick(): void {
    this.closeMenu();
    if (this.isLoggedIn) {
      this.router.navigate(['/cart']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  profile() {
    this.router.navigate(['/profile']);
    this.closeMenu();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
    this.closeMenu();
  }

  // Track by function for search results
  trackByProductId(index: number, product: any): string {
    return product._id || index;
  }

  // View all search results
  viewAllResults() {
    this.showSearchResults = false;
    this.router.navigate(['/shopall'], { 
      queryParams: { search: this.searchValue } 
    });
  }

  // Highlight search term in text (optional utility method)
  highlightSearchTerm(text: string, searchTerm: string): string {
    if (!searchTerm || !text) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<span class="search-highlight">$1</span>');
  }
    navigateToProduct(productId: string): void {
    this.router.navigate(['/shop', productId]);
  }
}