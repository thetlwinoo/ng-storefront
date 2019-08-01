import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import * as fromApp from 'app/store/app.reducers';
import { HttpError } from 'app/store/app.reducers';
import { Wishlists } from '@box/models';
import * as WishlistActions from 'app/store/wishlist/wishlist.actions';
import * as CartActions from "app/store/cart/cart.actions";

@Component({
  selector: 'app-my-wishlist',
  templateUrl: './my-wishlist.component.html',
  styleUrls: ['./my-wishlist.component.scss']
})
export class MyWishlistComponent implements OnInit {
  wishlistState: Observable<{ wishlists: Wishlists, errors: HttpError[], loading: boolean }>;
  constructor(
    private store: Store<fromApp.AppState>,
  ) { }

  ngOnInit() {
    this.wishlistState = this.store.select('wishlist');
    this.store.dispatch(new WishlistActions.FetchWishlist());
  }

  removeFromWishlist(id) {
    this.store.dispatch(new WishlistActions.RemoveFromWishlist(id));
  }

  addToCart(productId: number) {
    this.store.dispatch(new CartActions.AddToCart({ id: productId, quantity: 1 }));
  }
}
