import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LuggerBookingComponent } from './lugger-booking.component';

describe('LuggerBookingComponent', () => {
  let component: LuggerBookingComponent;
  let fixture: ComponentFixture<LuggerBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LuggerBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LuggerBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
