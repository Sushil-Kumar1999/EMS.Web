import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userName: string | null;
  // Role of the User
  userRole!: string;

  menu_options: MenuOption[] = [];
  selected?: number = -1;

  constructor(private authService: AuthService, private router: Router) { 
    this.userName = localStorage.getItem('loginEmail');
    this.userRole = this.authService.getLoggedInUserRole();
  }   

  ngOnInit(): void {
    this.menu_options.push(
      {id: 0, url: '/dashboard', icon: 'dashboard', label: 'Dashboard', selected: false},
      {id: 1, url: '/calendar', icon: 'calendar_month', label: 'Calendar', selected: false},
      {id: 3, url: '/events', icon: 'event', label: 'Events', selected: false},
    );

    if (this.userRole !== 'Volunteer') {
      this.menu_options.push( {id: 2, url: '/users', icon: 'supervisor_account', label: 'Users', selected: false},)
    }

    let option = this.menu_options.find(m => this.router.url.includes(m.url as string)) as MenuOption;
    option.selected = true;
  }

  logout(){
    this.authService.logout();
  }

  onSelect(id: number){
    this.menu_options.forEach(option =>{
      option.selected = false;
    });
    this.menu_options.forEach(option =>{
      if(option.id === id){
        option.selected = true;
        this.selected = id;
      } else {
        option.selected = false;
      }
    });
  }
}

export interface MenuOption {
  id: number,
  icon: string,
  label: string,
  url?: string
  selected: boolean
}
