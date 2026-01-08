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

  /**
   * Format FAQ answer: add line break after each `:` and `.`
   */
  formatFaqAnswer(text: string): string {
    if (!text) return "";
    // Add line break after : and . (but not for abbreviations like "e.g." or numbers like "1.5")
    return text
      .replace(/:\s*/g, ":\n")
      .replace(/\.(?=\s+[A-Z])/g, ".\n")
      .replace(/\n\s*\n/g, "\n"); // Remove double line breaks
  }

  /**
   * Format Important Info: split by `.` into array of lines for bullet points
   * Each sentence becomes a bullet point
   */
  formatImportantInfoLines(text: string): string[] {
    if (!text) return [];
    // Split by period followed by space or end of string, filter empty strings
    return text
      .split(/\.(?:\s+|$)/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  }
}
