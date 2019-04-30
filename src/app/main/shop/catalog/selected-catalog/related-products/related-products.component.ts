import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { OwlCarousel } from 'ngx-owl-carousel';

@Component({
  selector: 'related-products',
  templateUrl: './related-products.component.html',
  styleUrls: ['./related-products.component.scss']
})
export class RelatedProductsComponent implements OnInit {
  @Input() products;
  @Input() carousel;
  @Input() searching = false;
  @Input() error = '';

  constructor() { }

  ngOnInit() {
  }

  public productSlideConfig: any = {
    infinite: true,
    speed: 300,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    arrows: false,
    prevArrow: '.prev',
    nextArrow: '.next',
    responsive: [{
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    },
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    },
    {
      breakpoint: 420,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    }
    ]
  };
}
