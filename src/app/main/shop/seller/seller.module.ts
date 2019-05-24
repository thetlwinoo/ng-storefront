import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SellerComponent } from './seller.component';
import { SellerService } from './seller.service';
import { BreadcrumbInitializedGuard } from '@box/services/breadcrumb-initialized-guard.service';
import { ButtonModule } from 'primeng/button';
import { MatCardModule, MatButtonModule, MatIconModule } from '@angular/material';
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { OwlModule } from 'ngx-owl-carousel';
import { CarouselModule } from 'primeng/carousel';
import { PromotionalProductsComponent } from './promotional-products/promotional-products.component';
import { SellerBannerComponent } from './seller-banner/seller-banner.component';
import { SellerProductsComponent } from './seller-products/seller-products.component';
import { ProductCardModule, ProductBoxHoverModule, ProductBoxModule } from '@box/components';

const routes = [
  {
    path: 'seller',
    component: SellerComponent,
    resolve: {
      data: SellerService
    },
    data: {
      crumbs: []
    },
    canActivate: [BreadcrumbInitializedGuard]
  }
];

@NgModule({
  declarations: [
    SellerComponent,
    PromotionalProductsComponent,
    SellerBannerComponent,
    SellerProductsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    MatCardModule,
    CardModule,
    MatButtonModule,
    MatIconModule,
    MenubarModule,
    InputTextModule,
    OwlModule,
    CarouselModule,
    ProductCardModule,
    ProductBoxHoverModule,
    ProductBoxModule
  ],
  providers: [
    SellerService
  ]
})
export class SellerModule { }
