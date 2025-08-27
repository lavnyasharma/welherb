import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit, OnChanges {
  @Input() faq: any[] = [];
  
  leftColumn: any[] = [];
  rightColumn: any[] = [];
  activeIndex: number | null = null;

  // Sample FAQ data that matches the image content
  defaultFAQs = [
    {
      question: "Disclaimer",
      answer: "Always use Ayurvedic medicines as directed by a qualified practitioner. Consult your doctor if you are pregnant, nursing, or have any medical conditions. Keep out of reach of children. Store in a cool, dry place."
    },
    {
      question: "Additional Notes",
      answer: "This product contains natural ingredients and may vary in color, taste, and texture. This is normal and does not affect the quality or efficacy of the product."
    },
    {
      question: "Safety Information", 
      answer: "Always use Ayurvedic medicines as directed by a qualified practitioner. Consult your doctor if you are pregnant, nursing, or have any medical conditions. Keep out of reach of children. Store in a cool, dry place."
    }
  ];

  ngOnInit() {
    // Use default FAQs if no input provided
    if (!this.faq || this.faq.length === 0) {
      this.faq = this.defaultFAQs;
    }
    this.splitFAQs();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['faq']) {
      this.splitFAQs();
    }
  }

  splitFAQs() {
    if (this.faq && this.faq.length > 0) {
      const mid = Math.ceil(this.faq.length / 2);
      this.leftColumn = this.faq.slice(0, mid);
      this.rightColumn = this.faq.slice(mid);
    }
  }

  toggle(index: number) {
    this.activeIndex = this.activeIndex === index ? null : index;
  }
}