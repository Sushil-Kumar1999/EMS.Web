import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserNotVolunteerGuard implements CanActivate {

  constructor(public authService: AuthService, public router: Router) {}

  canActivate()  {
    if ( this.authService.getLoggedInUserRole() !== "Volunteer") {
      return true;
    } else {
      this.router.navigate(['dashboard']);
      return false;
    }
  }
}
