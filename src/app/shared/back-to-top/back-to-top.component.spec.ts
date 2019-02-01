import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackToTopComponent } from './back-to-top.component';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { By } from '@angular/platform-browser';

describe('BackToTopComponent', () => {
  let component: BackToTopComponent;
  let fixture: ComponentFixture<BackToTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BackToTopComponent],
      imports: [MatButtonModule, MatIconModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackToTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call scrollToTop on button click', () => {
    spyOn(component, 'scrollToTop');
    fixture.debugElement
      .query(By.css('button'))
      .triggerEventHandler('click', {});
    expect(component.scrollToTop).toHaveBeenCalled();
  });
});
