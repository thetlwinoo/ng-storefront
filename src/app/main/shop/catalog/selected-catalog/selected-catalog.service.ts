import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from 'environments/environment';
// import { Product } from '@box/models';
import { Product } from "app/store/cart/cart.reducer";
import { ProductsService } from '@box/services/products.service';
import { ProductService } from '@box/services/e-commerce/product.service';

@Injectable()
export class SelectedCatalogService implements Resolve<any> {

    images: any[];
    products: Product[];
    public product: Product;
    // onStockItemsChanged: BehaviorSubject<any> = new BehaviorSubject({});

    constructor(
        private http: HttpClient,
        private productService: ProductService
    ) {
    }

    /**
       * Resolve
       * @param {ActivatedRouteSnapshot} route
       * @param {RouterStateSnapshot} state
       * @returns {Observable<any> | Promise<any> | any}
       */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        const productId = route.params["id"];
        return new Promise((resolve, reject) => {
            Promise.all([
                // this.getProducts(),
                this.getProductImages(),
                this.getProduct(+productId)
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getProducts(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get('api/products')
                .subscribe((response: any) => {
                    this.products = response;
                    console.log(response);
                    resolve(response);
                }, reject);
        });
    }

    getProductImages(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get('api/images')
                .subscribe((response: any) => {
                    this.images = response;
                    resolve(response);
                }, reject);
        });
    }

    getProduct(id) {
        return new Promise((resolve, reject) => {
            this.productService.getFullProduct(id).subscribe((response: any) => {
                this.product = response;
                console.log('Product Respnose',response)
                resolve(response);
            }, reject);
        });
    }
}
