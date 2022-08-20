import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IEvent } from 'src/app/models/event.model';
import { AuthService } from 'src/app/services/auth.service';
import { EventsService } from 'src/app/services/events.service';
import { VolunteersService } from 'src/app/services/volunteers.service';
import { LocalStorageKeys } from 'src/app/Utils/local-storage-keys';

@Component({
  selector: 'app-volunteer-dashboard',
  templateUrl: './volunteer-dashboard.component.html',
  styleUrls: ['./volunteer-dashboard.component.scss']
})
export class VolunteerDashboardComponent implements OnInit {

  loggedInUserRole!: string;
  volunteerId!: string;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<IEvent>;
  dataLength: number = 0;
  isLoadingData: boolean = false;
  tableColumns: string[] = ['title', 'location', 'startDate', 'endDate'];

  constructor(private authService: AuthService, private eventsService: EventsService) {  }

  ngOnInit(): void {
    this.volunteerId = localStorage.getItem(LocalStorageKeys.USER_ID) as string;
    this.findEventsInvitedTo();
  }

  public loadEvents(tabLabel: string): void {
    switch (tabLabel) {
      case "Invited": this.findEventsInvitedTo(); break;
      case "Unresponded" : this.findEventsUnrespondedTo(); break;
      case "Accepted" : this.findEventsAccepted(); break;
      case "Declined" : this.findEventsDeclined(); break;
      case "Confirmed" : this.findEventsConfirmedFor(); break;
      case "Rejected" : this.findEventsRejectedFor(); break;
    }
  }

  private findEventsInvitedTo(): void {
    this.isLoadingData = false;
    this.eventsService.findEventsInvitedTo(this.volunteerId)
      .subscribe(events => {
        this.dataSource = new MatTableDataSource<IEvent>(events);
        this.dataSource.paginator = this.paginator;
        this.dataLength = events.length;
        this.isLoadingData = false;
      });
  }

  private findEventsUnrespondedTo(): void {
    this.isLoadingData = false;
    this.eventsService.findEventsUnrespondedTo(this.volunteerId)
      .subscribe(events => {
        this.dataSource = new MatTableDataSource<IEvent>(events);
        this.dataSource.paginator = this.paginator;
        this.dataLength = events.length;
        this.isLoadingData = false;
      });
  }
  private findEventsAccepted(): void {
    this.isLoadingData = false;
    this.eventsService.findEventsAccepted(this.volunteerId)
      .subscribe(events => {
        this.dataSource = new MatTableDataSource<IEvent>(events);
        this.dataSource.paginator = this.paginator;
        this.dataLength = events.length;
        this.isLoadingData = false;
      });
  }

  private findEventsDeclined(): void {
    this.isLoadingData = false;
    this.eventsService.findEventsDeclined(this.volunteerId)
      .subscribe(events => {
        this.dataSource = new MatTableDataSource<IEvent>(events);
        this.dataSource.paginator = this.paginator;
        this.dataLength = events.length;
        this.isLoadingData = false;
      });
  }

  private findEventsConfirmedFor(): void {
    this.isLoadingData = false;
    this.eventsService.findEventsConfirmedFor(this.volunteerId)
      .subscribe(events => {
        this.dataSource = new MatTableDataSource<IEvent>(events);
        this.dataSource.paginator = this.paginator;
        this.dataLength = events.length;
        this.isLoadingData = false;
      });
  }

  private findEventsRejectedFor(): void {
    this.isLoadingData = false;
    this.eventsService.findEventsRejectedFor(this.volunteerId)
      .subscribe(events => {
        this.dataSource = new MatTableDataSource<IEvent>(events);
        this.dataSource.paginator = this.paginator;
        this.dataLength = events.length;
        this.isLoadingData = false;
      });
  }
}
