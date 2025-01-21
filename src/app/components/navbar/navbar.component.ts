import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  items: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Shop',
        icon: 'pi pi-cart',
        items: [
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
        label: 'Bundle Up',
        icon: 'pi pi-box',
        routerLink: (['/shop'])
      },
      {
        label: 'Discover',
        icon: 'pi pi-search',
        routerLink: '/discover'
      },
      {
        label: 'Expert Help',
        icon: 'pi pi-question-circle',
        routerLink: '/expert-help'
      },
      {
        label: 'Shop All',
        icon: 'fa-solid fa-shop',
        routerLink: '/shopall'
      }
    ];
  }

  navigateHome() {
    this.router.navigate(['/home']);
  }
  cart(){
    this.router.navigate(['/cart']);
  }
}
