import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { IRegisterUserRequest } from 'src/app/models/register-user-request.model';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IUser } from 'src/app/models/user.model';
import { MatTableDataSource } from '@angular/material/table';
import { RegisterUserComponent } from '../register-user/register-user.component';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageKeys } from 'src/app/Utils/local-storage-keys';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSizeOptions = [5, 10];

  dataSource!: MatTableDataSource<IUser>;
  tableColumns: string[] = ['firstName', 'lastName', 'email', 'role', 'actions', 'add'];

  length = 0;
  isLoadingUsers: boolean = true;
  userRole!: string;

  constructor(public dialog: MatDialog, private usersService: UsersService,
              private authService: AuthService) {}

  public ngOnInit(): void {
    this.loadUsers();
  }

  public registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('' , [Validators.required, Validators.email]),
    role: new FormControl('', [Validators.required])
  });

  public isUserAdmin(): boolean {
    return localStorage.getItem(LocalStorageKeys.USER_ROLE) == "Admin";
  }

  public registerUser(): void {
    if (!this.registerForm.valid) {
      return;
    }
    this.usersService.registerUser(this.registerForm.value as IRegisterUserRequest)
      .subscribe({
        next: () => {
          Swal.fire({
            title: 'Success',
            text: 'New user registered successfully',
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

  public loadUsers(): void {
    let users$: Observable<Array<IUser>>;

    if (localStorage.getItem(LocalStorageKeys.USER_ROLE) === "Organiser") {
      users$ = this.usersService.listUsers("Volunteer")
    }
    else {
      users$ = this.usersService.listUsers();
    }

    users$.subscribe((users : IUser[]) => {
      this.dataSource = new MatTableDataSource<IUser>(users);
      this.dataSource.paginator = this.paginator;
      this.length = users.length;
      this.isLoadingUsers = false;
     });
  }

  public openRegisterUserForm(): void {
    const config = new MatDialogConfig();
    config.disableClose = true;
    config.autoFocus = true;
    config.minWidth = "800px";
    config.maxHeight = "500px";

    var ref = this.dialog.open(RegisterUserComponent, config);
    ref.afterClosed().subscribe(() => this.loadUsers());
  }

  onDelete(user:any) {
    console.log(user);
  }

  onUpdate(user:any) {
    console.log(user);
  }
}
