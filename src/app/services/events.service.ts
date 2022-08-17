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

  public getMockEvents(): Observable<Array<any>> {
    let events = new Array();
    let event1 = {
        id: 1,
        description: "George brings projector for presentations.",
        location: "Barbados",
        title: "Quarterly Project Review Meeting",
        startDate: new Date(2022, 7, 23, 9, 0, 0),
        endDate: new Date(2022, 7, 23, 16, 0, 0)
    };
    let event2 = {
        id: 2,
        description: "",
        location: "Bermuda",
        title: "IT Group Mtg.",
        startDate: new Date(2022, 7, 24, 10, 0, 0),
        endDate: new Date(2022, 7, 24, 15, 0, 0)
    };
    let event3 = {
        id: 3,
        description: "",
        location: "Jamaica",
        title: "Course Social Media",
        startDate: new Date(2022, 7, 27, 11, 0, 0),
        endDate: new Date(2022, 7, 27, 13, 0, 0)
    };
    let event4 = {
        id: 4,
        description: "",
        location: "Haiti",
        title: "New Projects Planning",
        startDate: new Date(2022, 7, 23, 16, 0, 0),
        endDate: new Date(2022, 7, 23, 18, 0, 0)
    };
    let event5 = {
        id: 5,
        description: "",
        location: "Trinidad",
        title: "Interview with James",
        startDate: new Date(2022, 7, 25, 15, 0, 0),
        endDate: new Date(2022, 7, 25, 17, 0, 0)
    };
    let event6 = {
        id: 6,
        description: "",
        location: "Angola",
        title: "Interview with Nancy",
        startDate: new Date(2022, 7, 26, 14, 0, 0),
        endDate: new Date(2022, 7, 26, 16, 0, 0)
    };
    events.push(event1);
    events.push(event2);
    events.push(event3);
    events.push(event5);
    events.push(event6);

    return of(events);
  }
}
