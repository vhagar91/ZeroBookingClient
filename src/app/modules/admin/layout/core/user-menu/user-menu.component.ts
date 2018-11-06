import {
  Component,
  OnInit,
  Input,
  HostListener,
  ElementRef
} from '@angular/core';
import { AppConfig } from '@app/core/app.config';
import { Router } from '@angular/router';
import { User } from '@app/model/user';
import { ActionAuthLogout, AppState } from '@app/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'cdk-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  isOpen = false;

  @Input()
  currentUser: User = null;
  @HostListener('document:click', ['$event', '$event.target'])
  onClick(event: MouseEvent, targetElement: HTMLElement) {
    if (!targetElement) {
      return;
    }

    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.isOpen = false;
    }
  }

  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private store: Store<AppState>
  ) {}

  editProfile(): void {
    this.router.navigate([
      AppConfig.routes.admin +
        '/' +
        AppConfig.routes.profile +
        '/' +
        this.currentUser.id
    ]);
  }
  onLogoutClick() {
    this.store.dispatch(new ActionAuthLogout());
  }
  ngOnInit() {}
}
