import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BoxSharedModule } from '@box/shared.module';

import {
  MyPaymentOptionsComponent,
  myPaymentOptionsRoute
} from './';

const ENTITY_STATES = [...myPaymentOptionsRoute];

@NgModule({
  declarations: [MyPaymentOptionsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ENTITY_STATES),
    BoxSharedModule
  ]
})
export class MyPaymentOptionsModule { }
