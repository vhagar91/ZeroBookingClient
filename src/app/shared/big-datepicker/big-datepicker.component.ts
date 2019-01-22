import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material';
import { formatDate } from '@angular/common';

@Component({
  selector: 'zerofee-app-big-datepicker',
  templateUrl: './big-datepicker.component.html',
  styleUrls: ['./big-datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BigDatepickerComponent implements OnInit {
  @Input()
  placeholder: string;
  @Input()
  value = '';
  @Input()
  disabled = false;

  hasFocus = false;
  @Output()
  notifyValue = new EventEmitter<string>();
  constructor() {}

  ngOnInit() {}

  notifyParent(event: MatDatepickerInputEvent<Date>) {
    const value = formatDate(new Date(event.value), 'MM/dd/yyyy', 'en');
    this.value = value;
    this.notifyValue.emit(value);
  }
}
