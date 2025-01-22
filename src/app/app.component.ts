import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ecommerce-app';
  isAuthRoute = false;

  constructor(private router: Router) {}



  // Track scroll position
  private lastScrollTop = 0;
  private timeout: any;

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      const authRoutes = ['/login', '/signup'];
      this.isAuthRoute = authRoutes.includes(this.router.url);
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    clearTimeout(this.timeout);

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    this.timeout = setTimeout(() => {
      const navbar = document.getElementById('navbar');
      if (navbar) {
        if (scrollTop > this.lastScrollTop) {
          // User is scrolling down
          navbar.classList.remove('navbar-visible');
          navbar.classList.add('navbar-hidden');
        } else {
          // User is scrolling up
          navbar.classList.remove('navbar-hidden');
          navbar.classList.add('navbar-visible');
        }
      }

      this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Prevent negative values
    }, 100); // Adjust debounce delay as needed
  }
}
