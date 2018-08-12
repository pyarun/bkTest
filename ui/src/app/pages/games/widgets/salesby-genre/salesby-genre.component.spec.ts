import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesbyGenreComponent } from './salesby-genre.component';

describe('SalesbyGenreComponent', () => {
  let component: SalesbyGenreComponent;
  let fixture: ComponentFixture<SalesbyGenreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesbyGenreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesbyGenreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
