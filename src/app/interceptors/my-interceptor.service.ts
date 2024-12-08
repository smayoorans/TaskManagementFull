import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {

    const token = localStorage.getItem("Token");
    const modifiedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next.handle(modifiedReq).pipe(catchError((error) => {
       if(error.status == 403) {
          this.toastr.error("You are not allowed to view this data");
       }
       if(error.status == 500) {
        this.toastr.error("Internal Server error occurred, try again later.");
       }
       if(error.status == 401) {
        this.router.navigate(['/login']);
        localStorage.clear();
       }
       return throwError(() => error);
    }));
  }
}
