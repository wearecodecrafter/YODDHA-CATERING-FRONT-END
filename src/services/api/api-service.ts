import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from './base-url';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  //==================== Authintication Login===================

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${BASE_URL}/auth/login`, credentials);
  }

  //===================logout ===============

  logout(username: string): Observable<any> {
    return this.http.post(
      `${BASE_URL}/auth/logout`,
      {},
      { params: { username } }
    );
  }

  // ================== 2 FA enable  ==========================
  enableTwoFactorAuthentication(username: string): Observable<any> {
    return this.http.post(
      `${BASE_URL}/auth/enable-two-factor-authentication`,
      {},
      {
        params: { username },
      }
    );
  }

  // ================== Verify OTP ==========================
  verifyOTP(otp: number): Observable<any> {
    return this.http.post(`${BASE_URL}/auth/verify-otp`, { otp });
  }

  // ================== Login with OTP ==========================
  loginWithOtp(tempToken: string, otp: string): Observable<any> {
    return this.http.post(`${BASE_URL}/auth/login-with-otp`, {
      tempToken,
      otp,
    });
  }

  // ================== Disable 2FA ==========================
  disableTwoFactorAuthentication(
    username: string,
    otp: number
  ): Observable<any> {
    return this.http.post(
      `${BASE_URL}/auth/disable-two-factor-authentication`,
      { otp },
      { params: { username } }
    );
  }

  // ================== Forgot Password ==========================
  forgotPassword(data: { username: string; email: string }): Observable<any> {
    return this.http.post(`${BASE_URL}/auth/forgot-password`, data);
  }
}
