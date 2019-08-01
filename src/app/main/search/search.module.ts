import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { BoxSidebarModule, ProductCardModule, ProductBoxModule } from '@box/components';
import { BoxSharedModule } from '@box/shared.module';

// import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CategoryComponent } from './filter/category/category.component';
import { CategoryPipe } from './pipe/category.pipe';
import { ColorPipe } from './pipe/color.pipe';
import { ColorComponent } from './filter/color/color.component';
import { PriceComponent } from './filter/price/price.component';
import { ConditionComponent } from './filter/condition/condition.component';
import { RatingComponent } from './filter/rating/rating.component';

@NgModule({
  declarations: [
    SearchComponent,
    CategoryComponent,
    CategoryPipe,
    ColorPipe,
    ColorComponent,
    PriceComponent,
    ConditionComponent,
    RatingComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    BoxSharedModule,
    BoxSidebarModule,
    ProductCardModule,
    ProductBoxModule
  ]
})
export class SearchModule { }
