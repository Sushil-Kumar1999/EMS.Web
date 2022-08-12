import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILoginResponse } from 'src/app/models/login-response.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loadingLogin = false;
  logo = './assets/images/LoginIcon.png';
  public receivedMessages: string[] = [];
  errorLogin = false;
  currentRequest:any;
  hide = true;
  
  loginForm = new FormGroup({
    email: new FormControl({ disabled: this.loadingLogin, value: '' }, [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl({ disabled: this.loadingLogin, value: '' }, [
      Validators.required,
      Validators.minLength(4)
    ])
  });

  constructor(private authService: AuthService, private router: Router) { }

  public login() : void {
    if (this.loginForm.valid) {
      this.loadingLogin = true;
      this.loginForm.disable();

      this.authService.login(this.loginForm.getRawValue().email as string, this.loginForm.getRawValue().password as string)
        .subscribe({
          next: (loginResponse: ILoginResponse) => {
            this.currentRequest = loginResponse;
            this.authService.saveToken(this.loginForm.getRawValue().email as string, loginResponse.token);
            this.authService.setLoggedInUserRole();
            this.loadingLogin = false;
            this.router.navigate(['/dashboard']);
          },
          error: error => {
            console.log(error);
            this.loadingLogin = false;
            this.loginForm.enable();
            this.errorLogin = true;
            setTimeout(() => {
              this.errorLogin = false;
            }, 5000);
          }
        });
    }
  }
}
