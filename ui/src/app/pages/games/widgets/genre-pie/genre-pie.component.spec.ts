import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenrePieComponent } from './genre-pie.component';

describe('GenrePieComponent', () => {
  let component: GenrePieComponent;
  let fixture: ComponentFixture<GenrePieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenrePieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenrePieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
