import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { trigger, transition, style, animate } from "@angular/animations";
import { Product, ColorFilter } from '@box/models';
import * as _ from 'lodash'
import * as $ from 'jquery';
import { ViewCatalogService } from './view-catalog.service';
import 'rxjs/add/observable/interval';

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
  public items: Product[] = [];
  public allItems: Product[] = [];
  public colorFilters: ColorFilter[] = [];
  public tagsFilters: any[] = [];
  public tags: any[] = [];
  public colors: any[] = [];
  public sortByOrder: string = '';   // sorting
  public animation: any;   // Animation

  lastKey = ''      // key to offset next query from
  finished = false  // boolean when end of data is reached

  constructor(private viewCatalogService: ViewCatalogService) {
    this.allItems = this.viewCatalogService.products;
    this.products = this.viewCatalogService.products.slice(0, 8);
    this.items = this.products;
    this.tags = this.viewCatalogService.tags;
    this.colors = this.viewCatalogService.colors;
  }

  ngOnInit() {
  }

  // Animation Effect fadeIn
  public fadeIn() {
    this.animation = 'fadeIn';
  }

  // Animation Effect fadeOut
  public fadeOut() {
    this.animation = 'fadeOut';
  }

  // Initialize filetr Items
  public filterItems(): Product[] {
    return this.items.filter((item: Product) => {
      const Colors: boolean = this.colorFilters.reduce((prev, curr) => { // Match Color
        if (item.colors) {
          if (item.colors.includes(curr.color)) {
            return prev && true;
          }
        }
      }, true);
      const Tags: boolean = this.tagsFilters.reduce((prev, curr) => { // Match Tags
        if (item.tags) {
          if (item.tags.includes(curr)) {
            return prev && true;
          }
        }
      }, true);
      return Colors && Tags; // return true
    });
  }

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
      if (item.price >= price[0] && item.price <= price[1]) {
        items.push(item); // push in array
      }
    });
    this.items = items;    
  }

  public onChangeSorting(val) {
    this.sortByOrder = val;
    this.animation == 'fadeOut' ? this.fadeIn() : this.fadeOut(); // animation
  }
}
