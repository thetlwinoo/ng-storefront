import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import * as OrderActions from "app/store/order/order.actions";
// import { PostOrdersObject } from "app/store/order/order.reducer";
import * as fromApp from "app/store/app.reducers";
import { Store } from "@ngrx/store";
import { Router, ActivatedRoute } from "@angular/router";
import * as BlankValidators from "@box/services/core/validators/blank.validator";
import { AccountService } from '@box/services/core';
import { Account } from '@box/models';
import { Observable } from "rxjs/Observable";
import { Addresses, Orders, IOrders } from '@box/models';
import { HttpError } from "app/store/app.reducers";
import * as AddressActions from "app/store/adresses/addresses.actions";
import * as moment from 'moment';
import { MenuItem } from 'primeng/components/common/api';
import { MessageService } from '@box/services/message.service';
import { Cart } from "app/store/cart/cart.reducer";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit, OnDestroy {
  innerLoading: boolean = true;

  addNewAddressInd: boolean = false;
  account: Account;
  cartPrice: number;
  totalCount: number = 0;
  applyCodeShow: boolean = false;
  defaultAddress: Addresses;
  placeOrderInd: boolean = false;

  addressState: Observable<{ addresses: any[], default: any, errors: HttpError[], loading: boolean }>;
  orderState: Observable<{ currentOrder: Orders, errors: HttpError[] }>;
  cartState: Observable<{ cart: Cart, errors: HttpError[], loading: boolean }>;
  cartPriceSubscription: Subscription;
  addressStateSubscription: Subscription;
  orderSubscription: Subscription;

  constructor(
    private store: Store<fromApp.AppState>,
    private accountService: AccountService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.store.dispatch(new AddressActions.FetchAddresses);
    this.addressState = this.store.select('addresses');
    this.orderState = this.store.select('order');

    this.accountService.identity().then((account: Account) => {
      console.log('order user', account)
      this.account = account;
      this.innerLoading = false;
    });

    this.cartState = this.store.select('cart');
    this.cartPriceSubscription = this.cartState.subscribe(
      (data) => {
        // console.log('cart state')
        let cp = 0;

        if (data.cart.cartItemLists) {
          for (let i = 0; i < data.cart.cartItemLists.length; i++) {
            const product = data.cart.cartItemLists[i].product;
            cp = cp + (product.unitPrice * data.cart.cartItemLists[i].quantity);
          }

          this.totalCount = data.cart.cartItemLists.length;
        }

        this.cartPrice = cp;
      }
    );

    this.addressStateSubscription = this.addressState.subscribe(data => {
      if (data && !data.loading && data.default) {
        this.defaultAddress = data.default;
      }
    });

    this.orderSubscription = this.orderState.subscribe(data => {      
      if (data.currentOrder && data.currentOrder.totalDue > 0 && this.placeOrderInd) {
        this.router.navigate(['/checkout/payment', data.currentOrder.id, 'secure']);
      }
    })
  }

  onAddNewAddress(event) {
    this.addNewAddressInd = true;
  }

  onCancel(event) {
    this.addNewAddressInd = false;
  }

  onCreateCompleted(event) {
    // this.store.dispatch(new AddressActions.FetchAddresses);
  }

  placeOrder() {
    const postOrders: IOrders = {
      billToAddressId: this.defaultAddress.id,
      shipToAddressId: this.defaultAddress.id,
      orderDate: moment(),
      shipDate: moment(),
      dueDate: moment()
    };
    console.log('POST ORDERS', postOrders);
    this.store.dispatch(new OrderActions.PostOrder(postOrders));
    this.placeOrderInd = true;
  }

  ngOnDestroy() {
    if (this.addressStateSubscription) this.addressStateSubscription.unsubscribe();
    if (this.cartPriceSubscription) this.cartPriceSubscription.unsubscribe();
    if (this.orderSubscription) this.orderSubscription.unsubscribe();
  }
}
