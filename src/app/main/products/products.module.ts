import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailService } from './services/product-detail.service';
import { BreadcrumbInitializedGuard } from '@box/services/breadcrumb-initialized-guard.service';
import { RelatedProductsComponent } from './related-products/related-products.component';
import { ProductBoxModule } from '@box/components';
// import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { BoxSharedModule } from '@box/shared.module';
import { ReviewsProductComponent } from './reviews-product/reviews-product.component';

const routes: Routes = [
  {
    path: ':id',
    component: ProductDetailComponent,
    // resolve: {
    //   data: ProductDetailService
    // },
    data: {
      crumbs: [{
        label: 'product'
      }, {
        label: 'details'
      }
      ]
    },
    canActivate: [BreadcrumbInitializedGuard]
  }
];

@NgModule({
  declarations: [
    ProductDetailComponent,
    RelatedProductsComponent,
    ReviewsProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    BoxSharedModule,
    ProductBoxModule
  ],
  providers: [
    ProductDetailService,
    BreadcrumbInitializedGuard
  ]
})
export class ProductsModule { }
