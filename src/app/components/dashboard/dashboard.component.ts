import { Component, OnInit } from '@angular/core';
import { IUser, IVolunteer } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { VolunteersService } from 'src/app/services/volunteers.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  loggedInUserRole!: string;
  user!: IUser;
  volunteer!: IVolunteer;
  display: boolean = false;

  constructor(private authService: AuthService,
              private usersService: UsersService,
              private volunteersService: VolunteersService) {  }

  ngOnInit(): void {
    this.loggedInUserRole = this.authService.getLoggedInUserRole();
    let userId: string = this.authService.getLoggedInUserId();

    if (!this.isLoggedInUserVolunteer()) {
      this.usersService.getUser(userId)
        .subscribe((u: IUser) => {
          this.user = u;
          this.display = true;
        });
    }
    else {
      this.volunteersService.getVolunteer(userId)
      .subscribe((v : IVolunteer) => {
          this.volunteer = v;
          this.display = true;
      });
    }
  }

  public isLoggedInUserVolunteer(): boolean {
    return this.loggedInUserRole == 'Volunteer';
  }
}
