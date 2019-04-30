import { Component, OnInit, Output, EventEmitter, ViewEncapsulation, Input } from '@angular/core';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PriceComponent implements OnInit {
  @Input() price;
  // Using Output EventEmitter
  @Output() priceFilters = new EventEmitter();
  rangeValues: number[] = [100, 1000];

  constructor() { }

  ngOnInit() {
    if (this.price) {
      this.rangeValues = [this.price.minPrice, this.price.maxPrice];
    }
  }

  // rangeChanged
  priceChanged(event: any) {
    this.priceFilters.emit(event.values);
    // setInterval(() => {
    //   this.priceFilters.emit(event);
    // }, 1000);
    // this.priceFilters.emit(event);
  }

}
