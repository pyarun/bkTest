import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseCountByYearComponent } from './release-count-by-year.component';

describe('ReleaseCountByYearComponent', () => {
  let component: ReleaseCountByYearComponent;
  let fixture: ComponentFixture<ReleaseCountByYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseCountByYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseCountByYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
