import {
  Component,
  HostListener,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { fuseAnimations } from '@app/core/animations';

@Component({
  selector: 'zerofee-app-back-to-top',
  templateUrl: './back-to-top.component.html',
  styleUrls: ['./back-to-top.component.scss']
})
export class BackToTopComponent implements OnInit {
  @Input()
  scroll?: PerfectScrollbarComponent;

  constructor() {}

  ngOnInit() {
    // this.scroll.psScrollDown.subscribe(next => this.onWindowScroll())
  }
  public scrollToTop(): void {
    if (this.scroll && this.scroll.directiveRef) {
      this.scroll.directiveRef.scrollToTop(0, 110);
    }
  }
}
