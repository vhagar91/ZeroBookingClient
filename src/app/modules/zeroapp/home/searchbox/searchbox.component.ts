import { Component, OnInit } from '@angular/core';
import { State, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '@app/core/notifications/notification.service';

@Component({
  selector: 'zerofee-app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.scss']
})
export class SearchboxComponent implements OnInit {
  fromDate = '';
  searchLocation = '';
  guests = '';
  constructor(
    public translateService: TranslateService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {}

  // onSearchListing() {
  //   this.store.dispatch(new ActionTodosAdd({ name: this.newTodo }));
  //   const addedMessage = this.translateService.instant(
  //     'anms.examples.todos.added.notification',
  //     { name: this.newTodo }
  //   );
  //   this.notificationService.success(addedMessage);
  //   this.newTodo = '';
  // }
  onDateChange(date: string) {
    this.fromDate = date;
  }
  onLocationChange(location: string) {
    this.searchLocation = location;
  }
  onGuestsChange(guests: string) {
    this.guests = guests;
  }
}
