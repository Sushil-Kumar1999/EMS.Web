import { Component, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IEvent } from 'src/app/models/event.model';
import { IFindVolunteersCriteria, IUser } from 'src/app/models/user.model';
import { EventsService } from 'src/app/services/events.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-invite-volunteers',
  templateUrl: './invite-volunteers.component.html',
  styleUrls: ['./invite-volunteers.component.scss']
})
export class InviteVolunteersComponent {

  showForm: boolean = true;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  length = 0;
  dataSource!: MatTableDataSource<IUser>;
  tableColumns: string[] = ['firstName', 'lastName', 'email'];

  constructor(@Inject(MAT_DIALOG_DATA) public selectedEvent: IEvent,
              private dialogRef: MatDialogRef<InviteVolunteersComponent>,
              private usersService: UsersService,
              private eventsService: EventsService) { }
  
  criteriaForm = new FormGroup({
    minAge: new FormControl(1, [Validators.required]),
    maxAge: new FormControl(1, [Validators.required]),
    minHeight: new FormControl(1 , [Validators.required]),
    maxHeight: new FormControl(1, [Validators.required]),
    minWeight: new FormControl(1, [Validators.required]),
    maxWeight: new FormControl(1, [Validators.required])
  });

  public findVolunteers(): void {
    const criteria = this.criteriaForm.getRawValue() as IFindVolunteersCriteria;

    this.usersService.findVolunteers(criteria)
      .subscribe((volunteers : Array<IUser>) => {
        this.dataSource = new MatTableDataSource<IUser>(volunteers);
        this.dataSource.paginator = this.paginator;
        this.length = volunteers.length;
        this.showForm = false;
      });
  }

  public sendInvitation(): void {
    console.log(this.selectedEvent);
    let volunteerEmails: Array<string> = this.dataSource.data.map(v => v.email);
    this.eventsService.sendInvitation(this.selectedEvent.id, volunteerEmails)
      .subscribe({
        next: () => {
          this.dialogRef.close();
          Swal.fire({
            title: 'Success',
            text: 'Invitation emails sent successfully',
            icon: 'success',
            showCloseButton: true
          });
        },
        error: error => {
          Swal.fire({
            title: 'Error',
            text: error.message,
            icon: 'error',
            showCloseButton: true
          });
        }
      });
  }
}
