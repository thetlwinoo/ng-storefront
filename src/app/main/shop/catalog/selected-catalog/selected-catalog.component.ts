import { Component, OnInit } from '@angular/core';
import { SelectedCatalogService } from './selected-catalog.service';
import { Product } from '@box/models';

@Component({
  selector: 'app-selected-catalog',
  templateUrl: './selected-catalog.component.html',
  styleUrls: ['./selected-catalog.component.scss']
})
export class SelectedCatalogComponent implements OnInit {
  images: any;
  product: Product;
  products: Product[];
  public counter: number = 1;
  constructor(
    private selectedCatalogService: SelectedCatalogService
  ) {
    this.images = this.selectedCatalogService.images;
    this.product = this.selectedCatalogService.product;
    this.products = this.selectedCatalogService.products;
  }

  ngOnInit() {
  }

  public increment() {
    this.counter += 1;
  }

  public decrement() {
    if (this.counter > 1) {
      this.counter -= 1;
    }
  }
}
