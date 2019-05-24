import { Component, OnDestroy, OnInit, ViewEncapsulation, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Router, NavigationEnd, ActivatedRouteSnapshot, CanActivate, NavigationExtras } from '@angular/router';
// import { select, Store } from '@ngrx/store';
// import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
// import * as KeywordActions from '@store/keywords/actions/keyword.actions';
// import * as fromKeywords from '@store/keywords/reducers';
import { BoxConfigService } from '@box/services/config.service';
import { boxAnimations } from '@box/animations';
import { HeaderService } from './header.service';

import { AccountService } from '@box/services/core';
import { Store } from "@ngrx/store";
import * as fromApp from "app/store/app.reducers";
import * as CartActions from 'app/store/cart/cart.actions';
// import { AddToCartPosition, AddToCartType, CartService, CartItem, BaseCartItem, LocaleFormat, parseLocaleFormat } from 'ng-shopping-cart';
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { Cart } from "app/store/cart/cart.reducer";
import { HttpError } from "app/store/app.reducers";
@Component({
    selector: 'header',
    // changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    animations: boxAnimations
    // encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit, OnDestroy {
    boxConfig: any;
    currentUrl: any;
    defaultKeywords: any;

    searchQuery$: Observable<string>;
    keywords$: Observable<String[]>;
    loading$: Observable<boolean>;
    error$: Observable<string>;

    private _unsubscribeAll: Subject<any>;

    cartState: Observable<{ cart: Cart, errors: HttpError[], loading: boolean }>;
    cartItemCountSubscription: Subscription;
    cartItemCount: number = 0;

    // format: LocaleFormat;
    empty = true;
    // items: CartItem[];
    taxRate = 0;
    tax = 0;
    shipping = 0;
    cost = 0;
    totalCount = 0;
    private _serviceSubscription: any;

    constructor(
        // private store: Store<fromKeywords.State>,
        private _headerService: HeaderService,
        private _router: Router,
        private _boxConfigService: BoxConfigService,
        private store: Store<fromApp.AppState>,
        private accountService: AccountService,
        // private cartService: CartService<any>
    ) {

        // this.searchQuery$ = store.pipe(
        //     select(fromKeywords.getSearchQuery),
        //     take(1)
        // );

        // this.keywords$ = store.pipe(select(fromKeywords.getSearchResults));
        // this.loading$ = store.pipe(select(fromKeywords.getSearchLoading));
        // this.error$ = store.pipe(select(fromKeywords.getSearchError));

        this._unsubscribeAll = new Subject();

        this._router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.currentUrl = event.url;
            }
        });

        this._headerService.getDefaultKeywords({ $limit: 20 }).then(keywords => this.defaultKeywords = keywords);

        // this.update();
        // this._serviceSubscription = this.cartService.onChange.subscribe(() => {
        //     this.update();
        // });
    }

    ngOnInit() {
        this._boxConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {
                this.boxConfig = config;
            });

        this.cartState = this.store.select('cart');

        this.accountService.getAuthenticationState().subscribe(auth => {
            if (auth) {
                console.log(auth)
                this.store.dispatch(new CartActions.FetchCart());                
                this.cartItemCountSubscription = this.cartState.subscribe(data => {
                    console.log('cart data', data)
                    let totalCount = 0;
                    for (let i = 0; i < data.cart.cartItemLists.length; i++) {
                        totalCount += data.cart.cartItemLists[i].amount;
                    }
                    this.cartItemCount = totalCount;
                    console.log('cart total count', totalCount);
                });
            }
            else {
                this.cartItemCount = 0;
                if (this.cartItemCountSubscription != null) {
                    this.cartItemCountSubscription.unsubscribe();
                }
            }
        })
    }

    // search(query: string) {
    //     this.store.dispatch(new KeywordActions.Search(query));
    // }

    onSummit(event) {
        let navigationExtras: NavigationExtras = {
            queryParams: { 'search': event },
            fragment: 'anchor'
        };

        this._router.navigate(['/pages/shop'], navigationExtras);
    }

    isAuthenticated() {
        return this.accountService.isAuthenticated();
    }

    ngOnDestroy(): void {
        this._serviceSubscription.unsubscribe();
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();

        if (this.cartItemCountSubscription != null) {
            this.cartItemCountSubscription.unsubscribe();
        }
    }

    // increase(item: CartItem) {
    //     item.setQuantity(item.getQuantity() + 1);
    //     this.cartService.addItem(item);
    // }

    // decrease(item: CartItem) {
    //     if (item.getQuantity() > 1) {
    //         item.setQuantity(item.getQuantity() - 1);
    //         this.cartService.addItem(item);
    //     } else {
    //         this.cartService.removeItem(item.getId());
    //     }
    // }

    // remove(event, item: CartItem) {
    // event.preventDefault();
    // event.stopPropagation();
    // this.cartService.removeItem(item.getId());
    // return false;
    // }

    // update() {
    // this.empty = this.cartService.isEmpty();
    // this.items = this.cartService.getItems();
    // this.taxRate = this.cartService.getTaxRate() / 100;
    // this.tax = this.cartService.getTax();
    // this.shipping = this.cartService.getShipping();
    // this.cost = this.cartService.totalCost();
    // this.format = <LocaleFormat>this.cartService.getLocaleFormat(true);
    // this.totalCount = this.cartService.itemCount();
    // }

    onCart(event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    }

    ngOnChanges(changes: SimpleChanges): void {
        // if (changes['localeFormat']) {
        //     this.format = <LocaleFormat>this.cartService.getLocaleFormat(true);
        // }
    }
}
