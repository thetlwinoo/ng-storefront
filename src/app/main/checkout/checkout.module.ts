import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { DisplayCartComponent } from './display-cart/display-cart.component';
import { EmptyCartComponent } from './display-cart/empty-cart/empty-cart.component';
import { InterestedComponent } from './display-cart/interested/interested.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { BankAcceptComponent } from './confirmation/bank-accept/bank-accept.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { PaymentComponent } from './payment/payment.component';
import { SuccessComponent } from './success/success.component';
import { CheckoutGuardService } from "@box/services/e-commerce/checkout-guard.service";
import { CarouselModule } from 'primeng/carousel';
import { BoxSharedModule } from '@box/shared.module';
import { ProductBoxModule } from '@box/components';

@NgModule({
  declarations: [
    CheckoutComponent,
    DisplayCartComponent,
    EmptyCartComponent,
    InterestedComponent,
    ConfirmationComponent,
    BankAcceptComponent,
    OrderFormComponent,
    PaymentComponent,
    SuccessComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    CarouselModule,
    BoxSharedModule,
    ProductBoxModule
  ],
  providers: [CheckoutGuardService],
  bootstrap: [BankAcceptComponent]
})
export class CheckoutModule { }
