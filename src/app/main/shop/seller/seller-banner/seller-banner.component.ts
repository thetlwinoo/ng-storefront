import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'seller-banner',
  templateUrl: './seller-banner.component.html',
  styleUrls: ['./seller-banner.component.scss']
})
export class SellerBannerComponent implements OnInit {
  @Input('carousel') carousel;
  @Input('bannerCategories') bannerCategories;
  @ViewChild('boxcag') boxcag: ElementRef;

  selectedCategory;
  constructor() { }

  ngOnInit() {
  }

  // mouseEnter(event){
  //   this.selectedCategory = event;
  // }

  // mouseLeave(event){
  //   this.selectedCategory = {};
  // }

  public sliderConfig: any = {
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1    
  };
}
