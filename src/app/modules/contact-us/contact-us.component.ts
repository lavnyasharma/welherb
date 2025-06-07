import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface FAQ {
  question: string;
  answer: string;
  isOpen: boolean;
}

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  newsletter: boolean;
}

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  contactForm: FormGroup;
  isSubmitting = false;
  showSuccessMessage = false;
  
  faqs: FAQ[] = [
    {
      question: 'How do I place an order?',
      answer: 'You can place an order through our website by browsing our products, adding items to your cart, and proceeding to checkout. We accept multiple payment methods including credit cards, debit cards, and digital wallets.',
      isOpen: false
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for unopened products. If you\'re not satisfied with your purchase, you can return it within 30 days of delivery for a full refund or exchange.',
      isOpen: false
    },
    {
      question: 'Are your products certified organic?',
      answer: 'Yes, all our Ayurvedic products are certified organic and sourced from trusted suppliers. We maintain strict quality standards and provide certificates of authenticity for all our products.',
      isOpen: false
    },
    {
      question: 'How long does shipping take?',
      answer: 'Standard shipping within India takes 3-7 business days. We offer free shipping on orders above ₹499. Express shipping options are available for faster delivery.',
      isOpen: false
    },
    {
      question: 'Do you offer Ayurvedic consultations?',
      answer: 'Yes, we have certified Ayurvedic practitioners available for consultations. You can book a consultation through our website or by calling our support team.',
      isOpen: false
    },
    {
      question: 'Can I cancel or modify my order?',
      answer: 'Orders can be cancelled or modified within 2 hours of placement. After that, please contact our support team, and we\'ll do our best to accommodate your request.',
      isOpen: false
    }
  ];

  constructor(private formBuilder: FormBuilder) {
    this.contactForm = this.createContactForm();
  }

  ngOnInit(): void {
    // Component initialization
    this.initializeForm();
  }

  private createContactForm(): FormGroup {
    return this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^[0-9]{10}$/)]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]],
      newsletter: [false]
    });
  }

  private initializeForm(): void {
    // Reset form state
    this.contactForm.markAsUntouched();
    this.showSuccessMessage = false;
    this.isSubmitting = false;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldErrorMessage(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (!field || !field.errors) return '';

    const errors = field.errors;
    
    if (errors['required']) {
      return `${this.getFieldDisplayName(fieldName)} is required`;
    }
    
    if (errors['email']) {
      return 'Please enter a valid email address';
    }
    
    if (errors['minlength']) {
      const requiredLength = errors['minlength'].requiredLength;
      return `${this.getFieldDisplayName(fieldName)} must be at least ${requiredLength} characters`;
    }
    
    if (errors['pattern']) {
      if (fieldName === 'phone') {
        return 'Please enter a valid 10-digit phone number';
      }
    }
    
    return 'Invalid input';
  }

  private getFieldDisplayName(fieldName: string): string {
    const displayNames: { [key: string]: string } = {
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email',
      phone: 'Phone number',
      subject: 'Subject',
      message: 'Message'
    };
    
    return displayNames[fieldName] || fieldName;
  }

  onSubmit(): void {
    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      
      const formData: ContactFormData = this.contactForm.value;
      
      // Simulate API call
      this.submitContactForm(formData)
        .then(() => {
          this.handleSubmissionSuccess();
        })
        .catch((error) => {
          this.handleSubmissionError(error);
        })
        .finally(() => {
          this.isSubmitting = false;
        });
    } else {
      // Mark all fields as touched to show validation errors
      this.markFormGroupTouched(this.contactForm);
    }
  }

  private async submitContactForm(formData: ContactFormData): Promise<void> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real application, you would make an HTTP request here
    // Example:
    // return this.httpClient.post('/api/contact', formData).toPromise();
    
    console.log('Contact form submitted:', formData);
    
    // Simulate random success/failure for demo purposes (90% success rate)
    if (Math.random() < 0.9) {
      return Promise.resolve();
    } else {
      return Promise.reject(new Error('Network error'));
    }
  }

  private handleSubmissionSuccess(): void {
    this.showSuccessMessage = true;
    this.contactForm.reset();
    
    // Hide success message after 10 seconds
    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 10000);
    
    // Scroll to success message
    setTimeout(() => {
      const successElement = document.querySelector('.success-message');
      if (successElement) {
        successElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  }

  private handleSubmissionError(error: any): void {
    console.error('Contact form submission error:', error);
    
    // In a real application, you might want to show a user-friendly error message
    alert('Sorry, there was an error sending your message. Please try again or contact us directly.');
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control) {
        control.markAsTouched({ onlySelf: true });
        
        if (control instanceof FormGroup) {
          this.markFormGroupTouched(control);
        }
      }
    });
  }

  toggleFaq(index: number): void {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
    
    // Close other FAQs (accordion behavior)
    this.faqs.forEach((faq, i) => {
      if (i !== index) {
        faq.isOpen = false;
      }
    });
  }

  bookConsultation(): void {
    // In a real application, this would navigate to a consultation booking page
    // or open a consultation booking modal
    console.log('Booking consultation...');
    
    // Example navigation (uncomment if using Angular Router)
    // this.router.navigate(['/consultation']);
    
    // For demo purposes, show an alert
    alert('Consultation booking feature will be available soon! Please call us at +91 1800-123-4567 to book your consultation.');
  }

  // Utility method to reset the form
  resetForm(): void {
    this.contactForm.reset();
    this.showSuccessMessage = false;
    this.initializeForm();
  }

  // Method to pre-fill form for testing purposes
  fillTestData(): void {
    this.contactForm.patchValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '9876543210',
      subject: 'product-inquiry',
      message: 'I am interested in learning more about your Ayurvedic products for digestive health.',
      newsletter: true
    });
  }
}