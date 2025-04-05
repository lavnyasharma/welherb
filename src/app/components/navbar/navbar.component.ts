import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MenuItem } from 'primeng/api';
import { CartService } from '../../../services/cart.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  items: any;
  shopSections: any[] = [];

  profileItems: MenuItem[] = [];
  cartItemCount = 0;
  isLoggedIn: boolean = false;

  menuOpen = false;
  shopDropdownOpen = false;
  isDesktopView = true;

  constructor(private router: Router, private route: ActivatedRoute,private authService: AuthService, private cartService: CartService) {}

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

  @HostListener('window:resize', [])
  onWindowResize() {
    this.checkViewport();
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
}
