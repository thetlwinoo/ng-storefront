import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { BoxModule } from '@box/box.module';
import { BoxSharedModule } from '@box/shared.module';
import { BoxProgressBarModule, BoxSidebarModule, BoxThemeOptionsModule } from '@box/components';
import { ToastrModule } from 'ngx-toastr';
import { ShoppingCartModule } from 'ng-shopping-cart';

import { boxConfig } from 'app/box-config';

import { FakeDbService } from 'app/fake-db/fake-db.service';
import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';

import { HTTP_INTERCEPTORS } from "@angular/common/http";

//Store Module
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from "@ngrx/effects";

import { reducers } from "./store/app.reducers";
import { CartEffects } from "./store/cart/cart.effects";
import { OrderEffects } from "./store/order/order.effects";
import { AuthEffects } from "./store/auth/auth.effects";
import { ShowcaseEffects } from "./store/showcase/showcase.effects";
import { BrowseEffects } from "./store/browse/browse.effects";
import { PeopleEffects } from "./store/people/people.effects";
import { PaymentEffects } from "./store/payment/payment.effects";
import { PhotoEffects } from "./store/photo/photo.effects";
import { WishlistEffects } from "./store/wishlist/wishlist.effects";
import { CompareEffects } from "./store/compare/compare.effects";
import { AddressesEffects } from "./store/adresses/addresses.effects";

import { ProductService } from "@box/services/e-commerce/product.service";
import { CartService } from "@box/services/e-commerce/cart.service";
import { OrderService } from "app/store/order/order.service";
import { PeopleService } from "@box/services/e-commerce/people.service";
import { TokenService } from "@box/services/e-commerce/token.service";
import { PaypalService } from "app/store/payment/paypal.service";
import { CreditCardService } from "app/store/payment/credit-card.service";
import { AuthGuardService } from "@box/services/e-commerce/auth-guard.service";
import { NonAuthGuardService } from "@box/services/e-commerce/non-auth-guard.service";
import { AccountService } from "@box/services/e-commerce/account.service";
import { ProductPhotoService } from '@box/services/e-commerce/product-photo.service';
import { WishlistService } from '@box/services/e-commerce/wishlist.service';
import { CompareService } from '@box/services/e-commerce/compare.service';
import { TokenInterceptor } from "@box/services/e-commerce/token.interceptor";

import { AuthInterceptor } from '@box/blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from '@box/blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from '@box/blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from '@box/blocks/interceptor/notification.interceptor';

import { Ng2Webstorage } from 'ngx-webstorage';
// import { ResourceAccountModule } from './account/account.module';

const appRoutes: Routes = [
    {
        path: 'home',
        loadChildren: './main/home/home.module#HomeModule'
    },
    {
        path: 'products',
        loadChildren: './main/products/products.module#ProductsModule'
    },
    {
        path: 'pages',
        loadChildren: './main/pages/pages.module#PagesModule'
    },
    {
        path: 'auth',
        loadChildren: './main/auth/auth.module#AuthModule'
    },
    {
        path: 'checkout',
        loadChildren: './main/checkout/checkout.module#CheckoutModule'
    },
    {
        path: 'search',
        loadChildren: './main/search/search.module#SearchModule'
    },
    {
        path: 'account',
        loadChildren: './account/account.module#ResourceAccountModule'
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),
        BrowserModule,
        // ResourceAccountModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        TranslateModule.forRoot(),

        InMemoryWebApiModule.forRoot(FakeDbService, {
            delay: 0,
            passThruUnknownUrl: true
        }),
        ToastrModule.forRoot({
            timeOut: 2000,
            progressBar: false,
            enableHtml: true,
        }),
        ShoppingCartModule.forRoot({
            serviceType: 'localStorage',
            serviceOptions: {
                storageKey: 'BieeBoxCart',
                clearOnError: true
            }
        }),
        MatMomentDateModule,
        BoxModule.forRoot(boxConfig),
        BoxProgressBarModule,
        BoxSharedModule,
        BoxSidebarModule,
        BoxThemeOptionsModule,

        LayoutModule,

        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([
            CartEffects,
            OrderEffects,
            AuthEffects,
            ShowcaseEffects,
            BrowseEffects,
            PeopleEffects,
            AddressesEffects,
            PaymentEffects,
            PhotoEffects,
            WishlistEffects,
            CompareEffects
        ]),
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        ProductService,
        CartService,
        OrderService,
        TokenService,
        AuthGuardService,
        NonAuthGuardService,
        AccountService,
        PeopleService,
        PaypalService,
        CreditCardService,
        ProductPhotoService,
        WishlistService,        
        CompareService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true
        }
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: TokenInterceptor,
        //     multi: true
        // }
    ]
})
export class AppModule {
}
