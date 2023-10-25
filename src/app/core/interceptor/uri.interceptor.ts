import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable()
export class UriInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.indexOf('assets') < 0) {
      const headers = req.headers;
      headers.set('Content-Type', 'application/json');

      const uriReq = req.clone({
        headers,
        url: environment.api_uri + req.url
      });
      return next.handle(uriReq);
    }

    return next.handle(req);
  }
}
