import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IFindVolunteersCriteria, IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class VolunteersService {

  baseUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient) { }

  public findVolunteers(criteria: IFindVolunteersCriteria): Observable<Array<IUser>> {
    let queryParams = new HttpParams()
        .set('minAge', criteria.minAge)
        .set('maxAge', criteria.maxAge)
        .set('minHeight', criteria.minHeight)
        .set('maxHeight', criteria.maxHeight)
        .set('minWeight', criteria.minWeight)
        .set('maxWeight', criteria.maxWeight);

    return this.httpClient.get<Array<IUser>>(`${this.baseUrl}/volunteers/find`, { params: queryParams });
  }

  public findInvitedVolunteers(eventId: number) : Observable<Array<IUser>> {
    return this.httpClient.get<Array<IUser>>(`${this.baseUrl}/volunteers/event/${eventId}/invited`);
  }

  public findAcceptedVolunteers(eventId: number) : Observable<Array<IUser>> {
    return this.httpClient.get<Array<IUser>>(`${this.baseUrl}/volunteers/event/${eventId}/accepted`);
  }

  public findDeclinedVolunteers(eventId: number) : Observable<Array<IUser>> {
    return this.httpClient.get<Array<IUser>>(`${this.baseUrl}/volunteers/event/${eventId}/declined`);
  }

  public findConfirmedVolunteers(eventId: number) : Observable<Array<IUser>> {
    return this.httpClient.get<Array<IUser>>(`${this.baseUrl}/volunteers/event/${eventId}/confirmed`);
  }

  public findRejectedVolunteers(eventId: number) : Observable<Array<IUser>> {
    return this.httpClient.get<Array<IUser>>(`${this.baseUrl}/volunteers/event/${eventId}/rejected`);
  }
}
