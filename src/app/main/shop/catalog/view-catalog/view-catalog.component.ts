import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { trigger, transition, style, animate } from "@angular/animations";
import { Product, ColorFilter, KeyValuePair } from '@box/models';
import * as _ from 'lodash';
import * as $ from 'jquery';
import { ViewCatalogService } from './view-catalog.service';
import 'rxjs/add/observable/interval';
import { TreeNode, SelectItem } from 'primeng/api';
import { BoxSidebarService } from '@box/components/sidebar/sidebar.service';
import { KeyValue } from '@angular/common';
import { keyValuesToMap } from '@angular/flex-layout/extended/typings/style/style-transforms';

@Component({
  selector: 'view-catalog',
  templateUrl: './view-catalog.component.html',
  styleUrls: ['./view-catalog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [  // angular animation
    trigger('Animation', [
      transition('* => fadeOut', [
        style({ opacity: 0.1 }),
        animate(1000, style({ opacity: 0.1 }))
      ]),
      transition('* => fadeIn', [
        style({ opacity: 0.1 }),
        animate(1000, style({ opacity: 0.1 }))
      ])
    ])
  ]
})
export class ViewCatalogComponent implements OnInit {
  public products: Product[] = [];
  selectedProduct: Product;
  displayDialog: boolean;
  sortOptions: SelectItem[];
  sortKey: string;
  sortField: string;
  sortOrder: number;

  public dataViewOptions = {
    loading: true,
    layout: 'grid'
  };

  masterCategories: TreeNode[];
  productCategories: any[];
  filteredCategories: any[];
  categories: any[];

  selectedFiles: TreeNode[];
  public categoriesFilters: any[] = [];
  public items: Product[] = [];
  // public allItems: Product[] = [];
  public colorFilters: ColorFilter[] = [];
  public tagsFilters: any[] = [];
  public tags: any[] = [];
  public colors: any[] = [];
  public price: any;
  public priceFilters: any = {};
  // public sortByOrder: string = '';   // sorting
  public animation: any;   // Animation

  // lastKey = 0;      // key to offset next query from
  // finished = false;  // boolean when end of data is reached

  constructor(
    private viewCatalogService: ViewCatalogService,
    private boxSidebarService: BoxSidebarService,
  ) {
    this.products = this.viewCatalogService.products;
    // this.allItems = this.viewCatalogService.products;
    // this.products = this.viewCatalogService.products.slice(0, 10);
    this.items = this.products;
    this.tags = this.viewCatalogService.tags;
    this.colors = this.viewCatalogService.colors;
    this.masterCategories = this.viewCatalogService.masterCategories;
    this.productCategories = this.viewCatalogService.productCategories;
    this.filteredCategories = this.viewCatalogService.filteredCategories;
    this.price = this.viewCatalogService.price;
  }

  ngOnInit() {
    this.sortOptions = [
      { label: 'Price', value: 'price' },
      { label: 'Discount', value: 'discount' },
      { label: 'Name', value: 'name' }
    ];
  }

  selectProduct(product: Product) {
    this.selectedProduct = product;
    this.displayDialog = true;
    // event.preventDefault();
  }

  onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  onDialogHide() {
    this.selectedProduct = null;
  }

  onQuickView(event) {
    this.selectProduct(event);
  }

  updateCategories(categories: any[]) {
    const _filter = Array();
    categories.map((item, index) => {
      if (item.type == "SubCategory") {
        _filter.push(item.label);
      }
    });
    this.categoriesFilters = _filter;
  }

  updateCondition(condition: any[]) {
    console.log(condition);
  }

  public filterProducts(): Product[] {
    // console.log(this.categoriesFilters);
    return this.items.filter((item: Product) => {
      const Colors: boolean = this.colorFilters.reduce((prev, curr) => { // Match Color
        if (item.colors) {
          if (item.colors.includes(curr.color)) {
            return prev && true;
          }
        }
      }, true);

      const Categories: boolean = this.categoriesFilters.reduce((prev, curr) => { // Match Tags
        if (item.categories) {
          if (item.categories.includes(curr)) {
            return prev && true;
          }
        }
      }, true);

      return Colors && Categories;
    });
  }


  // Animation Effect fadeIn
  public fadeIn() {
    this.animation = 'fadeIn';
  }

  // Animation Effect fadeOut
  public fadeOut() {
    this.animation = 'fadeOut';
  }

  // // Initialize filetr Items
  // public filterItems(): Product[] {
  //   return this.items.filter((item: Product) => {
  //     const Colors: boolean = this.colorFilters.reduce((prev, curr) => { // Match Color
  //       if (item.colors) {
  //         if (item.colors.includes(curr.color)) {
  //           return prev && true;
  //         }
  //       }
  //     }, true);
  //     const Tags: boolean = this.tagsFilters.reduce((prev, curr) => { // Match Tags
  //       if (item.tags) {
  //         if (item.tags.includes(curr)) {
  //           return prev && true;
  //         }
  //       }
  //     }, true);
  //     return Colors && Tags; // return true
  //   });
  // }

  // Update tags filter
  public updateTagFilters(tags: any[]) {
    this.tagsFilters = tags;
    this.animation == 'fadeOut' ? this.fadeIn() : this.fadeOut(); // animation
  }

  // Update color filter
  public updateColorFilters(colors: ColorFilter[]) {
    this.colorFilters = colors;
    this.animation == 'fadeOut' ? this.fadeIn() : this.fadeOut(); // animation
  }

  // Update price filter
  public updatePriceFilters(price: any) {    
    let items: any[] = [];
    this.products.filter((item: Product) => {
      if (item.salePrice >= price[0] && item.salePrice <= price[1]) {
        items.push(item); // push in array
      }
    });
    this.items = items;
  }

  // // Infinite scroll
  // public onLoad() {    
  //   this.lastKey = _.last(this.allItems)['id'];
  //   if (this.lastKey != _.last(this.items)['id']) {
  //     this.finished = false;
  //   }
  //   // If data is identical, stop making queries
  //   if (this.lastKey == _.last(this.items)['id']) {
  //     this.finished = true;
  //   }

  //   if (this.products.length < this.allItems.length) {
  //     let len = this.products.length;
  //     for (var i = len; i < len + 10; i++) {
  //       if (this.allItems[i] == undefined) return true;
  //       this.products.push(this.allItems[i]);        
  //     }
  //   }
  // }

  // public onChangeSorting(val) {
  //   this.sortByOrder = val;
  //   this.animation == 'fadeOut' ? this.fadeIn() : this.fadeOut(); // animation
  // }
  toggleSidebar(name): void {
    this.boxSidebarService.getSidebar(name).toggleOpen();
  }
}
