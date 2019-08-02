import { AfterContentInit, Component, ViewEncapsulation, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { Subscription } from "rxjs/Subscription";
import { SnackBarService } from '@box/services/snackbar.service';
// import { AddToCartPosition, AddToCartType, CartService, CartItem, BaseCartItem } from 'ng-shopping-cart';

import { select, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';

@Component({
    selector: 'product-box',
    templateUrl: './product-box.component.html',
    styleUrls: ['./product-box.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ProductBoxComponent implements OnInit, OnDestroy {
    @Input() product;
    @Input() mode;

    constructor(
        private snack: SnackBarService,
    ) {

    }

    ngOnInit() {
        // if(this.product){
        //     console.log(this.product)
        // }

    }

    ngOnDestroy() {
    }
}
