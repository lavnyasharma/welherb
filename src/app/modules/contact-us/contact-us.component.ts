import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

interface FAQ {
  question: string;
  answer: string;
  isOpen: boolean;
}

@Component({
  selector: "app-contact-us",
  templateUrl: "./contact-us.component.html",
  styleUrls: ["./contact-us.component.css"],
})
export class ContactUsComponent implements OnInit {
  contactForm: FormGroup;
  isSubmitting = false;
  showSuccessMessage = false;

  faqs: FAQ[] = [
    {
      question: "How do I place an order?",
      answer:
        "Our ayurvedic expert are here to help on your wellness journey. Reach out to us through any of the following channels.",
      isOpen: false,
    },
    {
      question: "What is your return policy",
      answer:
        "Our ayurvedic expert are here to help on your wellness journey. Reach out to us through any of the following channels.",
      isOpen: false,
    },
    {
      question: "How do I place an order?",
      answer:
        "Our ayurvedic expert are here to help on your wellness journey. Reach out to us through any of the following channels.",
      isOpen: false,
    },
    {
      question: "How do I place an order?",
      answer:
        "Our ayurvedic expert are here to help on your wellness journey. Reach out to us through any of the following channels.",
      isOpen: false,
    },
  ];

  constructor(private formBuilder: FormBuilder) {
    this.contactForm = this.createContactForm();
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private createContactForm(): FormGroup {
    return this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      phone: ["", [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ["", [Validators.required, Validators.email]],
      about: ["", Validators.required],
      message: ["", [Validators.required, Validators.minLength(10)]],
    });
  }

  private initializeForm(): void {
    this.contactForm.markAsUntouched();
    this.showSuccessMessage = false;
    this.isSubmitting = false;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit(): void {
    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      const formData = this.contactForm.value;

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
      this.markFormGroupTouched(this.contactForm);
    }
  }

  private async submitContactForm(formData: any): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (Math.random() < 0.95) {
      return Promise.resolve();
    } else {
      return Promise.reject(new Error("Network error"));
    }
  }

  private handleSubmissionSuccess(): void {
    this.showSuccessMessage = true;
    this.contactForm.reset();

    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 5000);
  }

  private handleSubmissionError(error: any): void {
    console.error("Contact form submission error:", error);
    alert("Sorry, there was an error sending your message. Please try again.");
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control) {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }

  toggleFaq(index: number): void {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }
}
