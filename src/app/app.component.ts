// app.component.ts
import { Component, OnInit, HostListener } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { filter } from "rxjs/operators";
import { ViewportScroller } from "@angular/common";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  isAuthRoute = false;
  showScrollTopButton = false;

  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {}

  ngOnInit(): void {
    const authRoutes = ["/login", "/signup"];

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isAuthRoute = authRoutes.includes(this.router.url);
        // Scroll to top on every navigation
        window.scrollTo(0, 0);
        // Alternative method:
        // this.viewportScroller.scrollToPosition([0, 0]);
      });
  }

  @HostListener("window:scroll", [])
  onWindowScroll(): void {
    // Show button when scrolled down more than 300px
    this.showScrollTopButton = window.pageYOffset > 300;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
