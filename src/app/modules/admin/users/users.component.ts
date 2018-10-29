import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { UserListState } from '@app/modules/admin/users/state/users';
import { select, Store } from '@ngrx/store';

import { takeUntil } from 'rxjs/operators';
import { ActionSearchUsers } from '@app/modules/admin/users/reducer/users.actions';
import { MatPaginator } from '@angular/material';
import { getUsers } from '@app/modules/admin/users/reducer/users.selector';
import { getAdminState, State } from '@app/modules/admin/admin.state';

@Component({
  selector: 'zerofee-app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  pageIndex = 1;
  users: UserListState;
  isLoadingResults = true;
  resultsLength = 0;
  displayUsers = [];
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  displayedColumns: string[] = [
    'username',
    'email',
    'first_name',
    'last_name',
    'is_staff',
    'groups'
  ];
  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.subscribeToUsers();
    this.subscribeToPage();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  private subscribeToPage() {
    this.paginator.page.subscribe(event => {
      this.pageIndex = event.pageIndex + 1;
      this.searchUsers();
    });
  }
  private subscribeToUsers() {
    this.store
      .pipe(
        select(getAdminState),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(
        admin => {
          if (admin) {
            this.displayUsers = admin.users.users;
            this.resultsLength = admin.users.total;
            this.isLoadingResults = false;
          }
        },
        error1 => {
          this.isLoadingResults = false;
        }
      );
    this.searchUsers();
  }
  searchUsers(reset: boolean = false): void {
    this.isLoadingResults = true;
    if (reset) {
      this.pageIndex = 1;
    }
    const payload = {
      pageIndex: this.pageIndex
    };
    this.store.dispatch(new ActionSearchUsers(payload));
  }
}
