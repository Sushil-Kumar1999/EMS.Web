import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment'
import { ILoginResponse } from '../models/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginEmail: string|any;
  token: string|any;
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient, private router: Router) { }

  
  public login(email: string, password: string): Observable<ILoginResponse> {
    const request = { email, password };

    return this.httpClient.post<ILoginResponse>(`${this.baseUrl}/auth/login`,
      JSON.stringify(request),
      {
        headers: new HttpHeaders().append('Content-Type', 'application/json'),
      });
  }

  public saveToken(loginEmail: string, token: string) : void {
    localStorage.setItem('loginEmail', loginEmail);
    localStorage.setItem('token', token);

    this.loginEmail = loginEmail;
    this.token = token;
  }

  public logout(): void {
    this.loginEmail = '';
    this.token = '';

    localStorage.removeItem('loginEmail');
    localStorage.removeItem('token');

    this.router.navigate(['/login']);
  }

  public isAuthenticated(): boolean {
    return !(typeof this.token === 'undefined' || this.token === null || this.token === '');
  }
}
