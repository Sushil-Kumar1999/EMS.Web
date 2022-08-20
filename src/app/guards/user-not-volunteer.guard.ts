import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LocalStorageKeys } from '../Utils/local-storage-keys';

@Injectable({
  providedIn: 'root'
})
export class UserNotVolunteerGuard implements CanActivate {

  constructor(public authService: AuthService, public router: Router) {}

  canActivate()  {
    if (localStorage.getItem(LocalStorageKeys.USER_ROLE) !== "Volunteer") {
      return true;
    } else {
      this.router.navigate(['dashboard']);
      return false;
    }
  }
}
