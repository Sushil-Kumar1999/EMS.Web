import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IEvent } from 'src/app/models/event.model';
import { EventsService } from 'src/app/services/events.service';
import { RegisterUserComponent } from '../register-user/register-user.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSizeOptions = [5, 10];

  dataSource!: MatTableDataSource<IEvent>;
  tableColumns: string[] = ['name', 'startDate', 'endDate', 'actions', 'add'];

  length = 0;
  isLoadingEvents: boolean = true;
  
  constructor(private eventsService: EventsService, public dialog: MatDialog) { }

  public ngOnInit(): void {
    this.loadEvents();
  }

  public onCreateNewEvent() : void{
    const config = new MatDialogConfig();
    config.disableClose = true;
    config.autoFocus = true;
    config.width = "500px";

    this.dialog.open(RegisterUserComponent, config);
  }
  
  public loadEvents() : void {
    this.eventsService.listEvents().subscribe((events : Array<IEvent>) => {
      this.dataSource = new MatTableDataSource<IEvent>(events);
      this.dataSource.paginator = this.paginator;
      this.length = events.length;
      this.isLoadingEvents = false;
     });
  }

  onDelete(event: IEvent) {
    console.log(event);
  }

  onUpdate(event: IEvent) {
    console.log(event);
  }

}
