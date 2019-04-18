import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeModule } from 'app/main/shop/home/home.module';
import { CatalogModule } from 'app/main/shop/catalog/catalog.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeModule,
    CatalogModule
  ]
})
export class ShopModule { }
