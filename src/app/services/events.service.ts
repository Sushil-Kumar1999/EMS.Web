import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICreateEventRequest, IEvent } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  baseUrl = environment.baseUrl;
  
  constructor(private httpClient: HttpClient) { }

  public listEvents(): Observable<Array<IEvent>> {
    return this.httpClient.get<Array<IEvent>>(`${this.baseUrl}/events`);
  }

  public createEvent(event: ICreateEventRequest): Observable<number> {
    return this.httpClient.post<number>(`${this.baseUrl}/events`, event);
  }

  public getEvent(eventId: number): Observable<IEvent> {
    return this.httpClient.get<IEvent>(`${this.baseUrl}/events/${eventId}`);
  }

  public findEventsInvitedTo(volunteerId: string) : Observable<Array<IEvent>> {
    return this.httpClient.get<Array<IEvent>>(`${this.baseUrl}/events/volunteer/${volunteerId}/invited`);
  }

  public findEventsUnrespondedTo(volunteerId: string) : Observable<Array<IEvent>> {
    return this.httpClient.get<Array<IEvent>>(`${this.baseUrl}/events/volunteer/${volunteerId}/unresponded`);
  }

  public findEventsAccepted(volunteerId: string) : Observable<Array<IEvent>> {
    return this.httpClient.get<Array<IEvent>>(`${this.baseUrl}/events/volunteer/${volunteerId}/accepted`);
  }

  public findEventsDeclined(volunteerId: string) : Observable<Array<IEvent>> {
    return this.httpClient.get<Array<IEvent>>(`${this.baseUrl}/events/volunteer/${volunteerId}/declined`);
  }

  public findEventsConfirmedFor(volunteerId: string) : Observable<Array<IEvent>> {
    return this.httpClient.get<Array<IEvent>>(`${this.baseUrl}/events/volunteer/${volunteerId}/confirmed`);
  }

  public findEventsRejectedFor(volunteerId: string) : Observable<Array<IEvent>> {
    return this.httpClient.get<Array<IEvent>>(`${this.baseUrl}/events/volunteer/${volunteerId}/rejected`);
  }
}
