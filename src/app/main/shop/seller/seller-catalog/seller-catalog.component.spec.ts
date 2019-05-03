import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerCatalogComponent } from './seller-catalog.component';

describe('SellerCatalogComponent', () => {
  let component: SellerCatalogComponent;
  let fixture: ComponentFixture<SellerCatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerCatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
