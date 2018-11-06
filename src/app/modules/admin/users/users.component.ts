import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { UserListState } from '@app/modules/admin/users/state/users';
import { select, Store } from '@ngrx/store';

import { takeUntil } from 'rxjs/operators';
import { ActionSearchUsers } from '@app/modules/admin/users/reducer/users.actions';
import { MatDialog, MatPaginator } from '@angular/material';
import { getUsers } from '@app/modules/admin/users/reducer/users.selector';
import { getUserListState, State } from '@app/modules/admin/admin.state';
import { User } from '@app/modules/admin/users/state/user';
import { AddUserComponent } from '@app/modules/admin/users/dialogs/adduser/adduser.component';
import { FilterComponent } from '@app/modules/admin/users/dialogs/filter/filter.component';
import { ResponsiveTableHeaders } from '@app/modules/admin/users/helpers.data';

@Component({
  selector: 'zerofee-app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  pageIndex = 1;
  pageSize = 20;
  users: UserListState;
  resultsLength = 0;
  displayUsers = [];
  filters = {
    username: '',
    email_filter: ''
  };

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  helpers = ResponsiveTableHeaders;
  displayedColumns: string[] = [
    'username',
    'email',
    'first_name',
    'last_name',
    'is_staff',
    'groups'
  ];
  constructor(private store: Store<State>, public dialog: MatDialog) {}

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
      this.pageSize = event.pageSize;
      this.searchUsers();
    });
  }
  private subscribeToUsers() {
    this.store
      .pipe(
        select(getUserListState),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(
        users => {
          if (users) {
            this.displayUsers = users.users;
            this.resultsLength = users.total;
          }
        },
        error1 => {}
      );
    this.searchUsers();
  }
  searchUsers(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
      this.pageSize = 20;
    }
    const payload = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      filters: this.filters
    };
    this.store.dispatch(new ActionSearchUsers(payload));
  }
  addNew(user: User) {
    const dialogRef = this.dialog.open(AddUserComponent, {
      data: { user: user }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }
  openFilters(): void {
    const dialogRef = this.dialog.open(FilterComponent, {
      width: '250px',
      hasBackdrop: true,
      data: this.filters
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (
          JSON.stringify(result).toLowerCase() !==
          JSON.stringify(this.filters).toLowerCase()
        ) {
          this.filters = result;
          this.searchUsers();
        }
      }
    });
  }
}
