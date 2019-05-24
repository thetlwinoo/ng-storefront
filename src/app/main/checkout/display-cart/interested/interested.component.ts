import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import { ProductDisplay, Product } from "app/store/cart/cart.reducer";
import * as ShowcaseActions from "app/store/showcase/showcase.actions";
import { Subscription } from "rxjs/Subscription";
import * as fromApp from "app/store/app.reducers";
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-interested',
  templateUrl: './interested.component.html',
  styleUrls: ['./interested.component.scss']
})
export class InterestedComponent implements OnInit, OnDestroy {
  showcaseState: Observable<{ newlyAdded: ProductDisplay[], mostSelling: ProductDisplay[], interested: ProductDisplay[] }>;
  showcaseSubscription: Subscription;
  interestedProduct;
  isFetched: boolean = false;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.showcaseState = this.store.select('showcase');
    this.showcaseSubscription = this.showcaseState.filter(data => data.interested.length == 0 && !this.isFetched)
      .subscribe(data => {
        this.store.dispatch(new ShowcaseActions.FetchInterested());        
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
