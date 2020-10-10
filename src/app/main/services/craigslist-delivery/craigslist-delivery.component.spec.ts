import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CraigslistDeliveryComponent } from './craigslist-delivery.component';

describe('CraigslistDeliveryComponent', () => {
  let component: CraigslistDeliveryComponent;
  let fixture: ComponentFixture<CraigslistDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CraigslistDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CraigslistDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
