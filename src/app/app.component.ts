import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isAuthRoute = false;
  navbarClass = 'navbar-visible';
  lastScrollTop = 0;


  constructor(private router: Router) {}

  ngOnInit(): void {
    const authRoutes = ['/login', '/signup'];

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.isAuthRoute = authRoutes.includes(this.router.url);
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > this.lastScrollTop && currentScroll > 100) {
      this.navbarClass = 'navbar-hidden'; // Hide navbar on scroll down
    } else {
      this.navbarClass = 'navbar-visible'; // Show navbar on scroll up
    }

    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }
}
