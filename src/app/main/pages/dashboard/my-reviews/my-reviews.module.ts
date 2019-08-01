import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BoxSharedModule } from '@box/shared.module';
import { CloudinaryService } from './upload-review-image/cloudinary.service';
import { Cloudinary as CloudinaryCore } from 'cloudinary-core';
import { CloudinaryConfiguration, CloudinaryModule } from '@cloudinary/angular-5.x';
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from '@box/constants/cloudinary.constants';

export const cloudinary = { Cloudinary: CloudinaryCore };
export const config: CloudinaryConfiguration = {
  cloud_name: CLOUDINARY_CLOUD_NAME,
  upload_preset: CLOUDINARY_UPLOAD_PRESET
};

import {
  MyReviewsComponent,
  myReviewsRoute,
  ReviewDetailsComponent
} from './';
import { UploadReviewImageComponent } from './upload-review-image/upload-review-image.component';
import { ReviewUpdateComponent } from './review-update/review-update.component';

const ENTITY_STATES = [...myReviewsRoute];

@NgModule({
  declarations: [
    MyReviewsComponent,
    ReviewDetailsComponent,
    UploadReviewImageComponent,
    ReviewUpdateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ENTITY_STATES),
    CloudinaryModule.forRoot(cloudinary, config),
    BoxSharedModule
  ],
  entryComponents: [
    MyReviewsComponent,
    ReviewDetailsComponent
  ],
  providers: [
    CloudinaryService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [
    MyReviewsComponent
  ]
})
export class MyReviewsModule { }
