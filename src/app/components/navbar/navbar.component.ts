import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  items: any;
  profileItems: MenuItem[] = [];
  isLoggedIn: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    // Subscribe to auth changes
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
          { label: 'ESR', routerLink: '/shop' },
          { label: 'Thyroid', routerLink: '/shop/thyroid' },
          { label: 'Heart', routerLink: '/shop/heart' },
          { label: 'Blood', routerLink: '/shop/blood' },
          { label: 'Liver', routerLink: '/shop/liver' },
          { label: 'Gut', routerLink: '/shop/gut' },
          { label: 'Diabetes', routerLink: '/shop/diabetes' },
          { label: 'Prostate', routerLink: '/shop/prostate' },
          { label: 'Migraine', routerLink: '/shop/migraine' },
          { label: 'Ayurvedic Multivitamins', routerLink: '/shop/ayurvedic-multivitamins' },
          { label: 'Body & Joint Pains', routerLink: '/shop/body-joint-pains' },
          { label: 'Weight Management', routerLink: '/shop/weight-management' },
          { label: 'Women’s Wellbeing', routerLink: '/shop/womens-wellbeing' },
          { label: 'Men’s Wellbeing', routerLink: '/shop/mens-wellbeing' },
          { label: 'Combos', routerLink: '/shop/combos' }
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
        routerLink: '/shopall'
      }
    ];
  }

  navigateHome() {
    this.router.navigate(['/home']);
  }

  handleCartClick(): void {
    if (this.isLoggedIn) {
      this.router.navigate(['/cart']); // Redirect to cart page
    } else {
      this.router.navigate(['/login']); // Redirect to login page
    }
  }

  profile() {
 
    this.router.navigate(['/profile']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
