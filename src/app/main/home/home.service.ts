import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '@box/models';
import { ProductsService } from '@box/services/products.service';

@Injectable()
export class HomeService implements Resolve<any>
{
    public categories: any[];
    public bannerCategories: any[];
    public brands: any[];
    public products: Product[];

    constructor(
        private _httpClient: HttpClient,
        private _productsSevice: ProductsService
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getProducts({}),
                this.getCategories({}),
                this.getBannerCategories({}),
                this.getBrands({})
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    private getCategories(query): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/categories')
                .subscribe((response: any) => {
                    this.categories = response;
                    resolve(response);
                }, reject);
        });
    }

    private getBannerCategories(query): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/banner_categories')
                .subscribe((response: any) => {
                    this.bannerCategories = response;
                    resolve(response);
                }, reject);
        });
    }

    private getBrands(query): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/brands')
                .subscribe((response: any) => {
                    this.brands = response;
                    resolve(response);
                }, reject);
        });
    }

    private getProducts(query): Promise<any> {
        return new Promise((resolve, reject) => {
            this._productsSevice.getProducts()
                .subscribe((response: any) => {
                    this.products = response;
                    resolve(response);
                }, reject);
        });
    }
}
