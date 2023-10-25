import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class PostRequestInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method !== 'POST') {
      return next.handle(req);
    }

    const body = req.body;
    const isFormData = body instanceof FormData;
    if (!isFormData) {
      // Delete null value
      for (const field in body) {
        if (body.hasOwnProperty(field)) {
          if (body[field] === null || body[field] === '') {
            delete body[field];
          } else if (typeof body[field] === 'object') {
            this.cleanChildren(body[field]);
          }
        }
      }
    }

    const postReq = req.clone({body});
    return next.handle(postReq);
  }

  /**
   * Clean children
   */
  cleanChildren(body): void {
    // Delete null value
    for (const field in body) {
      if (body.hasOwnProperty(field)) {
        if (body[field] === null || body[field] === '') {
          delete body[field];
        } else if (typeof body[field] === 'object') {
          this.cleanChildren(body[field]);
        }
      }
    }
  }
}
