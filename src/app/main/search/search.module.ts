import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { MatCardModule, MatIconModule } from '@angular/material';
import { BoxSidebarModule, ProductCardModule, ProductBoxModule } from '@box/components';
import { BoxSharedModule } from '@box/shared.module';
import { SliderModule } from 'primeng/slider';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TreeModule } from 'primeng/tree';
import { CheckboxModule } from 'primeng/checkbox';
import { RatingModule } from 'primeng/rating';
import { GalleriaModule } from 'primeng/galleria';
// import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule, Button } from 'primeng/button';
import { CatalogModule } from 'app/main/shop/catalog/catalog.module';

//Filter
// import { ColorComponent } from '../shop/catalog/view-catalog/filter/color/color.component';
// import { BrandComponent } from '../shop/catalog/view-catalog/filter/brand/brand.component';
// import { PriceComponent } from '../shop/catalog/view-catalog/filter/price/price.component';
// import { CategoryComponent } from '../shop/catalog/view-catalog/filter/category/category.component';
// import { ConditionComponent } from '../shop/catalog/view-catalog/filter/condition/condition.component';
// import { RatingComponent } from '../shop/catalog/view-catalog/filter/rating/rating.component';

@NgModule({
  declarations: [
    SearchComponent,
    // ColorComponent,
    // BrandComponent,
    // PriceComponent,
    // CategoryComponent,
    // ConditionComponent,
    // RatingComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    MatCardModule,
    BoxSharedModule,
    BoxSidebarModule,
    ProductCardModule,
    ProductBoxModule,
    DataViewModule,
    CatalogModule,
    MatIconModule,
    SliderModule,
    DataViewModule,
    DropdownModule,
    PanelModule,
    DialogModule,
    InputTextModule,
    TreeModule,
    CheckboxModule,
    RatingModule,
    GalleriaModule,
    CarouselModule,
    ButtonModule
  ]
})
export class SearchModule { }
