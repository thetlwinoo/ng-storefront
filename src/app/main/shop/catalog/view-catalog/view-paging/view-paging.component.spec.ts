import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPagingComponent } from './view-paging.component';

describe('ViewPagingComponent', () => {
  let component: ViewPagingComponent;
  let fixture: ComponentFixture<ViewPagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
