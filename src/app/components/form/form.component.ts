import { Component } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
name: string = '';
  email: string = '';

  onSubmit(): void {
    // Trim whitespace
    this.name = this.name.trim();
    this.email = this.email.trim();

    // Validate name
    if (!this.name) {
      alert('Please enter your name');
      return;
    }

    // Validate email
    if (!this.email) {
      alert('Please enter your email address');
      return;
    }

    // Email pattern validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Success message
    alert(`Thank you ${this.name}! Welcome to Ayurveda Simplified. Check your email at ${this.email} for your 15% OFF discount code.`);
    
    // Clear form
    this.name = '';
    this.email = '';
  }

  onKeyPress(event: KeyboardEvent): void {
    // Allow submission with Enter key
    if (event.key === 'Enter') {
      this.onSubmit();
    }
  }
}
