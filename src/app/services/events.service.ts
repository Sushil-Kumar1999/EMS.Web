import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
