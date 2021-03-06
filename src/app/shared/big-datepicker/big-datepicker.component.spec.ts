import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../index';
import { Component, DebugElement } from '@angular/core';

@Component({
  selector: 'host-for-test',
  template: `
  <zerofee-app-big-datepicker placeholder="I am going to do..."
  [value]="newValue"
  (keyup)="onKeyEvent($event)"
  (keyup.enter)="onKeyEvent($event)"
  (keyup.escape)="onKeyEvent($event)">
</zerofee-app-big-datepicker>
`
})
class HostComponent {
  newValue: string;
  onKeyEvent(eventData: any) {}
}

describe('BigIDatePickerComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let component: HostComponent;
  let bigInputDebugElement: DebugElement;
  let inputNativeElement: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostComponent],
      imports: [SharedModule]
    });
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    spyOn(component, 'onKeyEvent');
    bigInputDebugElement = fixture.debugElement.childNodes[0] as DebugElement;
    inputNativeElement = fixture.nativeElement.querySelector('input');
  });

  it('should have expected placeholder', () => {
    expect(bigInputDebugElement.attributes['placeholder']).toContain(
      'going to do'
    );
  });

  it('should respond to keyup event', () => {
    const expectedEventData = 'Key UP';
    bigInputDebugElement.triggerEventHandler('keyup', expectedEventData);

    expect(component.onKeyEvent).toHaveBeenCalledTimes(1);
    expect(component.onKeyEvent).toHaveBeenCalledWith(expectedEventData);
  });

  it('should respond to keyup.enter event', () => {
    const expectedEventData = 'Enter UP';
    bigInputDebugElement.triggerEventHandler('keyup.enter', expectedEventData);

    expect(component.onKeyEvent).toHaveBeenCalledTimes(1);
    expect(component.onKeyEvent).toHaveBeenCalledWith(expectedEventData);
  });

  it('should respond to escape event', () => {
    const expectedEventData = 'Escape UP';
    bigInputDebugElement.triggerEventHandler('keyup.escape', expectedEventData);

    expect(component.onKeyEvent).toHaveBeenCalledTimes(1);
    expect(component.onKeyEvent).toHaveBeenCalledWith(expectedEventData);
  });

  it('should respond to focus and blur', () => {
    expect(bigInputDebugElement.componentInstance.hasFocus).toBe(
      false,
      'before focus'
    );

    inputNativeElement.dispatchEvent(new Event('focus'));
    expect(bigInputDebugElement.componentInstance.hasFocus).toBe(
      true,
      'after focus'
    );

    inputNativeElement.dispatchEvent(new Event('blur'));
    expect(bigInputDebugElement.componentInstance.hasFocus).toBe(
      false,
      'after blur'
    );
  });
});
