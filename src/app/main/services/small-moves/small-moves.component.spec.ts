import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallMovesComponent } from './small-moves.component';

describe('SmallMovesComponent', () => {
  let component: SmallMovesComponent;
  let fixture: ComponentFixture<SmallMovesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmallMovesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallMovesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
