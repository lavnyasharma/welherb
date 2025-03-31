import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  onSignup(event: Event) {
    event.preventDefault();
    this.authService.signup(this.name,this.email, this.password).subscribe(
      (response) => {
        this.toastr.success('Signup successful!', 'Success');
        this.router.navigate(['/dashboard']); // Redirect after signup
      },
      (error) => {
        this.toastr.error('Signup failed. Please try again.', 'Error');
      }
    );
  }
}
