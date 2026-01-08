import { Component, Input } from "@angular/core";

@Component({
  selector: "app-prod-desc",
  templateUrl: "./prod-desc.component.html",
  styleUrls: ["./prod-desc.component.css"],
})
export class ProdDescComponent {
  @Input() color: string = ""; // Default to an empty string if no color is passed
}
