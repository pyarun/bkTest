import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeVsPaidComponent } from './free-vs-paid.component';

describe('FreeVsPaidComponent', () => {
  let component: FreeVsPaidComponent;
  let fixture: ComponentFixture<FreeVsPaidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreeVsPaidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeVsPaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
