import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import * as fromApp from "app/store/app.reducers";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { ProductDisplay } from "app/store/cart/cart.reducer";
import { Subscription } from "rxjs/Subscription";
import * as ShowcaseActions from 'app/store/showcase/showcase.actions';
import 'rxjs/add/operator/filter';


@Component({
  selector: 'daily-discover',
  templateUrl: './daily-discover.component.html',
  styleUrls: ['./daily-discover.component.scss']
})
export class DailyDiscoverComponent implements OnInit, OnDestroy {
  @Input() products;
  @Input() searching = false;
  @Input() error = '';

  showcaseState: Observable<{ newlyAdded: ProductDisplay[], mostSelling: ProductDisplay[], interested: ProductDisplay[], dailyDiscover: ProductDisplay[] }>;
  showcaseSubscription: Subscription;
  isFetched: boolean = false;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.showcaseState = this.store.select('showcase');
    this.showcaseSubscription = this.showcaseState
      .filter(data => data.dailyDiscover.length == 0 && !this.isFetched)
      .subscribe(
        data => {
          this.store.dispatch(new ShowcaseActions.FetchDailyDiscover());
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
