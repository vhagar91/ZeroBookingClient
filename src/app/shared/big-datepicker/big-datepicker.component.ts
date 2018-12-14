import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'zerofee-app-big-datepicker',
  templateUrl: './big-datepicker.component.html',
  styleUrls: ['./big-datepicker.component.scss']
})
export class BigDatepickerComponent implements OnInit {
  @Input()
  placeholder: string;

  @Input()
  value = '';
  @Input()
  disabled = false;

  hasFocus = false;
  constructor() {}

  ngOnInit() {}
}
