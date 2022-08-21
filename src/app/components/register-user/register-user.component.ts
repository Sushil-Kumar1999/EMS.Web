import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { ICreateVolunteerRequest, IRegisterUserRequest } from 'src/app/models/register-user-request.model';
import { UsersService } from 'src/app/services/users.service';
import { VolunteersService } from 'src/app/services/volunteers.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-users',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent {

  showProgressBar = false;
  volunteerRoleSelected: boolean = false;

  constructor(private usersService: UsersService, private volunteersService: VolunteersService) { }

  registerForm = new FormGroup({
    role: new FormControl('Admin', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('' , [Validators.required, Validators.email]),
    height: new FormControl(1),
    weight: new FormControl(1),
    dateOfBirth: new FormControl(null)
  });

  public registerUser(): void {
    this.showProgressBar = true;
    let createUser$: Observable<any>;
    
    if (this.volunteerRoleSelected) {
      createUser$ = this.volunteersService.createVolunteer(this.registerForm.value as unknown as ICreateVolunteerRequest)
    } else {
      createUser$ = this.usersService.registerUser(this.registerForm.value as IRegisterUserRequest)
    }

    this.registerForm.reset();
    createUser$.subscribe(() => {
      Swal.fire({
        title: 'Success',
        text: 'New user registered successfully',
        icon: 'success',
        showCloseButton: true
      });
      this.showProgressBar = false;
    });
  }

  public onSelectionChange(roleSelected: string) {
    if (roleSelected === "Volunteer") {
      this.volunteerRoleSelected = true;
    }
    else {
      this.volunteerRoleSelected = false;
    }
  }
}
