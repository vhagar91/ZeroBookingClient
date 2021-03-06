import { Component, OnInit, Input } from '@angular/core';
import { User } from '@app/model/user';

@Component({
  selector: 'cdk-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input()
  sidenav;
  @Input()
  sidebar;
  @Input()
  drawer;
  @Input()
  matDrawerShow;
  @Input()
  currentUser: User = null;

  constructor() {}

  ngOnInit() {}
}
