import { Injectable, ErrorHandler, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '@env/environment';

/** Application-wide error handler that adds a UI notification to the error handling
 * provided by the default Angular ErrorHandler.
 */
@Injectable()
export class AppErrorHandler extends ErrorHandler {
  constructor(private snackBar: MatSnackBar, private readonly zone: NgZone) {
    super();
  }

  handleError(error: Error | HttpErrorResponse) {
    if (error instanceof HttpErrorResponse) {
      switch ((<HttpErrorResponse>error).status) {
        case 401:
          return this.handle400Error(error);
        case 400:
          return this.handle400Error(error);
        case 403:
          return this.handle403Error(error);
        case 404:
          return this.handle404Error(error);
        case 500:
          return this.handle500Error(error);
        default:
          return this.handleCustomError(error);
      }
    } else {
      let displayMessage = 'An error occurred.';

      if (!environment.production) {
        displayMessage += ' See console for details.';
      }

      this.showNotification(displayMessage, 'Error');

      super.handleError(error);
    }
  }

  private showNotification(message: string, action?: string) {
    // Need to open snackBar from Angular zone to prevent issues with its position per
    // https://stackoverflow.com/questions/50101912/snackbar-position-wrong-when-use-errorhandler-in-angular-5-and-material
    this.zone.run(() =>
      this.snackBar.open(message, action, {
        duration: 3000,
        panelClass: 'error-notification-overlay'
      })
    );
  }
  private handle400Error(error) {
    // If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.
    this.showNotification('You Are Not Allowed Here', 'Error');
  }
  private handle403Error(error) {
    if (error && error.status === 403 && error.error) {
      this.showNotification(
        'You dont have the permisions for this secction',
        'Info'
      );
    }
  }
  private handle500Error(error) {
    if (error && error.status === 500 && error.error) {
      this.showNotification('OPPS THE SERVER CRASH', 'Error');
    }
  }
  private handle404Error(error) {
    if (error && error.status === 404 && error.error) {
      this.showNotification('NOT FOUND 404', 'Error');
    }
  }
  private handleCustomError(error) {
    this.showNotification('Conection Error', 'Error');
  }
}
