import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment'
import { ILoginResponse } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginEmail: string|any;
  token: string|any;
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient, private router: Router) { }

  
  public login(email: string, password: string): Observable<ILoginResponse> {
    const request = {
      Email: email,
      Password: password
    }
    return this.httpClient.post<ILoginResponse>(`${this.baseUrl}/auth/login`, request);
  }

  public saveToken(loginEmail: string, token: string) : void {
    this.loginEmail = loginEmail;
    this.token = token;

    localStorage.setItem('loginEmail', loginEmail);
    localStorage.setItem('token', token);
    const tokenPayload = this.parseJwt(token);
    localStorage.setItem('userRole', tokenPayload.role);
    localStorage.setItem('userId', tokenPayload.Id);
  }

  public logout(): void {
    this.loginEmail = '';
    this.token = '';

    localStorage.removeItem('loginEmail');
    localStorage.removeItem('token');

    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    return !(typeof this.token === 'undefined' || this.token === null || this.token === '');
  }

  private parseJwt (token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('')
    .map(function(c: string) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };

}
