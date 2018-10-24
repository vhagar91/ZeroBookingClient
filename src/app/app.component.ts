import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { TitleService } from '@app/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'zerofee-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private titleService: TitleService, private router: Router) {}
  private unsubscribe$: Subject<void> = new Subject<void>();
  ngOnInit() {
    this.subscribeToRouterEvents();
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  private subscribeToRouterEvents() {
    this.router.events.pipe(takeUntil(this.unsubscribe$)).subscribe(event => {
      if (event instanceof ActivationEnd) {
        this.titleService.setTitle(event.snapshot);
      }
    });
  }
}
