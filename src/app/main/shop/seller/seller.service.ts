import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';

import { HttpClient } from '@angular/common/http';
import { Product } from '@box/models';
import { ProductsService } from '@box/services/products.service';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  public products: Product[] = [];
  public items: Product[] = [];
  public tagsFilters: any[] = [];
  public tags: any[] = [];
  public colors: any[] = [];
  public masterCategories: any[] = [];
  public productCategories: any[] = [];
  public filteredCategories: any[] = [];
  public price: any;

  constructor(
    private http: HttpClient,
    private productsService: ProductsService
  ) { }
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const category = route.params['category'];
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getCategories(),
        this.getProducts(category),
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
      this.getFilters(products);
    })
  }

  public getCategories() {
    return new Promise((resolve, reject) => {
      this.http.get('api/categories')
        .subscribe((response: any) => {
          this.masterCategories = response;
          resolve(response);
        }, reject);
    });
  }

  private filterCategories(categories, productCategories): any[] {
    const newItem: any[] = [];

    categories.map((mitem, mindex) => {
      const children: any[] = [];
      if (mitem.children) {
        mitem.children.map((citem, cindex) => {

          productCategories.map((pitem, pindex) => {
            if (citem.label == pitem.category) {
              children.push(citem);
            }
          });
        });

        if (children.length > 0) {
          newItem.push({
            "label": mitem.label,
            "data": mitem.data,
            "expandedIcon": mitem.expandedIcon,
            "type": mitem.type,
            "children": children
          });
        }
      }
    });

    if (newItem.length > 0) {
      Object.assign(newItem[0], { "expanded": true });
    }
    return newItem;
  }
  // Get current product tags
  public getFilters(products) {
    var uniqueBrands = []
    var itemBrand = Array();

    var uniqueColors = [];
    var itemColor = Array();

    var uniqueCategories = [];
    var itemCategory = Array();

    var minPrice: number = 0;
    var maxPrice: number = 0;

    if (products) {
      minPrice = products[0].salePrice;
      maxPrice = products[0].salePrice;
    }

    products.map((product, index) => {
      //brand
      if (product.tags) {
        product.tags.map((tag) => {
          const index = uniqueBrands.indexOf(tag);
          if (index === -1) uniqueBrands.push(tag);
        })
      }

      //color
      if (product.colors) {
        product.colors.map((color) => {
          const index = uniqueColors.indexOf(color);
          if (index === -1) uniqueColors.push(color);
        })
      }

      //color
      if (product.categories) {
        product.categories.map((category) => {
          const index = uniqueCategories.indexOf(category);
          if (index === -1) uniqueCategories.push(category);
        })
      }

      if (product.salePrice) {
        if (product.salePrice < minPrice) minPrice = product.salePrice;
        if (product.salePrice > maxPrice) maxPrice = product.salePrice;
      }
    });

    //brand
    for (var i = 0; i < uniqueBrands.length; i++) {
      itemBrand.push({ brand: uniqueBrands[i] })
    }
    this.tags = itemBrand;

    //color
    for (var i = 0; i < uniqueColors.length; i++) {
      itemColor.push({ color: uniqueColors[i] })
    }
    this.colors = itemColor;

    //category
    for (var i = 0; i < uniqueCategories.length; i++) {
      itemCategory.push({ category: uniqueCategories[i] })
    }
    this.productCategories = itemCategory;

    this.filteredCategories = this.filterCategories(this.masterCategories, this.productCategories);
    this.price = {
      'minPrice': minPrice,
      'maxPrice': maxPrice
    };
  }
}
