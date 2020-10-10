import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JunkRemovalComponent } from './junk-removal.component';

describe('JunkRemovalComponent', () => {
  let component: JunkRemovalComponent;
  let fixture: ComponentFixture<JunkRemovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JunkRemovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JunkRemovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
