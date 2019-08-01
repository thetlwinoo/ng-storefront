import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { OwlCarousel } from 'ngx-owl-carousel';

@Component({
  selector: 'product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit {
  @Input() carousel;
  @Input() categories;
  @ViewChild('owlProductCategory') owlElement: OwlCarousel;

  bundles: any[] = [];
  
  constructor() {
  }

  ngOnInit() {    
    // console.log('carousel',this.carousel.category.options);
  while(this.categories.length) this.bundles.push(this.categories.splice(0,2));
  }

  onPrevClick(event) {
    this.owlElement.trigger('prev.owl.carousel');
  }

  onNextClick(event) {
    this.owlElement.trigger('next.owl.carousel');
  }
}
