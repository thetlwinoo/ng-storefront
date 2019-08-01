import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { map, switchMap } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import * as OrderActions from "./order.actions";
import * as CartActions from "../cart/cart.actions";
import { OrderService } from "app/store/order/order.service";
import { Orders } from "@box/models";
import { Router } from "@angular/router";
import { Observable } from "rxjs";


@Injectable()
export class OrderEffects { //TODO ERROR HANDLING!!


  @Effect() fetchOrder$ = this.actions$.pipe(
    ofType(OrderActions.FETCH_ORDER),
    switchMap((action: OrderActions.FetchOrder) => {
      console.log('FETCH_ALL_ORDERS EFFECT');
      return this.orderService.getAllOrdersWithoutPaging()
        .map(res => ({ type: OrderActions.FETCH_ORDER_SUCCESS, payload: res }))
    })
  )

  @Effect()
  postOrder = this.actions$.pipe(
    ofType(OrderActions.POST_ORDER),
    map((action: OrderActions.PostOrder) => {
      return action.payload
    }),
    switchMap((data: Orders) => {
      return this.orderService.postOrder(data)
        .switchMap(res => {
          // this.router.navigate(["/checkout/success"]);
          return [
            { type: OrderActions.EMPTY_ORDER },
            { type: CartActions.EMPTY_CART },
            { type: OrderActions.POST_ORDER_SUCCESS, payload: res.body }]
        }).catch(error => {
          return Observable.of(
            new OrderActions.OrderError(
              { error: error, errorEffect: OrderActions.POST_ORDER }));
        })
    })
  )

  constructor(private actions$: Actions, private orderService: OrderService, private router: Router) {
  }
}
