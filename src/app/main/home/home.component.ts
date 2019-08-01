import { Component, OnInit } from '@angular/core';
import { BoxTranslationLoaderService } from '@box/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';

import { carousel } from '@box/config/carousel';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  bannerCategories: any;
  carousel: any;
  categories: any;
  products: any;
  brands: any;

  constructor(
    private _boxTranslationLoaderService: BoxTranslationLoaderService,
    private _homeService: HomeService
  ) {
    this.carousel = carousel;
    this._boxTranslationLoaderService.loadTranslations(english, turkish);

    this.bannerCategories = this._homeService.bannerCategories;
    this.categories = this._homeService.categories;
    this.products = this._homeService.products;
    this.brands = this._homeService.brands;
  }

  ngOnInit() {
  }

}
