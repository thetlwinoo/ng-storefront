import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedCatalogComponent } from './selected-catalog.component';

describe('SelectedCatalogComponent', () => {
  let component: SelectedCatalogComponent;
  let fixture: ComponentFixture<SelectedCatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedCatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
