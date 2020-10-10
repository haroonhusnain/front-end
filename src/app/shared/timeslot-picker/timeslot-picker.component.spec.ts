import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeslotPickerComponent } from './timeslot-picker.component';

describe('TimeslotPickerComponent', () => {
  let component: TimeslotPickerComponent;
  let fixture: ComponentFixture<TimeslotPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeslotPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeslotPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
