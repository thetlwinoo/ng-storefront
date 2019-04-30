import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeModule } from 'app/main/shop/home/home.module';
import { CatalogModule } from 'app/main/shop/catalog/catalog.module';
import { ProductModule } from 'app/main/shop/product/product.module';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeModule,
    CatalogModule,
    ProductModule
  ]
})
export class ShopModule { }
