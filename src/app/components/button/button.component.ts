import { Component, Input } from "@angular/core";

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrl: "./button.component.css",
})
export class ButtonComponent {
  @Input() label: string = "";
  @Input() type: "button" | "submit" | "reset" = "button";
  @Input() variant: "primary" | "outline" = "primary";
  @Input() icon: string = "";
  @Input() iconSrc: string = ""; // For custom SVG icons
  @Input() bgColor: string = "";
  @Input() textColor: string = "";
  @Input() borderColor: string = "";
}
