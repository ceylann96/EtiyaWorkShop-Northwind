import { Injectable } from '@angular/core';
import {HttpRequest,HttpHandler,HttpEvent,HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttprequestInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let date= new Date()
    console.log(`http request send ${date}`);
    
    return next.handle(request);
  }
}
