import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { jqxSchedulerComponent } from 'jqwidgets-ng/jqxscheduler';
import { IEvent } from 'src/app/models/event.model';
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

  constructor(private eventsService: EventsService ) { }
  
  ngAfterViewInit(): void {
    this.getEvents();
  }

  getEvents() {
    this.eventsService.listEvents()
      .subscribe(events => {
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
    console.log(appointment);
    // this.eventsService.createEvent(event)
    //   .subscribe(() => {
    //     Swal.fire({
    //       title: 'Success',
    //       text: 'New event created successfully',
    //       icon: 'success',
    //       showCloseButton: true
    //     });
    //   });
  }
}
