import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule, MatIconModule, MatButtonModule, MatTooltipModule, MatSliderModule, MatCheckboxModule, MatChipsModule, MatProgressSpinnerModule } from '@angular/material';

//View Catalog
import { ViewCatalogComponent } from './view-catalog/view-catalog.component';
import { ViewToolbarComponent } from './view-catalog/view-toolbar/view-toolbar.component';
import { ProductListComponent } from './view-catalog/product-list/product-list.component';
import { ViewPagingComponent } from './view-catalog/view-paging/view-paging.component';
import { ViewCatalogService } from './view-catalog/view-catalog.service';
//Selected Catalog
import { SelectedCatalogComponent } from './selected-catalog/selected-catalog.component';
import { RelatedProductsComponent } from './selected-catalog/related-products/related-products.component';
import { SelectedCatalogService } from './selected-catalog/selected-catalog.service';
//Thirdparty Module
import { BoxTreeViewModule, BoxSidebarModule, ProductCardModule, ProductBoxHoverModule } from '@box/components';
import { BoxSharedModule } from '@box/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
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
import { SlickCarouselModule } from 'ngx-slick-carousel';

//Filter
import { ColorComponent } from './view-catalog/filter/color/color.component';
import { BrandComponent } from './view-catalog/filter/brand/brand.component';
import { PriceComponent } from './view-catalog/filter/price/price.component';
import { CategoryComponent } from './view-catalog/filter/category/category.component';
import { ConditionComponent } from './view-catalog/filter/condition/condition.component';
import { RatingComponent } from './view-catalog/filter/rating/rating.component';

import { BreadcrumbInitializedGuard } from '@box/services/breadcrumb-initialized-guard.service';
const routes = [
  {
    path: 'catalog/:category',
    component: ViewCatalogComponent,
    resolve: {
      data: ViewCatalogService
    },
    data: {
      crumbs: [{
        label: 'catalog'
      }]
    },
    canActivate: [BreadcrumbInitializedGuard]
  },
  {
    path: 'product/:id',
    component: SelectedCatalogComponent,
    resolve: {
      data: SelectedCatalogService
    },
    data: {
      crumbs: [{
        label: 'catalog'
      }]
    },
    canActivate: [BreadcrumbInitializedGuard]
  }
];

@NgModule({
  declarations: [
    ViewCatalogComponent,
    ViewToolbarComponent,
    ProductListComponent,
    ViewPagingComponent,
    SelectedCatalogComponent,
    RelatedProductsComponent,
    ColorComponent,
    BrandComponent,
    PriceComponent,
    CategoryComponent,
    ConditionComponent,
    RatingComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    BoxSharedModule,
    CommonModule,
    RouterModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatSliderModule,
    MatCheckboxModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    BoxTreeViewModule,
    BoxSidebarModule,
    ProductCardModule,
    InfiniteScrollModule,
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
    SlickCarouselModule,
    ProductBoxHoverModule
  ],
  providers: [
    ViewCatalogService,
    SelectedCatalogService,
    BreadcrumbInitializedGuard
  ]
})
export class CatalogModule { }
