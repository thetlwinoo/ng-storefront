import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Product, ProductDisplay } from "app/store/cart/cart.reducer";
import { Products, IProducts } from '@box/models';
import { environment } from '@app/env';
import { Observable } from 'rxjs';
type EntityResponseType = HttpResponse<IProducts>;

@Injectable()
export class ProductService {

  url: string = `${environment.serverApi.baseUrl}` + 'api/products-extend';
  categoryUrl: string = 'backendurl/api/category';

  browsePageSize: number = 20;
  searchPageSize: number = 10;

  constructor(private httpClient: HttpClient) {
  }

  getProducts(page: number, sort: string, category: string) {
    if (page === undefined && page === null && page < 0) {
      return;
    }
    let params = new HttpParams();
    params = params.set('page', page.toString());
    params = params.set('size', this.browsePageSize.toString());
    if (sort !== undefined && sort !== null && sort != 'any') {
      params = params.set('sort', sort);
    }
    if (category !== undefined && category !== null && category != 'any') {
      params = params.set('category', category);
    }

    return this.httpClient.get<Object[]>(this.url,
      {
        params: params
      });
  }

  getFullProduct(id: number): Observable<EntityResponseType> {
    return this.httpClient.get<IProducts>(this.url + '/product',
      {
        params: new HttpParams().set('id', id.toString()),
        observe: 'response'
      });
  }

  getRelatedProducts(id: number) {
    return this.httpClient.get<Product[]>(this.url + '/related',
      {
        params: new HttpParams().set('id', id.toString())
      });
  }

  getNewlyAdded() {
    return this.httpClient.get<ProductDisplay[]>(this.url + '/recent');
  }

  getMostSelling() {
    return this.httpClient.get<ProductDisplay[]>(this.url + '/mostselling');
  }

  getInterested() {
    console.log('interested')
    return this.httpClient.get<ProductDisplay[]>(this.url + '/interested');
  }

  getDailyDiscover() {
    console.log('daily discover')
    return this.httpClient.get<ProductDisplay[]>(this.url + '/dailydiscover');
  }

  searchProduct(page: number, keyword: string) {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('keyword', keyword);
    params = params.append('pageable', 'true');
    params = params.set('size', this.searchPageSize.toString());
    return this.httpClient.get<ProductDisplay[]>(this.url + '/search', {
      params: params
    })
  }

  searchProductAll(keyword: string) {
    let params = new HttpParams();
    params = params.append('page', '0');
    params = params.append('size', '0');
    params = params.append('pageable', 'false');
    params = params.append('keyword', keyword);
    console.log(params)
    return this.httpClient.get<ProductDisplay[]>(this.url + '/search', {
      params: params
    })
  }

  getCategory() {
    return this.httpClient.get<Object[]>(this.categoryUrl);
  }

}
