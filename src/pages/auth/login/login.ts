import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api/api-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    remember: new FormControl(false),
  });

  otpForm = new FormGroup({
    otp: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{6}$/),
    ]),
  });

  forgotPasswordForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  isOtpRequired = false;
  isForgotPasswordMode = false;
  tempToken: string | null = null;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.toastr.warning('Please enter username and password', 'Validation');
      return;
    }

    const credentials = {
      username: this.loginForm.value.username!,
      password: this.loginForm.value.password!,
    };

    this.apiService.login(credentials).subscribe({
      next: (response) => {
        if (response.message === 'OTP is required!') {
          this.isOtpRequired = true;
          this.tempToken = response.data.tempToken;
          this.toastr.info(
            'Please enter the OTP to complete login',
            'OTP Required'
          );
        } else {

          localStorage.setItem('token', response.data.jwtToken);
          localStorage.setItem('isLoggedIn', response.data.isUserLoggedIn);
          localStorage.setItem('username', response.data.username);
          localStorage.setItem('multiFactor', response.data.multiFactor);

          // localStorage.setItem('tempToken', response.data.tempToken);


          this.router.navigate(['/dashboard']);
          // this.toastr.success('Login successful', 'Success');
        }
      },
      error: (error) => {
        console.log('Login error:', error);
        this.toastr.error('Invalid username or password', 'Login Failed');
      },
    });
  }

  verifyOtp() {
    if (this.otpForm.invalid) {
      this.otpForm.markAllAsTouched();
      this.toastr.warning('Please enter a valid 6-digit OTP', 'Validation');
      return;
    }

    const otp = this.otpForm.value.otp!;

    this.apiService.loginWithOtp(this.tempToken!, otp).subscribe({
      next: (response) => {
        console.log('OTP verification response:', response);
        this.router.navigate(['/dashboard/home']);

        localStorage.setItem('token', response.data.jwtToken);
        localStorage.setItem('isLoggedIn', response.data.isUserLoggedIn);
        localStorage.setItem('username', response.data.username);
                  localStorage.setItem('multiFactor', response.data.multiFactor);

        this.tempToken = null; // Clear tempToken after successful login
        // this.toastr.success('Login successful', 'Success');
      },
      error: (error) => {
        console.log('OTP verification error:', error);
        this.toastr.error('Invalid OTP', 'Verification Failed');
      },
    });
  }

  toggleForgotPassword() {
    this.isForgotPasswordMode = !this.isForgotPasswordMode;
    if (!this.isForgotPasswordMode) {
      this.forgotPasswordForm.reset();
    }
  }

  submitForgotPassword() {
    if (this.forgotPasswordForm.invalid) {
      this.forgotPasswordForm.markAllAsTouched();
      this.toastr.warning('Please enter username and email', 'Validation');
      return;
    }

    const username = this.forgotPasswordForm.value.username!;
    const email = this.forgotPasswordForm.value.email!;

    this.apiService.forgotPassword({ username, email }).subscribe({
      next: (response) => {
        this.toastr.success('Password reset instructions sent to your email', 'Success');
        this.isForgotPasswordMode = false;
        this.forgotPasswordForm.reset();
      },
      error: (error) => {
        console.log('Forgot password error:', error);
        this.toastr.error('Failed to send password reset email', 'Error');
      },
    });
  }
}
