import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';

import { HttpClient } from '@angular/common/http';
import { Product } from '@box/models';
import { ProductsService } from '@box/services/products.service';

@Injectable()
export class ViewCatalogService implements Resolve<any> {
    public products: Product[] = [];
    public items: Product[] = [];
    public tagsFilters: any[] = [];
    public tags: any[] = [];
    public colors: any[] = [];

    constructor(
        private http: HttpClient,
        private productsService: ProductsService
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        const category = route.params['category'];
            return new Promise((resolve, reject) => {
                Promise.all([
                    this.getProducts(category)
                ]).then(
                    () => {
                        resolve();
                    },
                    reject
                );
            });
    }

    public getProducts(category) {
        this.productsService.getProductByCategory(category).subscribe(products => {
            this.products = products;
            this.getTags(products);
            this.getColors(products);
        })
    }
    // Get current product tags
    public getTags(products) {
        var uniqueBrands = []
        var itemBrand = Array();
        products.map((product, index) => {
            if (product.tags) {
                product.tags.map((tag) => {
                    const index = uniqueBrands.indexOf(tag);
                    if (index === -1) uniqueBrands.push(tag);
                })
            }
        });
        for (var i = 0; i < uniqueBrands.length; i++) {
            itemBrand.push({ brand: uniqueBrands[i] })
        }
        this.tags = itemBrand
    }

    // Get current product colors
    public getColors(products) {
        var uniqueColors = []
        var itemColor = Array();
        products.map((product, index) => {
            if (product.colors) {
                product.colors.map((color) => {
                    const index = uniqueColors.indexOf(color);
                    if (index === -1) uniqueColors.push(color);
                })
            }
        });
        for (var i = 0; i < uniqueColors.length; i++) {
            itemColor.push({ color: uniqueColors[i] })
        }
        this.colors = itemColor
    }    
}
