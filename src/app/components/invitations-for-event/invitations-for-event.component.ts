import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/models/user.model';
import { VolunteersService } from 'src/app/services/volunteers.service';

@Component({
  selector: 'app-invitations-for-event',
  templateUrl: './invitations-for-event.component.html',
  styleUrls: ['./invitations-for-event.component.scss']
})
export class InvitationsForEventComponent implements OnInit {

  eventId!: number;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<IUser>;
  dataLength: number = 0;
  isLoadingData: boolean = false;
  tableColumns: string[] = ['firstName', 'lastName', 'email'];

  constructor(private route: ActivatedRoute, private volunteersService: VolunteersService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.eventId = +params['eventId'];
      this.findInvitedVolunteers();
   });
  }

  
  public loadVolunteers(tabLabel: string): void {
    switch (tabLabel) {
      case "Invited" : this.findInvitedVolunteers(); break;
      case "Accepted" : this.findAcceptedVolunteers(); break;
      case "Declined" : this.findDeclinedVolunteers(); break;
      case "Confirmed" : this.findConfirmedVolunteers(); break;
      case "Rejected" : this.findRejectedVolunteers(); break;
    }
  }
  
  private findInvitedVolunteers(): void {
    this.isLoadingData = true;
    this.volunteersService.findInvitedVolunteers(this.eventId)
      .subscribe(volunteers => {
        this.dataSource = new MatTableDataSource<IUser>(volunteers);
        this.dataSource.paginator = this.paginator;
        this.dataLength = volunteers.length;
        this.isLoadingData = false;
      });
  }
  
  private findAcceptedVolunteers(): void {
    this.isLoadingData = true;
    this.volunteersService.findAcceptedVolunteers(this.eventId)
      .subscribe(volunteers => {
        this.dataSource = new MatTableDataSource<IUser>(volunteers);
        this.dataSource.paginator = this.paginator;
        this.dataLength = volunteers.length;
        this.isLoadingData = false;
      });
  }

  private findDeclinedVolunteers(): void {
    this.isLoadingData = true;
    this.volunteersService.findDeclinedVolunteers(this.eventId)
      .subscribe(volunteers => {
        this.dataSource = new MatTableDataSource<IUser>(volunteers);
        this.dataSource.paginator = this.paginator;
        this.dataLength = volunteers.length;
        this.isLoadingData = false;
      });
  }

  private findConfirmedVolunteers(): void {
    this.isLoadingData = true;
    this.volunteersService.findConfirmedVolunteers(this.eventId)
      .subscribe(volunteers => {
        this.dataSource = new MatTableDataSource<IUser>(volunteers);
        this.dataSource.paginator = this.paginator;
        this.dataLength = volunteers.length;
        this.isLoadingData = false;
      });
  }

  private findRejectedVolunteers(): void {
    this.isLoadingData = true;
    this.volunteersService.findRejectedVolunteers(this.eventId)
      .subscribe(volunteers => {
        this.dataSource = new MatTableDataSource<IUser>(volunteers);
        this.dataSource.paginator = this.paginator;
        this.dataLength = volunteers.length;
        this.isLoadingData = false;
      });
  }
}
