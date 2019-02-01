import {
  ChangeDetectorRef,
  Component,
  HostListener,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { systemAnimations } from '@app/core/animations';

@Component({
  selector: 'zerofee-app-back-to-top',
  templateUrl: './back-to-top.component.html',
  styleUrls: ['./back-to-top.component.scss'],
  animations: systemAnimations
})
export class BackToTopComponent implements OnInit {
  @Input()
  scroll?: any;

  animationState = 'out';
  scrollDistance = 200;

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
    this.subscribeToScroll();
  }
  private subscribeToScroll() {
    this.scroll.psScrollDown.subscribe(next => this.onWindowScroll());
    this.scroll.psScrollUp.subscribe(next => this.onWindowScroll());
  }
  public scrollToTop(): void {
    if (this.scroll && this.scroll.directiveRef) {
      this.scroll.directiveRef.scrollToTop(0, 110);
    }
  }
  private onWindowScroll() {
    const scroll = this.scroll.directiveRef.elementRef.nativeElement.scrollTop;
    if (this.isBrowser()) {
      this.animationState = scroll > this.scrollDistance ? 'in' : 'out';
      this.changeDetector.detectChanges();
    }
  }

  /**
   * This check will prevent 'window' logic to be executed
   * while executing the server rendering
   */
  private isBrowser() {
    return typeof window !== 'undefined';
  }
}
