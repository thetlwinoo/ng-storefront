import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { BoxSharedModule } from '@box/shared.module';
import { HomeService } from './home.service';
import { ProductsService } from '@box/services/products.service';
import { OwlModule } from 'ngx-owl-carousel';
import { ProductCardModule, ProductBoxHoverModule } from '@box/components';

import { MatGridListModule, MatTabsModule, MatListModule, MatProgressSpinnerModule, MatToolbarModule, MatIconModule, MatButtonModule } from '@angular/material';
import { SliderBannerComponent } from './slider-banner/slider-banner.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { FlashDealsComponent } from './flash-deals/flash-deals.component';
import { BrandZoneComponent } from './brand-zone/brand-zone.component';
import { PopularProductsComponent } from './popular-products/popular-products.component';
import { DailyDiscoverComponent } from './daily-discover/daily-discover.component';
import { ProductBannerComponent } from './banner/banner.component';
import { VerticalSlidersComponent } from './vertical-sliders/vertical-sliders.component';
import { ProductLogoComponent } from './logo/logo.component';

import { SnackBarService } from '@box/services/snackbar.service';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { BarRatingModule } from "ngx-bar-rating";
import { BreadcrumbInitializedGuard } from '@box/services/breadcrumb-initialized-guard.service';

const routes = [
  {
    path: 'home',
    component: HomeComponent,
    resolve: {
      data: HomeService
    },
    data: {
      crumbs: []
    },
    canActivate: [BreadcrumbInitializedGuard]
  }
];

@NgModule({
  declarations: [
    HomeComponent,
    SliderBannerComponent,
    ProductCategoryComponent,
    FlashDealsComponent,
    BrandZoneComponent,
    PopularProductsComponent,
    DailyDiscoverComponent,
    ProductBannerComponent,
    VerticalSlidersComponent,
    ProductLogoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    OwlModule,
    TranslateModule,
    MatGridListModule,
    MatTabsModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    BoxSharedModule,
    ProductCardModule,
    ProductBoxHoverModule,
    SlickCarouselModule,
    BarRatingModule
  ],
  providers: [
    HomeService,
    ProductsService,
    SnackBarService
  ]
})
export class HomeModule { }
