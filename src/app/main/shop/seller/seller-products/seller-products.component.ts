import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'seller-products',
  templateUrl: './seller-products.component.html',
  styleUrls: ['./seller-products.component.scss']
})
export class SellerProductsComponent implements OnInit {  
  @Input() products;
  @Input() searching = false;
  @Input() error = '';

  constructor() {}

  ngOnInit() {
  }

}
