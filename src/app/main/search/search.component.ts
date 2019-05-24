import { Component, HostListener, OnInit } from '@angular/core';
import { ProductService } from "@box/services/e-commerce/product.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/catch';
import { ProductDisplay } from "app/store/cart/cart.reducer";
import { Observable } from "rxjs/Observable";
import { ColorFilter } from '@box/models';
import { TreeNode, SelectItem } from 'primeng/api';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  querySubscribe: Subscription;
  page: number = 0;
  keyword: string;
  canFetch: boolean = false;

  products: ProductDisplay[] = [];
  public items: ProductDisplay[] = [];

  public colorFilters: ColorFilter[] = [];
  public categoriesFilters: any[] = [];

  public dataViewOptions = {
    loading: true,
    layout: 'grid'
  };
  
  sortOptions: SelectItem[];
  sortKey: string;
  sortField: string;
  sortOrder: number;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log('search init')
    this.querySubscribe = this.route.params.subscribe((params: Params) => {
      this.keyword = params['keyword'];
      this.productService.searchProduct(this.page, this.keyword)
        .take(1)
        .catch(error => {
          this.canFetch = false;
          return Observable.throw(error);
        })
        .subscribe(data => {
          console.log('search result',data)
          this.products = data;
          this.page++;
          if (data.length != 0) {
            this.canFetch = true;
          }
        });
    });

    this.sortOptions = [
      { label: 'Price', value: 'price' },
      { label: 'Discount', value: 'discount' },
      { label: 'Name', value: 'name' }
    ];
  }

  // public filterProducts(): ProductDisplay[] {
  //   // console.log(this.categoriesFilters);
  //   return this.items.filter((item: ProductDisplay) => {
  //     const Colors: boolean = this.colorFilters.reduce((prev, curr) => { // Match Color
  //       if (item.colors) {
  //         if (item.colors.includes(curr.color)) {
  //           return prev && true;
  //         }
  //       }
  //     }, true);

  //     const Categories: boolean = this.categoriesFilters.reduce((prev, curr) => { // Match Tags
  //       if (item.categories) {
  //         if (item.categories.includes(curr)) {
  //           return prev && true;
  //         }
  //       }
  //     }, true);

  //     return Colors && Categories;
  //   });
  // }

  // @HostListener('window:scroll', ['$event'])
  // onScroll($event: Event): void {
  //   if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
  //     console.log(this.canFetch);
  //     if (this.canFetch) {
  //       this.productService.searchProduct(this.page, this.keyword)
  //         .take(1)
  //         .catch(error => {
  //           this.canFetch = false;
  //           return Observable.throw(error);
  //         })
  //         .subscribe(data => {
  //           this.products.push(...data);
  //           this.page++;
  //           if (data.length == 0) {
  //             this.canFetch = false;
  //           }
  //         });
  //     }
  //   }
  // }

}
