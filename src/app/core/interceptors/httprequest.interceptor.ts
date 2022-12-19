import { Injectable } from '@angular/core';
import {HttpRequest,HttpHandler,HttpEvent,HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttprequestInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let date= new Date()
    console.log(`http request sent ${date}`);
    
    const requestToSend = request.clone({
      headers: request.headers.set("Authorization", `EXAMPLE-JWT`)
    
  })
  console.log(requestToSend);
  return next.handle(requestToSend);
  
}
}