import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBookServicesComponent } from './all-book-services.component';

describe('AllBookServicesComponent', () => {
  let component: AllBookServicesComponent;
  let fixture: ComponentFixture<AllBookServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllBookServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllBookServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
