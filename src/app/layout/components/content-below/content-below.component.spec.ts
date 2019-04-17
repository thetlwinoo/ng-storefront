import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentBelowComponent } from './content-below.component';

describe('ContentBelowComponent', () => {
  let component: ContentBelowComponent;
  let fixture: ComponentFixture<ContentBelowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentBelowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentBelowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
