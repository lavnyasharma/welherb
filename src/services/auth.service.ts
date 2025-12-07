import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = "/welherb"
  private authTokenKey = 'auth_token';

  private authTokenSubject = new BehaviorSubject<string | null>(this.getToken());
  authToken$ = this.authTokenSubject.asObservable();

  constructor(private http: HttpClient, private apiService: ApiService) {}

  private saveToken(token: string): void {
    localStorage.setItem(this.authTokenKey, token);
    this.authTokenSubject.next(token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.authTokenKey);
    this.authTokenSubject.next(null);
  }

  // -------- Legacy email/password login (if still used anywhere) -------- //
  login(email: string, password: string): Observable<any> {
    const payload = { email, password };
    return this.http.post<any>(`${this.authUrl}/user/login`, payload).pipe(
      tap(response => {
        if (response.token) {
          this.saveToken(response.token);
        }
      })
    );
  }

  signup(name: string, email: string, password: string): Observable<any> {
    const payload = { name,email, password };
    return this.http.post<any>(`${this.authUrl}/user/register`, payload).pipe(
      tap(response => {
        if (response.token) {
          this.saveToken(response.token);
        }
      })
    );
  }

  // -------- Mobile + OTP login (new flow) -------- //

  sendOtp(mobile: string): Observable<any> {
    return this.apiService.sendOtp(mobile);
  }

  verifyOtp(mobile: string, otp: string): Observable<any> {
    return this.apiService.verifyOtp(mobile, otp).pipe(
      tap(async (response) => {
        // If backend explicitly says user does not exist, auto-register with mobile
        if (response && response.exists === false) {
          const payload = { name: '', email: '', mobile };
          try {
            const registerResponse: any = await this.http
              .post<any>(`${this.authUrl}/user/register`, payload)
              .toPromise();

            if (registerResponse && registerResponse.token) {
              this.saveToken(registerResponse.token);
              return;
            }
          } catch {
            // If registration fails, fall back to existing token logic below
          }
        }

        // Fallback / normal path: use token from verifyOtp response or temp token
        const token = response && response.token
          ? response.token
          : `otp_login_${mobile}`;
        this.saveToken(token);
      })
    );
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
