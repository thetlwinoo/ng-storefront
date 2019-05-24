import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule, MatIconModule, MatSnackBarModule, MatProgressBarModule } from '@angular/material';
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

import { ProductService } from "@box/services/e-commerce/product.service";
import { CartService } from "@box/services/e-commerce/cart.service";
import { OrderService } from "@box/services/e-commerce/order.service";
import { TokenService } from "@box/services/e-commerce/token.service";
import { AuthGuardService } from "@box/services/e-commerce/auth-guard.service";
import { NonAuthGuardService } from "@box/services/e-commerce/non-auth-guard.service";
import { AccountService } from "@box/services/e-commerce/account.service";

import { TokenInterceptor } from "@box/services/e-commerce/token.interceptor";

import { AuthInterceptor } from '@box/blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from '@box/blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from '@box/blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from '@box/blocks/interceptor/notification.interceptor';

import { Ng2Webstorage } from 'ngx-webstorage';

const appRoutes: Routes = [
    {
        path: 'shop',
        loadChildren: './main/shop/shop.module#ShopModule'
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
        path: '**',
        redirectTo: 'shop/home'
    }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),
        BrowserModule,
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
        MatButtonModule,
        MatIconModule,
        MatSnackBarModule,
        MatProgressBarModule,
        BoxModule.forRoot(boxConfig),
        BoxProgressBarModule,
        BoxSharedModule,
        BoxSidebarModule,
        BoxThemeOptionsModule,

        LayoutModule,

        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([CartEffects, OrderEffects, AuthEffects, ShowcaseEffects, BrowseEffects]),
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        ProductService, CartService, OrderService, TokenService, AuthGuardService, NonAuthGuardService, AccountService,
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
