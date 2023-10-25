import {BehaviorSubject, Observable, of, throwError as observableThrowError} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';
import {catchError, filter, switchMap, take} from 'rxjs/operators';
import {SnackbarService} from '../service/snackbar.service';
import {AuthenticationService} from '../service/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private refreshTokenInProgress = false;

  // Refresh Token Subject tracks the current token, or is null if no token is currently
  // available (e.g. refresh pending).
  private refreshTokenSubject = new BehaviorSubject<any>(
    null
  );

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private snackBarService: SnackbarService,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {
      switch (err.status) {
        case 400:
          return observableThrowError(err.error.messages);
        case 403:
          return this.router.navigate(['/error-403']);
        case 401:
          return this.handleRefreshToken(req, next, err);
        default:
          this.snackBarService.addMessage('Oups an error occurred');
          break;
      }
    }));
  }

  private handleRefreshToken(req: HttpRequest<any>, next: HttpHandler, err: HttpErrorResponse): Observable<any> {
    // We don't want to refresh token for some requests like login or refresh token itself
    // So we verify url and we throw an error if it's the case
    if (
      req.url.includes('token/refresh') ||
      req.url.includes('login')
    ) {
      // We do another check to see if refresh token failed
      // In this case we want to logout user and to redirect it to login page
      if (req.url.includes('token/refresh')) {
        this.authenticationService.logout();
      }

      return of(err);
    }

    // If error status is different than 401 we want to skip refresh token
    // So we check that and throw the error if it's the case
    if (err.status !== 401) {
      return of(err);
    }

    if (this.refreshTokenInProgress) {
      // If refreshTokenInProgress is true, we will wait until refreshTokenSubject has a non-null value
      // – which means the new token is ready and we can retry the request again
      return this.refreshTokenSubject.pipe(
        filter(result => result !== null),
        take(1),
        switchMap(() => next.handle(this.addAuthenticationToken(req)))
      );
    } else {
      this.refreshTokenInProgress = true;

      // Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
      this.refreshTokenSubject.next(null);

      // Call auth.refreshAccessToken(this is an Observable that will be returned)
      return this.authenticationService
        .refreshToken()
        .pipe(
          switchMap((token: { refresh_token: string, token: string }) => {
            // When the call to refreshToken completes we reset the refreshTokenInProgress to false
            // for the next time the token needs to be refreshed
            this.refreshTokenInProgress = false;
            this.authenticationService.refreshStorage(token.token, token.refresh_token);
            this.refreshTokenSubject.next(token);

            return next.handle(this.addAuthenticationToken(req));
          }),
          catchError((error: any) => {
            this.refreshTokenInProgress = false;

            this.authenticationService.logout();
            return of(error);
          })
        );
    }
  }

  private addAuthenticationToken(request): any {
    // Get access token from Local Storage
    const token = localStorage.getItem('token');

    // If access token is null this means that user is not logged in
    // And we return the original request
    if (!token) {
      return request;
    }

    // We clone the request, because the original request is immutable
    return request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + token)
    });
  }
}
