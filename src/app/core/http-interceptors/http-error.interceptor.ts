import { Injectable, Injector, ErrorHandler } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpResponse,
  HttpUserEvent
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import {
  catchError,
  filter,
  finalize,
  map,
  switchMap,
  take,
  tap
} from 'rxjs/operators';
import { AuthService } from '@app/core/auth/auth.service';
import { ApiKey } from '@app/core/urls';
import { AppState } from '@app/core';
import { Store } from '@ngrx/store';

/** Passes HttpErrorResponse to application-wide error handler */
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  isRefreshingToken = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  constructor(
    private injector: Injector,
    private store: Store<AppState>,
    private authService: AuthService
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = this.addTokenToRequest(request, this.authService.getToken());
    return next.handle(request).pipe(
      tap(null, (err: HttpErrorResponse) => {
        if (err instanceof HttpErrorResponse) {
          switch ((<HttpErrorResponse>err).status) {
            case 401:
              return this.handle401Error(request, next);
            case 400:
              return this.handle400Error(err);
            default:
              return this.handleCustomError(err);
          }
        } else {
          const appErrorHandler = this.injector.get(ErrorHandler);
          appErrorHandler.handleError(err);
        }
      })
    );
  }

  private addTokenToRequest(
    request: HttpRequest<any>,
    token: string
  ): HttpRequest<any> {
    const newRequest = request.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
    return newRequest.clone({ setParams: { apikey: ApiKey } });
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;

      // Reset here so that the following requests wait until the token
      // comes back from the refreshToken call.
      this.tokenSubject.next(null);
      return this.authService.refreshToken().pipe(
        map((newToken: string) => {
          if (newToken) {
            this.tokenSubject.next(newToken);
            return next.handle(this.addTokenToRequest(req, newToken));
          }
          // If we don't get a new token, we are in trouble so logout.
          return this.authService.logout();
        }),
        catchError(this.handleError),
        finalize(() => {
          this.isRefreshingToken = false;
        })
      );
    } else {
      return this.tokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(token => {
          return next.handle(this.addTokenToRequest(req, token));
        })
      );
    }
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // If there is an exception calling 'refreshToken', bad news so logout.
      this.authService.logout();
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
  private handle400Error(error) {
    // If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.
    const appErrorHandler = this.injector.get(ErrorHandler);
    appErrorHandler.handleError(error);
    return this.authService.logout();
  }

  private handleCustomError(error) {
    const appErrorHandler = this.injector.get(ErrorHandler);
    appErrorHandler.handleError(error);
  }
}
