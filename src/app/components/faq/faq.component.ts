import { Component, Input } from "@angular/core";

@Component({
  selector: "app-faq",
  templateUrl: "./faq.component.html",
  styleUrls: ["./faq.component.css"],
})
export class FaqComponent {
  @Input() faq: any[] = [];
  @Input() importantInfo: any[] = [];

  activeImportantIndex: number | null = null;
  activeFaqIndex: number | null = null;

  toggleImportant(index: number) {
    this.activeImportantIndex =
      this.activeImportantIndex === index ? null : index;
  }

  toggleFaq(index: number) {
    this.activeFaqIndex = this.activeFaqIndex === index ? null : index;
  }
}
