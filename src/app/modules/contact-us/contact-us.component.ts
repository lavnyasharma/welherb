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
    question: "What is the philosophy behind your formulations?",
    answer: "Modern living weakens the body's natural ability to take care of itself. Using Ayurveda, our formulations are prepared to nourish and support your body at its roots. Once you restore the internal balance within, your body thrives naturally. We prepare our medicines using whole Ayurvedic ingredients and traditional methods, focusing on long-term balance. Our medicines recognise the body's healing capabilities and work WITH your body to support foundational well-being.",
    isOpen: false,
  },
  {
    question: "How long have these formulations been in use?",
    answer: "Our formulations are rooted in over 100 years of Ayurvedic practice spanning regions of Punjab and Delhi. Passed down through four generations, they have been refined by licensed Ayurvedic Vaids D. D. Sharma and O. P. Sharma, who have collectively served their community for over 10 decades, shaping these formulations through real outcomes and lived experiences.",
    isOpen: false,
  },
  {
    question: "Is this safe for long-term use?",
    answer: "Our formulations are designed with long-term balance in mind. They are prepared using whole Ayurvedic ingredients and novel combinations that have been refined over 4 generations. When taken as recommended, they are intended to support your body gently, without overloading your system. Kindly make sure to read the Important info section (located at the bottom) on the respective product page to understand product-specific indications before use.",
    isOpen: false,
  },
  {
    question: "How do you ensure quality and authenticity?",
    answer: "Quality has always come first for us. From preparing these medicines in our family's home by hand to preparing them today at our manufacturing facility, the one focus has been to ensure the quality & safety for those who choose to trust us with their health. We follow authentic traditional processes and use high-grade Ayurvedic ingredients. We conduct 3rd party lab testing for heavy metals, aflatoxins, pesticides and microbial contamination to confirm the safety of our medicines.",
    isOpen: false,
  },
  {
    question: "How long does it take to see results?",
    answer: "Ayurveda works by supporting the body at its roots, so results build gradually. Many people begin to notice changes within a few weeks, while foundational improvements may take longer. Consistent use, along with mindful lifestyle choices, helps the body reap long-lasting benefits.",
    isOpen: false,
  },
  {
    question: "Can I take this along with my current medication?",
    answer: "Our medicines provide gentle and supportive care. If you are currently on medication or have a medical condition, we recommend checking with your physician or an Ayurvedic practitioner before starting, so your care is always prioritised.",
    isOpen: false,
  },
  {
    question: "Who should take caution before use?",
    answer: "If you are pregnant, breastfeeding, have a serious medical condition, or are taking prescription medication, please consult your healthcare provider before use. We also recommend reading the 'Important Info' section for each medicine to understand the Do's and Don'ts of the product before purchase to ensure the best results.",
    isOpen: false,
  },
  {
    question: "Do you ship across India? How long does delivery take?",
    answer: "Yes, we currently ship across most locations in India. Orders are usually delivered within 3-7 days, depending on your location. You will receive tracking details once your order is dispatched.",
    isOpen: false,
  },
  {
    question: "How can I track my order?",
    answer: "You can track your order under 'Orders' tab in your profile section. You can also track it directly from the courier partner's website using the shared tracking ID. For all additional information regarding shipping, returns & cancellation, please go through our Shipping and Refund policy.",
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
