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
import { ApiKey } from '@app/core/app.config';
import { AppState } from '@app/core';
import { Store } from '@ngrx/store';
import { error } from 'util';
import { ActionSearchUsers } from '@app/modules/admin/users/reducer/users.actions';

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
              if (err.error.code === 'token_not_valid') {
                return this.handle401Error(request, next);
              } else {
                return this.handleCustomError(err);
              }

            default:
              return this.handleCustomError(err);
          }
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
      return (
        this.authService.refreshToken().subscribe(newToken => {
          if (newToken) {
            const newpayload = {
              pageIndex: 1
            };
            this.store.dispatch(new ActionSearchUsers(newpayload));
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
  private handleError(err: HttpErrorResponse) {
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', err.error.message);
    } else {
      // If there is an exception calling 'refreshToken', bad news so logout.
      this.authService.logout();
      console.error(
        `Backend returned code ${err.status}, ` + `body was: ${err.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  private handleCustomError(err) {
    const appErrorHandler = this.injector.get(ErrorHandler);
    appErrorHandler.handleError(err);
  }
}
