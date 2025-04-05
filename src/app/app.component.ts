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

 
  }
}
