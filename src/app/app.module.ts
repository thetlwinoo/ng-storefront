import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule, MatIconModule, MatSnackBarModule } from '@angular/material';
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

const appRoutes: Routes = [
    {
        path: 'shop',
        loadChildren: './main/shop/shop.module#ShopModule'
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
        BoxModule.forRoot(boxConfig),
        BoxProgressBarModule,
        BoxSharedModule,
        BoxSidebarModule,
        BoxThemeOptionsModule,

        LayoutModule
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
