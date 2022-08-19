import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  loggedInUserRole!: string;
  user!: IUser;
  display: boolean = false;

  constructor(private authService: AuthService, private usersService: UsersService) {  }

  ngOnInit(): void {
    this.loggedInUserRole = this.authService.getLoggedInUserRole();

    if (!this.isLoggedInUserVolunteer()) {
      let userId: string = this.authService.getLoggedInUserId();
      this.usersService.getUser(userId)
        .subscribe(u => {
          this.user = u;
          this.display = true;
        });
    }
  }

  public isLoggedInUserVolunteer(): boolean {
    return this.loggedInUserRole == 'Volunteer';
  }
}
