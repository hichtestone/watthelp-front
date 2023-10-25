import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class GetRequestInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method !== 'GET') {
      return next.handle(req);
    }

    let cleanedParams = new HttpParams();
    cleanedParams = this.objectToParams(req.params, cleanedParams);

    const getReq = req.clone({params: cleanedParams});
    return next.handle(getReq);
  }

  /**
   * Converts an object to a parametrised
   */
  private objectToParams(object: HttpParams, searchParams): HttpParams {
    object.keys().forEach((key) => {
      const item = object.get(key);
      if (this.isJsObject(item)) {
        searchParams = this.subObjectToParams(key, item, searchParams);
      } else {
        if (!!item) {
          searchParams = searchParams.set(key, item);
        }
      }
    });

    return searchParams;
  }

  /**
   * Converts a sub-object to a parametrised.
   */
  private subObjectToParams(key, object, searchParams): HttpParams {
    Object.keys(object).map((childKey) => {
      if (this.isJsObject(object[childKey])) {
        searchParams = this.subObjectToParams(`${key}[${childKey}]`, object[childKey], searchParams);
      } else {
        if (object[childKey] !== null && object[childKey] !== '' && typeof object[childKey] !== 'undefined') {
          searchParams = searchParams.set(`${key}[${childKey}]`, `${object[childKey]}`);
        }
      }
    });

    return searchParams;
  }

  private isJsObject(o): boolean {
    return o !== null && (typeof o === 'function' || typeof o === 'object');
  }
}
