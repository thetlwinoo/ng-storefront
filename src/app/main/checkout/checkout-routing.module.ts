import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from "./checkout.component";
// import { AuthGuardService } from "@box/services/e-commerce/auth-guard.service";
import { UserRouteAccessService } from '@box/services/core';
import { OrderFormComponent } from "./order-form/order-form.component";
import { PaymentComponent } from "./payment/payment.component";
import { DisplayCartComponent } from "./display-cart/display-cart.component";
import { CheckoutGuardService } from "@box/services/e-commerce/checkout-guard.service";
import { SuccessComponent } from "./success/success.component";
import { BreadcrumbInitializedGuard } from '@box/services/breadcrumb-initialized-guard.service';
import { Orders, IOrders } from '@box/models';
import { OrderService } from 'app/store/order/order.service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class OrdersResolve implements Resolve<IOrders> {
  constructor(private service: OrderService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IOrders> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Orders>) => response.ok),
        map((orders: HttpResponse<Orders>) => orders.body)
      );
    }
    return of(new Orders());
  }
}

const routes: Routes = [
  {
    path: '', component: CheckoutComponent,
    canActivate: [UserRouteAccessService, BreadcrumbInitializedGuard],
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'My Addresses',
      crumbs: [{
        label: 'checkout'
      }]
    },
    // canDeactivate: [CheckoutGuardService],
    // canActivateChild: [CheckoutGuardService],
    children: [
      {
        path: '', component: DisplayCartComponent,
        data: {
          authorities: ['ROLE_USER'],
          pageTitle: 'Cart',
          route: 'cart',
          crumbs: [{
            label: 'checkout'
          }]
        },
        canActivate: [BreadcrumbInitializedGuard]
      },
      {
        path: 'form', component: OrderFormComponent,
        data: {
          authorities: ['ROLE_USER'],
          pageTitle: 'Order',
          route: 'order'
        },
        canActivate: [UserRouteAccessService]
      },
      {
        path: 'payment/:id/secure', component: PaymentComponent,
        resolve: {
          orders: OrdersResolve
        },
        data: {
          authorities: ['ROLE_USER'],
          pageTitle: 'Payment',
          route: 'payment'
        },
        canActivate: [UserRouteAccessService]
      },
      {
        path: 'success/:id', component: SuccessComponent,
        resolve: {
          orders: OrdersResolve
        },
        data: {
          authorities: ['ROLE_USER'],
          pageTitle: 'Success',
          route: 'success'
        }
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    BreadcrumbInitializedGuard
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CheckoutRoutingModule { }
