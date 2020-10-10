import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageMovesComponent } from './storage-moves.component';

describe('StorageMovesComponent', () => {
  let component: StorageMovesComponent;
  let fixture: ComponentFixture<StorageMovesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorageMovesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageMovesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
