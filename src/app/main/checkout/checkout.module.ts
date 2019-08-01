import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { DisplayCartComponent } from './display-cart/display-cart.component';
import { EmptyCartComponent } from './display-cart/empty-cart/empty-cart.component';
import { InterestedComponent } from './display-cart/interested/interested.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { PaymentComponent } from './payment/payment.component';
import { SuccessComponent } from './success/success.component';
import { CheckoutGuardService } from "@box/services/e-commerce/checkout-guard.service";
import { BoxSharedModule } from '@box/shared.module';
import { ProductBoxModule } from '@box/components';
import { MessageService } from '@box/services/message.service';
import { PaypalService } from 'app/store/payment/paypal.service';
import { DefaultAddressPipe } from './default-address.pipe';
import { BoxSidebarModule } from '@box/components';
import { BusinessEntityModule } from '@box/components/business-entity/business-entity.module';
import { CreditCardModule } from '@box/components/cards/credit-card/credit-card.module';
import { AddressTypePipe } from './addresses/pipes/address-type.pipe';
import { AddressComponent } from './addresses/address/address.component';
import { NewAddressComponent } from './addresses/new-address/new-address.component';

@NgModule({
  declarations: [
    CheckoutComponent,
    DisplayCartComponent,
    EmptyCartComponent,
    InterestedComponent,
    OrderFormComponent,
    PaymentComponent,
    SuccessComponent,
    DefaultAddressPipe,
    AddressTypePipe,
    AddressComponent,
    NewAddressComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    BoxSharedModule,
    ProductBoxModule,
    BoxSidebarModule,
    BusinessEntityModule,
    CreditCardModule
  ],
  providers: [
    CheckoutGuardService,
    MessageService,
    PaypalService
  ],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CheckoutModule { }
