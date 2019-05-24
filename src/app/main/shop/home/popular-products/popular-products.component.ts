import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { OwlCarousel } from 'ngx-owl-carousel';

import * as fromApp from "app/store/app.reducers";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { ProductDisplay } from "app/store/cart/cart.reducer";
import { Subscription } from "rxjs/Subscription";
import * as ShowcaseActions from 'app/store/showcase/showcase.actions';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'popular-products',
  templateUrl: './popular-products.component.html',
  styleUrls: ['./popular-products.component.scss']
})
export class PopularProductsComponent implements OnInit, OnDestroy {
  // @Input() carousel;
  @Input() searching = false;
  @Input() error = '';

  showcaseState: Observable<{ newlyAdded: ProductDisplay[], mostSelling: ProductDisplay[], interested: ProductDisplay[] }>;
  showcaseSubscription: Subscription;
  isFetched: boolean = false;

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

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.showcaseState = this.store.select('showcase');
    this.showcaseSubscription = this.showcaseState
      .filter(data => data.mostSelling.length == 0 && !this.isFetched)
      .subscribe(
        data => {
          this.store.dispatch(new ShowcaseActions.FetchMostSelling());
          this.isFetched = true;
        }
      );
  }

  ngOnDestroy(): void {
    if (this.showcaseSubscription != null) {
      this.showcaseSubscription.unsubscribe();
    }
  }
}
