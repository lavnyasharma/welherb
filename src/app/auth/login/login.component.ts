import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  onLogin(event: Event) {
    event.preventDefault();
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        this.toastr.success('Login successful!', 'Success');
        this.router.navigate(['/dashboard']); 
      },
      (error) => {
        this.toastr.error('Login failed. Please try again.', 'Error');
      }
    );
  }
}
