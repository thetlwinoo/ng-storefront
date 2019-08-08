import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ProductService } from '@box/services/e-commerce/product.service';
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: 'box-search',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  @Input() url: String;
  @Input() query = '';
  @Input() searching = false;
  @Input() error = '';
  @Input() keywords: any;
  @Input() defaultKeywords: any;
  @Input() boxConfig: any;
  @Output() search = new EventEmitter<string>();
  @Output() summit = new EventEmitter<any>();
  @ViewChild('boxsearch') boxsearch: ElementRef;

  onfocus: boolean = false;

  filteredKeywords: any[] = [];
  keyword: any;
  queryText: string;
  page: number = 0;
  private subscriptions: Subscription[] = [];

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  filterKeywords(event) {
    this.queryText = event.query;
    const searchSubscription = this.productService.searchProduct(this.page, event.query)
      .take(1)
      .catch(error => {
        return Observable.throw(error);
      })
      .subscribe(data => {
        this.filteredKeywords = data;
      });
    this.subscriptions.push(searchSubscription);
  }

  searchProduct(search: string) {
    if (search.trim().length === 0) {
      return;
    }
    let url = '/search/' + search;
    this.router.navigate([url]);
  }

  onClickSearch(event) {
    this.searchProduct(this.keyword.productName ? this.keyword.productName : this.keyword);
  }

  onKeySearch(event) {
    if (event.isTrusted && event.key == "Enter") {
      this.searchProduct(this.keyword.productName ? this.keyword.productName : this.keyword);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(el => {
      if (el) el.unsubscribe();
    });
  }
}
