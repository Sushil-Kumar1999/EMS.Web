import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ISendInvitationRequest } from '../models/invitation.model';

@Injectable({
  providedIn: 'root'
})
export class InvitationsService {

  baseUrl = environment.baseUrl;
  
  constructor(private httpClient: HttpClient) { }

  public sendInvitation(invitationRequest: ISendInvitationRequest) : Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/invitations/send`, invitationRequest);
  } 
}
