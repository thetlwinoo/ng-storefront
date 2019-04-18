import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule, MatIconModule, MatButtonModule, MatTooltipModule, MatSliderModule, MatCheckboxModule, MatChipsModule } from '@angular/material';

//View Catalog
import { ViewCatalogComponent } from './view-catalog/view-catalog.component';
import { ViewToolbarComponent } from './view-catalog/view-toolbar/view-toolbar.component';
import { ProductListComponent } from './view-catalog/product-list/product-list.component';
import { ViewPagingComponent } from './view-catalog/view-paging/view-paging.component';
import { ViewCatalogService } from './view-catalog/view-catalog.service';
//Selected Catalog
import { SelectedCatalogComponent } from './selected-catalog/selected-catalog.component';
import { RelatedProductsComponent } from './selected-catalog/related-products/related-products.component';
import { SelectedProductComponent } from './selected-catalog/selected-product/selected-product.component';
import { ProductDetailComponent } from './selected-catalog/product-detail/product-detail.component';
import { SelectedCatalogService } from './selected-catalog/selected-catalog.service';
//Thirdparty Module
import { BoxTreeViewModule, BoxSidebarModule, ProductCardModule } from '@box/components';
import { BoxSharedModule } from '@box/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SliderModule } from 'primeng/slider';
//Filter
import { ColorComponent } from './view-catalog/filter/color/color.component';
import { BrandComponent } from './view-catalog//filter/brand/brand.component';
import { PriceComponent } from './view-catalog//filter/price/price.component';
const routes = [
  {
    path: 'catalog/:category',
    component: ViewCatalogComponent,
    resolve: {
      data: ViewCatalogService
    },
    data: {
      breadcrumbs: 'Home / Shop'
    }
  },
  {
    path: 'catalog/:id',
    component: SelectedCatalogComponent,
    resolve: {
      data: SelectedCatalogService
    },
    data: {
      breadcrumbs: 'Home / Shop / Detail'
    },
    // canActivate: [StockItemExistsGuard]
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
    SelectedProductComponent,
    ProductDetailComponent,
    ColorComponent,
    BrandComponent,
    PriceComponent
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
    BoxTreeViewModule,
    BoxSidebarModule,
    ProductCardModule,
    InfiniteScrollModule,
    SliderModule
  ],
  providers: [
    ViewCatalogService,
    SelectedCatalogService
  ]
})
export class CatalogModule { }
