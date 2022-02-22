import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

/** Inject With Credentials into the request */
@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

    /**
     * HTTP interceptor that sets Angular to include cookies with each outgoing request.   
     * By defualt Angular does not allow that due to CORS and security settings
     * @param req 
     * @param next 
     * @returns 
     */
    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {

        req = req.clone({
            withCredentials: true
        });

        return next.handle(req);
    }
}