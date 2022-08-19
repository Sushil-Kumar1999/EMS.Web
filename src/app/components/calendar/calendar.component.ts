import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { jqxSchedulerComponent } from 'jqwidgets-ng/jqxscheduler';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { ICreateEventRequest, IEvent } from 'src/app/models/event.model';
import { AuthService } from 'src/app/services/auth.service';
import { EventsService } from 'src/app/services/events.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html'
})
export class CalendarComponent implements AfterViewInit {

  @ViewChild('schedulerReference', { static: false }) scheduler!: jqxSchedulerComponent;
  views: string[] = [ "dayView", "weekView", "monthView"];
  source: any =
  {
    dataType: 'array',
    dataFields: [
      { name: 'id', type: 'number' },
      { name: 'description', type: 'string' },
      { name: 'location', type: 'string' },
      { name: 'title', type: 'string' },
      { name: 'startDate', type: 'date' },
      { name: 'endDate', type: 'date' }
    ],
    id: 'id',
    localData: null
  };

  dataAdapter: any = new jqx.dataAdapter(this.source);
  appointmentDataFields: jqwidgets.SchedulerAppointmentDataFields =
  {
      from: "startDate",
      to: "endDate",
      id: "id",
      description: "description",
      location: "location",
      subject: "title"
  };

  constructor(private eventsService: EventsService, private authService: AuthService ) { }
  
  ngAfterViewInit(): void {
    this.getEvents();
  }

  getEvents(): void {
    let events$: Observable<Array<IEvent>>;

    if (this.authService.getLoggedInUserRole() == 'Volunteer') {
      let volunteerId: string = this.authService.getLoggedInUserId();
      events$ = this.eventsService.findEventsConfirmedFor(volunteerId);
    }
    else {
      events$ = this.eventsService.listEvents();
    }
    
    events$.subscribe(events => {
        this.scheduler.beginAppointmentsUpdate();
        this.source.localData = events;
        this.dataAdapter = new jqx.dataAdapter(this.source);
        this.scheduler.endAppointmentsUpdate();      
      });
  }

  editDialogCreate(dialog?: jqwidgets.SchedulerEditDialogCreate['dialog'],
                  fields?: jqwidgets.SchedulerEditDialogCreate['fields'],
                  editAppointment?: jqwidgets.SchedulerEditDialogCreate['editAppointment']) {
    fields?.repeatContainer.hide();
    fields?.statusContainer.hide();
    fields?.timeZoneContainer.hide();
    fields?.colorContainer.hide();
    fields?.subjectLabel.html("Title");
    fields?.locationLabel.html("Location");
    fields?.fromLabel.html("Start Date");
    fields?.toLabel.html("End Date");
  };

  createNewEvent(event: any): void{
    let appointment = event.args.appointment.originalData;
   
    const newEvent: ICreateEventRequest = {
      title: appointment.title,
      description :appointment.description,
      location: appointment.location,
      startDate: appointment.startDate,
      endDate: appointment.endDate
    };

    this.eventsService.createEvent(newEvent)
      .subscribe(() => {
        Swal.fire({
          title: 'Success',
          text: 'New event created successfully',
          icon: 'success',
          showCloseButton: true
        });
      });
  }
}
