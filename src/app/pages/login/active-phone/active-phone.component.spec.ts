import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivePhoneComponent } from './active-phone.component';

describe('ActivePhoneComponent', () => {
  let component: ActivePhoneComponent;
  let fixture: ComponentFixture<ActivePhoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivePhoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivePhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
