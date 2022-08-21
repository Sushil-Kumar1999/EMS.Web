import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ICreateEventRequest } from 'src/app/models/event.model';
import { EventsService } from 'src/app/services/events.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ],
})
export class CreateEventComponent {

  showProgressBar: boolean = false;

  constructor(private eventsService: EventsService) { }

  createEventForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    startDate: new FormControl(new Date(), [Validators.required]),
    endDate: new FormControl(new Date() , [Validators.required]),
  });

  public createEvent(): void {
    this.showProgressBar = true;
    this.eventsService.createEvent(this.createEventForm.value as ICreateEventRequest)
      .subscribe({
        next: () => {
          Swal.fire({
            title: 'Success',
            text: 'New event created successfully',
            icon: 'success',
            showCloseButton: true
          });
          this.showProgressBar = false;
        },
        error: error => {
          Swal.fire({
            title: 'Error',
            text: error.message,
            icon: 'error',
            showCloseButton: true
          });
          this.showProgressBar = false;
        }
      });
  }
}
