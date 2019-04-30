import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCompareComponent } from './product-compare/product-compare.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ProductWishlistComponent } from './product-wishlist/product-wishlist.component';
import { ProductCartComponent } from './product-cart/product-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPayPalModule } from 'ngx-paypal';
import { BreadcrumbInitializedGuard } from '@box/services/breadcrumb-initialized-guard.service';

const routes: Routes = [
  {
    path: 'wishlist',
    component: ProductWishlistComponent,
    data: {
      crumbs: [{
        label: 'wishlist'
      }]
    },
    canActivate: [BreadcrumbInitializedGuard]
  },
  {
    path: 'compare',
    component: ProductCompareComponent,
    data: {
      crumbs: [{
        label: 'compare'
      }]
    },
    canActivate: [BreadcrumbInitializedGuard]
  },
  {
    path: 'cart',
    component: ProductCartComponent,
    data: {
      crumbs: [{
        label: 'cart'
      }]
    },
    canActivate: [BreadcrumbInitializedGuard]
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    data: {
      crumbs: [{
        label: 'checkout'
      }]
    },
    canActivate: [BreadcrumbInitializedGuard]
  },
  {
    path: 'checkout/success',
    component: OrderSuccessComponent,
    data: {
      crumbs: [{
        label: 'checkout'
      },
      {
        label: 'success'
      }]
    },
    canActivate: [BreadcrumbInitializedGuard]
  }
];

@NgModule({
  declarations: [
    ProductCompareComponent,
    OrderSuccessComponent,
    ProductWishlistComponent,
    ProductCartComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgxPayPalModule
  ],
  exports: [RouterModule]
})
export class ProductModule { }
