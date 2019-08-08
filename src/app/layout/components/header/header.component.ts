import { Component, OnDestroy, OnInit, ViewEncapsulation, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Router, NavigationEnd, ActivatedRouteSnapshot, CanActivate, NavigationExtras } from '@angular/router';
import { take } from 'rxjs/operators';
import { BoxConfigService } from '@box/services/config.service';
import { boxAnimations } from '@box/animations';
import { HeaderService } from './header.service';

import { AccountService } from '@box/services/core';
import { Store } from "@ngrx/store";
import * as fromApp from "app/store/app.reducers";
import * as CartActions from 'app/store/cart/cart.actions';
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
    empty = true;
    taxRate = 0;
    tax = 0;
    shipping = 0;
    cost = 0;
    totalCount = 0;
    private subscriptions: Subscription[] = [];

    constructor(
        private _headerService: HeaderService,
        private _router: Router,
        private _boxConfigService: BoxConfigService,
        private store: Store<fromApp.AppState>,
        private accountService: AccountService
    ) {
        this._unsubscribeAll = new Subject();

        const routerSubscription = this._router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.currentUrl = event.url;
            }
        });
        this.subscriptions.push(routerSubscription);
        this._headerService.getDefaultKeywords({ $limit: 20 }).then(keywords => this.defaultKeywords = keywords);
    }

    ngOnInit() {
        const configSubscription = this._boxConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {
                this.boxConfig = config;
            });
        this.subscriptions.push(configSubscription);
        this.cartState = this.store.select('cart');

        const accountSubscription = this.accountService.getAuthenticationState().subscribe(auth => {
            if (auth) {
                // console.log('AUTH ', auth);
                this.store.dispatch(new CartActions.FetchCart());
                const cartSubscription = this.cartState.subscribe(data => {
                    // console.log('cart data', data)

                    if (data.cart.cartItemLists) {
                        let totalCount = 0;
                        for (let i = 0; i < data.cart.cartItemLists.length; i++) {
                            totalCount += data.cart.cartItemLists[i].quantity;
                        }
                        this.cartItemCount = totalCount;
                        // console.log('cart total count', totalCount);
                    }
                });
                this.subscriptions.push(cartSubscription);
            }
            else {
                this.cartItemCount = 0;
                if (this.cartItemCountSubscription != null) {
                    this.cartItemCountSubscription.unsubscribe();
                }
            }
        });
        this.subscriptions.push(accountSubscription);
    }

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
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();

        this.subscriptions.forEach(el => {
            if (el) el.unsubscribe();
        });
    }

    onCart(event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    }
}
