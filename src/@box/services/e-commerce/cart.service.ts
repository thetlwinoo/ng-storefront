import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Cart } from "app/store/cart/cart.reducer";
  import { environment } from '@app/env';

@Injectable()
export class CartService {
  securedUrl: string = `${environment.serverApi.baseUrl}` + 'api/shopping-carts-extend/cart';

  constructor(private httpClient: HttpClient) {
  }

  getCart() {
    return this.httpClient.get<Cart>(this.securedUrl);
  }

  postCart(productId: number, quantity: number) {
    return this.httpClient.post<Cart>(this.securedUrl, {
      productId: productId,
      amount: quantity
    });
  }

  removeFromCart(id: number) {
    return this.httpClient.delete<Cart>(this.securedUrl, {
      params: new HttpParams().set('id', id.toString())
    })
  }

  reduceFromCart(id: number, quantity: number) {
    console.log('reduce',id)
    return this.httpClient.post<Cart>(this.securedUrl + '/reduce', {
      id: id,
      quantity: quantity
    });
  }

  confirmCart(cart: Cart) {
    return this.httpClient.post(this.securedUrl + '/confirm', cart);
  }

  applyDiscount(code: string) {
    return this.httpClient.get<Cart>(this.securedUrl + '/discount', {
      params: new HttpParams().set('code', code)
    });
  }

  emptyCart() {
    return this.httpClient.delete(this.securedUrl);
  }


}
