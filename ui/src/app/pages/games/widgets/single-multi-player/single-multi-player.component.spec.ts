import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleMultiPlayerComponent } from './single-multi-player.component';

describe('SingleMultiPlayerComponent', () => {
  let component: SingleMultiPlayerComponent;
  let fixture: ComponentFixture<SingleMultiPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleMultiPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleMultiPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
