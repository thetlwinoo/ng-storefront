import { Component, OnInit } from '@angular/core';
// import { Order } from '@box/models';
// import { OrderService } from '@box/services/order.service';
import * as fromApp from "app/store/app.reducers";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { PaymentObject, PostOrdersObject, Orders } from "app/store/order/order.reducer";

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {
  orderState: Observable<{ postOrders: PostOrdersObject, postPayment: PaymentObject }>;
  orders: PostOrdersObject;
  // public orderDetails: Order = {};

  constructor(private store: Store<fromApp.AppState>,) { }

  ngOnInit() {
    // this.orderDetails = this.orderService.getOrderItems();
    // console.log(this.orderDetails);
    this.orderState = this.store.select('order');
    this.orderState.take(1).subscribe(data => {
      this.orders = data.postOrders;
      console.log(this.orders);
    });
  }

}
