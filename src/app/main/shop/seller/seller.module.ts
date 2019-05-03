import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SellerCatalogComponent } from './seller-catalog/seller-catalog.component';
import { SellerComponent } from './seller.component';
import { SellerService } from './seller.service';
import { BreadcrumbInitializedGuard } from '@box/services/breadcrumb-initialized-guard.service';
import { ButtonModule } from 'primeng/button';

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
    SellerCatalogComponent,
    SellerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule
  ],
  providers: [
    SellerService
  ]
})
export class SellerModule { }
