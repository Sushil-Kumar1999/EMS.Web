import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IEvent } from 'src/app/models/event.model';
import { EventsService } from 'src/app/services/events.service';
import { CreateEventComponent } from '../create-event/create-event.component';

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

  public invite(event: IEvent) {
    console.log(event);
  }
}

