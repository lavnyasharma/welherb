import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']  // ✅ typo fixed: was "styleUrl"
})
export class FaqComponent implements OnInit, OnChanges {
  @Input() faq: any;

  leftColumn: any[] = [];
  rightColumn: any[] = [];
  activeIndex: number | null = null;

  ngOnInit() {
    this.splitFAQs();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['faqs']) {
      this.splitFAQs();
    }
  }

  splitFAQs() {
    const mid = Math.ceil(this.faq.length / 2);
    this.leftColumn = this.faq.slice(0, mid);
    this.rightColumn = this.faq.slice(mid);
  }

  toggle(index: number) {
    this.activeIndex = this.activeIndex === index ? null : index;
  }
}
