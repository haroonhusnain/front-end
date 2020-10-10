import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesEstimateComponent } from './services-estimate.component';

describe('ServicesEstimateComponent', () => {
  let component: ServicesEstimateComponent;
  let fixture: ComponentFixture<ServicesEstimateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesEstimateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesEstimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
