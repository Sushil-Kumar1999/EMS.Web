import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { IEvent } from 'src/app/models/event.model';
import { EventsService } from 'src/app/services/events.service';
import { LocalStorageKeys } from 'src/app/Utils/local-storage-keys';
import { InviteVolunteersComponent } from '../invite-volunteers/invite-volunteers.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSizeOptions = [5, 10];

  dataSource!: MatTableDataSource<IEvent>;
  tableColumns: string[] = ['title', 'startDate', 'endDate'];

  length = 0;
  isLoadingEvents: boolean = true;
  
  constructor(private eventsService: EventsService, public dialog: MatDialog,
              private router: Router, private route: ActivatedRoute) { }

  public ngOnInit(): void {
    if (!this.isUserVolunteer()) {
      this.tableColumns.push('actions');
    }
    this.loadEvents();
  }

  public isUserVolunteer(): boolean {
    return localStorage.getItem(LocalStorageKeys.USER_ROLE) == "Volunteer";
  }

  public loadEvents() : void {
    this.eventsService.listEvents().subscribe((events : Array<IEvent>) => {
      this.dataSource = new MatTableDataSource<IEvent>(events);
      this.dataSource.paginator = this.paginator;
      this.length = events.length;
      this.isLoadingEvents = false;
     });
  }

  public openInviteDialog(event: IEvent) {
    const config = new MatDialogConfig();
    config.disableClose = true;
    config.autoFocus = true;
    config.minWidth = "800px";
    config.maxHeight = "500px";
    config.data = event;

    this.dialog.open(InviteVolunteersComponent, config);
  }

  public navigateToInvitations(event: IEvent) {
    this.router.navigate([event.id, 'invitations'], { relativeTo: this.route });
  }
}

