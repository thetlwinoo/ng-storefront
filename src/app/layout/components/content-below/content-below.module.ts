import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContentBelowComponent } from './content-below.component';
import { InformationComponent } from './widgets/information/information.component';
import { CategoriesComponent } from './widgets/categories/categories.component';
import { WhyWeChooseComponent } from './widgets/why-we-choose/why-we-choose.component';
import { CopyrightComponent } from './widgets/copyright/copyright.component';
import { SocialComponent } from './widgets/social/social.component';

@NgModule({
  declarations: [
    ContentBelowComponent,
    InformationComponent,
    CategoriesComponent,
    WhyWeChooseComponent,
    CopyrightComponent,
    SocialComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports     : [
    ContentBelowComponent
]
})
export class ContentBelowModule { }
