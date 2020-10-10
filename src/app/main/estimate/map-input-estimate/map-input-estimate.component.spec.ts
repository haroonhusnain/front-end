import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapInputEstimateComponent } from './map-input-estimate.component';

describe('MapInputEstimateComponent', () => {
  let component: MapInputEstimateComponent;
  let fixture: ComponentFixture<MapInputEstimateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapInputEstimateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapInputEstimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
