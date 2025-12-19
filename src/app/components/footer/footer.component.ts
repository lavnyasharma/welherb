import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrl: "./footer.component.css",
})
export class FooterComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const category = this.route.snapshot.queryParamMap.get("category");
  }
}
