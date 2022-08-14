import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IRegisterUserRequest } from 'src/app/models/register-user-request.model';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent {

  showProgressBar = false;

  constructor(private usersService: UsersService) { }

  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('' , [Validators.required, Validators.email]),
    role: new FormControl('', [Validators.required])
  });

  public registerUser(): void {
    // if (!this.registerForm.valid) {
    //   return;
    // }
    this.showProgressBar = true;
    this.usersService.registerUser(this.registerForm.value as IRegisterUserRequest)
      .subscribe({
        next: () => {
          Swal.fire({
            title: 'Success',
            text: 'New user registered successfully',
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

  exitDialog() {
    
  }

}
