import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IEvent } from 'src/app/models/event.model';
import { EventsService } from 'src/app/services/events.service';
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
  tableColumns: string[] = ['title', 'startDate', 'endDate', 'actions'];

  length = 0;
  isLoadingEvents: boolean = true;
  
  constructor(private eventsService: EventsService, public dialog: MatDialog) { }

  public ngOnInit(): void {
    this.loadEvents();
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
}

