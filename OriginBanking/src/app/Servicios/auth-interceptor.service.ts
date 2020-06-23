import { Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { HttpHandler, HttpRequest, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {
  constructor(private accountService: AccountService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    var token = this.accountService.GetToken(); 
    req = req.clone({
      setHeaders: { Authorization: "bearer " + token }
    });
    return next.handle(req);
  }
}
