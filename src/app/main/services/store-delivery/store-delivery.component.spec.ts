import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreDeliveryComponent } from './store-delivery.component';

describe('StoreDeliveryComponent', () => {
  let component: StoreDeliveryComponent;
  let fixture: ComponentFixture<StoreDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
