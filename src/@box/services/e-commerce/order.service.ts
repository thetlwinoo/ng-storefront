import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Orders, PostOrdersObject } from "app/store/order/order.reducer";
import { environment } from '@app/env';

@Injectable()
export class OrderService {

  securedUrl: string = `${environment.serverApi.baseUrl}` + 'api/order-extended/order';
  private pageSize: number = 3;

  constructor(private httpClient: HttpClient) {
  }

  getAllOrdersCount() {
    return this.httpClient.get<number>(this.securedUrl + '/count');
  }

  getAllOrders(page: number) {
    let params = new HttpParams();
    params = params.set('page', page.toString());
    params = params.set('size', this.pageSize.toString());
    return this.httpClient.get<Orders[]>(this.securedUrl, {
      params: params
    });
  }

  postOrder(data: PostOrdersObject) {
    return this.httpClient.post<Orders>(this.securedUrl, data);
  }

  getPageSize() {
    return this.pageSize;
  }

}
