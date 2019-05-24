import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from '@box/services/e-commerce/product.service';
import { Observable } from "rxjs/Observable";
import { Router } from "@angular/router";

@Component({
  selector: 'box-search',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
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

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  filterKeywords(event) {
    let query = event.query;
    this.queryText = query;
    console.log('query', query);
    this.productService.searchProduct(this.page, query)
      .take(1)
      .catch(error => {
        // this.canFetch = false;
        return Observable.throw(error);
      })
      .subscribe(data => {
        this.filteredKeywords = data;
        // this.page++;
        // if (data.length != 0) {
        //   this.canFetch = true;
        // }
        console.log(this.filteredKeywords)
      });
    // this.countryService.getCountries().then(countries => {
    //     this.filteredCountriesSingle = this.filterCountry(query, countries);
    // });
  }

  searchProduct(search: string) {
    if (search.trim().length === 0) {
      return;
    }
    let url = '/search/' + search;
    console.log(url)
    this.router.navigate([url]);
  }

  onClickSearch(event) {    
    this.searchProduct(this.keyword.productName ? this.keyword.productName : this.keyword);
  }

  onKeySearch(event) {
    console.log(event)
    if (event.isTrusted && event.key == "Enter") {      
      this.searchProduct(this.keyword.productName ? this.keyword.productName : this.keyword);
    }
  }
  // onFocus(event) {
  //   this.onfocus = true;
  // }

  // onFocusOut(event) {
  //   setTimeout(() => {
  //     this.onfocus = false;
  //   }, 150);

  // }

  // onClick(event, keyword) {
  //   event.preventDefault();
  //   const search = this.boxsearch.nativeElement;
  //   search.value = keyword;
  // }


}
