import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import * as fromApp from 'app/store/app.reducers';
import { HttpError } from 'app/store/app.reducers';
import { Compares } from '@box/models';
import * as CompareActions from 'app/store/compare/compare.actions';
import * as CartActions from "app/store/cart/cart.actions";

@Component({
  selector: 'app-my-compare',
  templateUrl: './my-compare.component.html',
  styleUrls: ['./my-compare.component.scss']
})
export class MyCompareComponent implements OnInit {
  compareState: Observable<{ compares: Compares, errors: HttpError[], loading: boolean }>;
  constructor(
    private store: Store<fromApp.AppState>,
  ) { }

  ngOnInit() {
    this.compareState = this.store.select('compare');
    this.store.dispatch(new CompareActions.FetchCompare());
  }

  removeFromCompare(productId: number) {
    this.store.dispatch(new CompareActions.RemoveFromCompare(productId));
  }

  addToCart(productId: number) {
    this.store.dispatch(new CartActions.AddToCart({ id: productId, quantity: 1 }));
  }
}
