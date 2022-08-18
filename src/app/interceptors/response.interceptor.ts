import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ValidationErrorsResponse } from '../models/validation-response.model';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        // if(event instanceof HttpResponse){
        //   console.log(event)
        // }
        return event;
      }), catchError((error:HttpErrorResponse) => { 

        switch(error.status){
          case 0: {
            Swal.fire({
              title: 'Error',
              text: error.message,
              icon: 'error',
              showCloseButton: true
            })
            break;
          }
          case 400: {
            const response: ValidationErrorsResponse = error.error;
            Swal.fire({
              title: 'Invalid data',
              html: `${response.errors.map(e => `<p>${e.message}</p>`).join('')}`,
              icon: 'warning',
              showCloseButton: true
            })
            break;
          }
          case 401: {
            Swal.fire({
              title: 'Session expired',
              text: error.error.message,
              icon: 'error',
              showCloseButton: true
            }).then(response => {
              if(response.value){
                this.router.navigate(['/login']);
              }
            })
            break;
          }
          case 403: {
            Swal.fire({
              title: 'Forbidden',
              text: error.error.message,
              icon: 'error',
              showCloseButton: true
            });
            break;
          }
          default: {
            Swal.fire({
              title: 'Error',
              text: error.error.message,
              icon: 'error',
              showCloseButton: true
            });
            break;
          }
        }
        return throwError(() => error);
      })
    );
  }
}
