import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavAdsComponent } from './fav-ads.component';

describe('FavAdsComponent', () => {
  let component: FavAdsComponent;
  let fixture: ComponentFixture<FavAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavAdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
