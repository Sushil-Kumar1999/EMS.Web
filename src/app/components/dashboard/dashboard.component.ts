import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IEvent } from 'src/app/models/event.model';
import { AuthService } from 'src/app/services/auth.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  loggedInUserRole!: string;
  loggedInUserId!: string;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<IEvent>;
  dataLength: number = 0;
  isLoadingData: boolean = false;
  tableColumns: string[] = ['title', 'location', 'startDate', 'endDate'];

  constructor(private authService: AuthService, private eventsService: EventsService) {  }

  ngOnInit(): void {
    this.loggedInUserId = this.authService.getLoggedInUserId();
    this.loggedInUserRole = this.authService.getLoggedInUserRole();
    if (this.loggedInUserRole == 'Volunteer') {
      this.findEventsInvitedTo();
    }
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
    this.eventsService.findEventsInvitedTo(this.loggedInUserId)
      .subscribe(events => {
        this.dataSource = new MatTableDataSource<IEvent>(events);
        this.dataSource.paginator = this.paginator;
        this.dataLength = events.length;
        this.isLoadingData = false;
      });
  }

  private findEventsUnrespondedTo(): void {
    this.isLoadingData = false;
    this.eventsService.findEventsUnrespondedTo(this.loggedInUserId)
      .subscribe(events => {
        this.dataSource = new MatTableDataSource<IEvent>(events);
        this.dataSource.paginator = this.paginator;
        this.dataLength = events.length;
        this.isLoadingData = false;
      });
  }
  private findEventsAccepted(): void {
    this.isLoadingData = false;
    this.eventsService.findEventsAccepted(this.loggedInUserId)
      .subscribe(events => {
        this.dataSource = new MatTableDataSource<IEvent>(events);
        this.dataSource.paginator = this.paginator;
        this.dataLength = events.length;
        this.isLoadingData = false;
      });
  }

  private findEventsDeclined(): void {
    this.isLoadingData = false;
    this.eventsService.findEventsDeclined(this.loggedInUserId)
      .subscribe(events => {
        this.dataSource = new MatTableDataSource<IEvent>(events);
        this.dataSource.paginator = this.paginator;
        this.dataLength = events.length;
        this.isLoadingData = false;
      });
  }

  private findEventsConfirmedFor(): void {
    this.isLoadingData = false;
    this.eventsService.findEventsConfirmedFor(this.loggedInUserId)
      .subscribe(events => {
        this.dataSource = new MatTableDataSource<IEvent>(events);
        this.dataSource.paginator = this.paginator;
        this.dataLength = events.length;
        this.isLoadingData = false;
      });
  }

  private findEventsRejectedFor(): void {
    this.isLoadingData = false;
    this.eventsService.findEventsRejectedFor(this.loggedInUserId)
      .subscribe(events => {
        this.dataSource = new MatTableDataSource<IEvent>(events);
        this.dataSource.paginator = this.paginator;
        this.dataLength = events.length;
        this.isLoadingData = false;
      });
  }

}
