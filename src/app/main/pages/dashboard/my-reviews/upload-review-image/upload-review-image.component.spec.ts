import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadReviewImageComponent } from './upload-review-image.component';

describe('UploadReviewImageComponent', () => {
  let component: UploadReviewImageComponent;
  let fixture: ComponentFixture<UploadReviewImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadReviewImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadReviewImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
