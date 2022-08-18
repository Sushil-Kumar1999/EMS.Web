import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IEvent } from 'src/app/models/event.model';
import { UpdateInvitationRequest, VolunteerDetails } from 'src/app/models/invitation.model';
import { IUser } from 'src/app/models/user.model';
import { EventsService } from 'src/app/services/events.service';
import { InvitationsService } from 'src/app/services/invitations.service';
import { VolunteersService } from 'src/app/services/volunteers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-invitations-for-event',
  templateUrl: './invitations-for-event.component.html',
  styleUrls: ['./invitations-for-event.component.scss']
})
export class InvitationsForEventComponent implements OnInit, OnDestroy {

  selectedEvent!: IEvent;
  selectedEventId!: number;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<IUser>;
  dataLength: number = 0;
  isLoadingData: boolean = false;
  tableColumns: string[] = ['firstName', 'lastName', 'email'];
  acceptedVolunteersTableColumns: string[] = ['select', 'firstName', 'lastName', 'email'];
  sub: any;
  selectedVolunteerIdsList: Array<string> = [];

  constructor(private route: ActivatedRoute, private volunteersService: VolunteersService,
              private eventsService: EventsService, private invitationsService: InvitationsService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.selectedEventId = +params['eventId'];
      this.eventsService.getEvent(this.selectedEventId)
        .subscribe(event => this.selectedEvent = event);
      this.findInvitedVolunteers();
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public loadVolunteers(tabLabel: string): void {
    switch (tabLabel) {
      case "Invited": this.findInvitedVolunteers(); break;
      case "Unresponded" : this.findUnrespondedVolunteers(); break;
      case "Accepted" : this.findAcceptedVolunteers(); break;
      case "Declined" : this.findDeclinedVolunteers(); break;
      case "Confirmed" : this.findConfirmedVolunteers(); break;
      case "Rejected" : this.findRejectedVolunteers(); break;
    }
  }
  private findInvitedVolunteers(): void {
    this.isLoadingData = true;
    this.volunteersService.findInvitedVolunteers(this.selectedEventId)
      .subscribe(volunteers => {
        this.dataSource = new MatTableDataSource<IUser>(volunteers);
        this.dataSource.paginator = this.paginator;
        this.dataLength = volunteers.length;
        this.isLoadingData = false;
      });
  }

  private findUnrespondedVolunteers(): void {
    this.isLoadingData = true;
    this.volunteersService.findUnrespondedVolunteers(this.selectedEventId)
      .subscribe(volunteers => {
        this.dataSource = new MatTableDataSource<IUser>(volunteers);
        this.dataSource.paginator = this.paginator;
        this.dataLength = volunteers.length;
        this.isLoadingData = false;
      });
  }
  
  private findAcceptedVolunteers(): void {
    this.isLoadingData = true;
    this.volunteersService.findAcceptedVolunteers(this.selectedEventId)
      .subscribe(volunteers => {
        this.dataSource = new MatTableDataSource<IUser>(volunteers);
        this.dataSource.paginator = this.paginator;
        this.dataLength = volunteers.length;
        this.isLoadingData = false;
      });
  }

  private findDeclinedVolunteers(): void {
    this.isLoadingData = true;
    this.volunteersService.findDeclinedVolunteers(this.selectedEventId)
      .subscribe(volunteers => {
        this.dataSource = new MatTableDataSource<IUser>(volunteers);
        this.dataSource.paginator = this.paginator;
        this.dataLength = volunteers.length;
        this.isLoadingData = false;
      });
  }

  private findConfirmedVolunteers(): void {
    this.isLoadingData = true;
    this.volunteersService.findConfirmedVolunteers(this.selectedEventId)
      .subscribe(volunteers => {
        this.dataSource = new MatTableDataSource<IUser>(volunteers);
        this.dataSource.paginator = this.paginator;
        this.dataLength = volunteers.length;
        this.isLoadingData = false;
      });
  }

  private findRejectedVolunteers(): void {
    this.isLoadingData = true;
    this.volunteersService.findRejectedVolunteers(this.selectedEventId)
      .subscribe(volunteers => {
        this.dataSource = new MatTableDataSource<IUser>(volunteers);
        this.dataSource.paginator = this.paginator;
        this.dataLength = volunteers.length;
        this.isLoadingData = false;
      });
  }

  public updateVolunteerIdsList(event: any) {
    let volunteerId: string = event.source.id;
    if (event.checked) {
      this.selectedVolunteerIdsList.push(volunteerId);
    }
    else {
      let index: number = this.selectedVolunteerIdsList.indexOf(volunteerId, 0);
      this.selectedVolunteerIdsList.splice(index, 1);
    }
  }

  public confirmInvitation(): void {
    this.invitationsService.confirmInvitation(this.getInvitationRequest())
      .subscribe(() => {
        this.findAcceptedVolunteers();
        Swal.fire({
          title: 'Success',
          text: `Volunteers confirmed for event ${this.selectedEvent.title}`,
          icon: 'success',
          showCloseButton: true
        });
      });
  }

  public rejectInvitation(): void {
    this.invitationsService.rejectInvitation(this.getInvitationRequest())
    .subscribe(() => {
      this.findAcceptedVolunteers();
      Swal.fire({
        title: 'Success',
        text: `Volunteers rejected for event ${this.selectedEvent.title}`,
        icon: 'success',
        showCloseButton: true
      });
    });
  }

  private getInvitationRequest(): UpdateInvitationRequest {
    let volunteers: Array<IUser> = this.dataSource.data
                        .filter(v => this.selectedVolunteerIdsList.includes(v.id));
    const request : UpdateInvitationRequest =  {
      eventId: this.selectedEventId,
      volunteerDetails: volunteers.map(v => new VolunteerDetails(v.id, v.email))
    };

    return request;
  }
}
