import { Component } from '@angular/core';
interface AccordionState {
  [key: string]: boolean;
}
@Component({
  selector: 'app-shippingand-refund-policy',
  templateUrl: './shippingand-refund-policy.component.html',
  styleUrl: './shippingand-refund-policy.component.css'
})
export class ShippingandRefundPolicyComponent {
  expandedSections: AccordionState = {};
  
  // Contact information
  supportEmail = 'wellbersocial@gmail.com';
  supportPhone = '9643550550';

  constructor() { }

  ngOnInit(): void {
    this.initializeAccordions();
  }

  // Initialize all accordion states
  initializeAccordions(): void {
    this.expandedSections = {
      ordersPayments: true,
      shippingDelivery: true,
      cancellations: false,
      returnExchange: false,
      refunds: false,
      policyUpdates: false,
      questions: false
    };
  }

  // Toggle accordion section with proper state management
  toggleSection(sectionKey: string): void {
    if (this.expandedSections.hasOwnProperty(sectionKey)) {
      this.expandedSections[sectionKey] = !this.expandedSections[sectionKey];
    }
  }

  // Check if section is expanded
  isExpanded(sectionKey: string): boolean {
    return this.expandedSections[sectionKey] || false;
  }

  // Get support email
  getSupportEmail(): string {
    return this.supportEmail;
  }

  // Get support phone
  getSupportPhone(): string {
    return this.supportPhone;
  }
}
