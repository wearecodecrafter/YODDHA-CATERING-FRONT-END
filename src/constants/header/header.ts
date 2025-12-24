import { Component, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api/api-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
  schemas: [NO_ERRORS_SCHEMA],
})
export class Header implements OnInit {
  username: string | null = null;

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.is2FAEnabled = localStorage.getItem('multiFactor') === 'true';
  }
  constructor(
    private router: Router,
    private apiService: ApiService,
    private toastr: ToastrService
  ) {}

  otpValue: string = '';

  logOut() {
    if (!this.username) {
      this.toastr.error('Username not found', 'Error');
      return;
    }
    this.apiService.logout(this.username).subscribe({
      next: (response) => {
        console.log('Logout response:', response);
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('multiFactor');
        this.router.navigate(['/login']);
        this.toastr.success('Logged out successfully', 'Logout');
      },
      error: (error) => {
        console.log('Logout error:', error);
        this.toastr.error('Logout failed', 'Error');
      },
    });
  }

  isMobileMenuOpen = false;
  isEmployeeMasterOpen = false;
  isSettingsOpen = false;
  is2FAEnabled = false;
  qrCodeData: string | null = null;
  showQRModal = false;
  showDisableModal = false;
  disableOtpValue: string = '';

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    this.isEmployeeMasterOpen = false;
    this.isSettingsOpen = false;
  }

  toggleEmployeeMaster() {
    this.isEmployeeMasterOpen = !this.isEmployeeMasterOpen;
  }

  toggleSettings() {
    this.isSettingsOpen = !this.isSettingsOpen;
  }

  toggle2FA() {
    if (!this.username) {
      this.toastr.error('Username not found', 'Error');
      return;
    }

    if (this.is2FAEnabled) {
      this.showDisableModal = true;
    } else {
      // Enable 2FA
      this.apiService.enableTwoFactorAuthentication(this.username).subscribe({
        next: (response: any) => {
          const qrCode =
            response.qrCode || (response.data && response.data.qrCode);
          if (qrCode) {
            console.log(response);

            this.qrCodeData = `data:image/png;base64,${qrCode}`;
            this.showQRModal = true;
            // this.toastr.success('2FA enabled successfully', 'Success');
          } else {
            this.toastr.error('QR code data not found in response', 'Error');
          }
        },
        error: (error) => {
          console.error('2FA enable error:', error);
          this.toastr.error('Failed to enable 2FA', 'Error');
        },
      });
    }
  }

  disable2FA() {
    if (!this.username) {
      this.toastr.error('Username not found', 'Error');
      return;
    }

    if (!this.disableOtpValue || this.disableOtpValue.length !== 6) {
      this.toastr.error('Please enter a valid 6-digit OTP', 'Error');
      return;
    }

    const otp = Number(this.disableOtpValue);

    this.apiService
      .disableTwoFactorAuthentication(this.username, otp)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.is2FAEnabled = false;
          this.qrCodeData = null;
          this.showQRModal = false;
          this.showDisableModal = false;
          this.disableOtpValue = '';
         localStorage.setItem('multiFactor', response.data.multiFactor);

          this.toastr.success('2FA disabled successfully', 'Success');
        },
        error: (error) => {
          console.error('2FA disable error:', error);
          this.toastr.error('Failed to disable 2FA', 'Error');
        },
      });
  }

  verifyOTP() {
    if (!this.otpValue || this.otpValue.length !== 6) {
      this.toastr.error('Please enter a valid 6-digit OTP', 'Error');
      return;
    }

    const otp = Number(this.otpValue);

    this.apiService.verifyOTP(otp).subscribe({
      next: (response) => {

        console.log(response);

        localStorage.setItem("multiFactor",response.data.multiFactor);

        this.toastr.success('OTP verified successfully', 'Success');
        this.is2FAEnabled = true;
        this.showQRModal = false;
        this.otpValue = '';

      },
      error: () => {
        this.toastr.error('OTP verification failed', 'Error');
      },
    });
  }
}
