import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from "./checkout.component";
// import { AuthGuardService } from "@box/services/e-commerce/auth-guard.service";
import { UserRouteAccessService } from '@box/services/core';
import { OrderFormComponent } from "./order-form/order-form.component";
import { PaymentComponent } from "./payment/payment.component";
import { ConfirmationComponent } from "./confirmation/confirmation.component";
import { DisplayCartComponent } from "./display-cart/display-cart.component";
import { CheckoutGuardService } from "@box/services/e-commerce/checkout-guard.service";
import { SuccessComponent } from "./success/success.component";
import { BreadcrumbInitializedGuard } from '@box/services/breadcrumb-initialized-guard.service';

const routes: Routes = [
  {
    path: '', component: CheckoutComponent,
    canActivate: [UserRouteAccessService, BreadcrumbInitializedGuard],
    // canDeactivate: [CheckoutGuardService],
    canActivateChild: [CheckoutGuardService],
    children: [
      {
        path: '', component: DisplayCartComponent,
        data: {
          crumbs: [{
            label: 'checkout'
          }]
        },
        canActivate: [BreadcrumbInitializedGuard]
      },
      { path: 'form', component: OrderFormComponent },
      { path: 'payment', component: PaymentComponent },
      { path: 'confirm', component: ConfirmationComponent },
      { path: 'success', component: SuccessComponent }
    ],
    data: {
      authorities: ['ROLE_USER'],
      crumbs: [{
        label: 'checkout'
      }]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    BreadcrumbInitializedGuard
  ]
})
export class CheckoutRoutingModule { }
