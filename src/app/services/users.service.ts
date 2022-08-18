import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IRegisterUserRequest } from '../models/register-user-request.model';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient) { }

  public registerUser(user: IRegisterUserRequest): Observable<any>{
    return this.httpClient.post(`${this.baseUrl}/users/register`, user);
  }

  public listUsers(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(`${this.baseUrl}/users`);
  }
}
