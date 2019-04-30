import { Component, OnInit } from '@angular/core';
import { Order } from '@box/models';
import { OrderService } from '@box/services/order.service';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss']
})
export class OrderSuccessComponent implements OnInit {

  public orderDetails: Order = {};

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderDetails = this.orderService.getOrderItems();
  }

}
