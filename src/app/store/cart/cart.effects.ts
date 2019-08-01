import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';

import { map, switchMap } from 'rxjs/operators';
import * as CartActions from "./cart.actions";
import { Observable } from "rxjs";
import { CartService } from "@box/services/e-commerce/cart.service";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/throw';

@Injectable()
export class CartEffects {


  @Effect()
  fetchCart = this.actions$.pipe(
    ofType(CartActions.FETCH_CART),
    switchMap((action: CartActions.FetchCart) => {
      return this.cartService.getCart()
        .map(res => {            
          return { type: CartActions.FETCH_CART_SUCCESS, payload: { cart: res, effect: CartActions.FETCH_CART } }
        })
        .catch(error => {
          return Observable.of(
            new CartActions.CartError(
              { error: error, errorEffect: CartActions.FETCH_CART }));
        })
    })
  )

  @Effect()
  addToCart = this.actions$.pipe(
    ofType(CartActions.ADD_TO_CART),
    map((action: CartActions.AddToCart) => {
      return action.payload
    }),
    switchMap((payload: { id: number, quantity: number }) => {
      return this.cartService.postCart(payload.id, payload.quantity)
        .map(res => {
          console.log('success',res)
          // this.router.navigate(["/checkout"]);

          return { type: CartActions.SET_CART, payload: { cart: res, effect: CartActions.ADD_TO_CART } }
        }).catch(error => {
          return Observable.of(
            new CartActions.CartError(
              { error: error, errorEffect: CartActions.ADD_TO_CART }));
        })
    })
  )

  @Effect()
  reduceFromCart = this.actions$.pipe(
    ofType(CartActions.REDUCE_FROM_CART),
    map((action: CartActions.ReduceFromCart) => {
      return action.payload
    }),
    switchMap((payload: { id: number, quantity: number }) => {
      return this.cartService.reduceFromCart(payload.id, payload.quantity)
        .map(res => {
          console.log('reduce cart',res)
          
          return { type: CartActions.SET_CART, payload: { cart: res, effect: CartActions.ADD_TO_CART } }
        }).catch(error => {
          return Observable.of(
            new CartActions.CartError(
              { error: error, errorEffect: CartActions.ADD_TO_CART }));
        })
    })
  )

  @Effect()
  removeFromCart = this.actions$.pipe(
    ofType(CartActions.REMOVE_FROM_CART),
    map((action: CartActions.RemoveFromCart) => {
      return action.payload
    }),
    switchMap((id: number) => {
      return this.cartService.removeFromCart(id)
        .map(res => ({ type: CartActions.SET_CART, payload: { cart: res, effect: CartActions.REMOVE_FROM_CART } }))
        .catch(error => {
          return Observable.of(
            new CartActions.CartError(
              { error: error, errorEffect: CartActions.REMOVE_FROM_CART }));
        })
    })
  )

  @Effect()
  applyDiscountCode = this.actions$.pipe(
    ofType(CartActions.APPLY_DISCOUNT),
    map((action: CartActions.ApplyDiscount) => {
      return action.payload
    }),
    switchMap((code: string) => {
      return this.cartService.applyDiscount(code)
        .map(res => ({ type: CartActions.SET_CART, payload: { cart: res, effect: CartActions.APPLY_DISCOUNT } }))
        .catch(error => {
          return Observable.of(
            new CartActions.CartError(
              { error: error, errorEffect: CartActions.APPLY_DISCOUNT }));
        })
    })
  )

  @Effect()
  emptyCart = this.actions$.pipe(
    ofType(CartActions.EMPTY_CART),
    switchMap((action: CartActions.EmptyCart) => {
      console.log('Empty Cart Actions');
      return this.cartService.emptyCart()
        .map(res => {
          console.log('Empty Cart Res',res);
          return { type: CartActions.EMPTY_CART_SUCCESS, payload: res }
        }).catch(error => {
          console.log('Empty Cart Error',error);
          return Observable.of(
            new CartActions.CartError({ error: error, errorEffect: CartActions.EMPTY_CART })
          )
        })
    })
  )


  constructor(private actions$: Actions, private cartService: CartService, private router: Router) {
  }
}
