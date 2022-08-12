import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { IRegisterUserRequest } from 'src/app/models/register-user-request.model';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';
import { tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { IUser } from 'src/app/models/user.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSizeOptions = [5, 10];

  dataSource!: MatTableDataSource<IUser>;
  tableColumns: string[] = ['firstName', 'lastName', 'email', 'role', 'actions', 'add'];

  length = 0;
  dataLoaded: boolean = false;
  isLoadingUsers: boolean = false;

  constructor(public dialog: MatDialog, private usersService: UsersService) {}

  ngOnInit(): void {
    this.loadUsers();
    
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('' , [Validators.required, Validators.email]),
    role: new FormControl('', [Validators.required])
  });

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

  loadUsers() {
    this.usersService.listUsers().subscribe((users : IUser[]) => {
      this.dataSource = new MatTableDataSource<IUser>(users);
      this.dataSource.paginator = this.paginator;
      this.length = users.length;
      this.dataLoaded = true;
     });
  }

  onAdd() {
    console.log("add");
  }

  onDelete(user:any) {
    console.log(user);
  }

  onUpdate(user:any) {
    console.log(user);
  }
}
