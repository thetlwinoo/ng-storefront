import { Component, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PriceComponent implements OnInit {
  
  // Using Output EventEmitter
  @Output() priceFilters = new EventEmitter();
  min:number = 100;
  max:number = 1000;
  rangeValues: number[] = [100,1000];
  
  constructor() { }
  
  ngOnInit() {  }

  // rangeChanged
  priceChanged(event:any) {
    this.priceFilters.emit(event.values);
    // setInterval(() => {
    //   this.priceFilters.emit(event);
    // }, 1000);
    // this.priceFilters.emit(event);
  }

}
