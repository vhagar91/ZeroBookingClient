import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../core/core.state';
import { map } from 'rxjs/operators';
import { selectAuth } from '../../core/auth/auth.selectors';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.pipe(
      select(selectAuth),
      map(auth => {
        if (auth.isAuthenticated) {
          return true;
        } else {
          this.router.navigate(['login'], {
            queryParams: {
              returnUrl: state.url
            }
          });

          return false;
        }
      })
    );
  }
}
