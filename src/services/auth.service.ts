import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = "/welherb"
  private authTokenKey = 'auth_token';

  private authTokenSubject = new BehaviorSubject<string | null>(this.getToken());
  authToken$ = this.authTokenSubject.asObservable();

  constructor(private http: HttpClient) {}

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
    const payload = { email, password };
    return this.http.post<any>(`${this.authUrl}/user/signup`, payload).pipe(
      tap(response => {
        if (response.token) {
          this.saveToken(response.token);
        }
      })
    );
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
