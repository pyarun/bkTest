import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersVsPriceComponent } from './users-vs-price.component';

describe('UsersVsPriceComponent', () => {
  let component: UsersVsPriceComponent;
  let fixture: ComponentFixture<UsersVsPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersVsPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersVsPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
