import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BoxSharedModule } from '@box/shared.module';
import {
    MyWishlistComponent,
    myWishlistRoute
} from './';

const ENTITY_STATES = [...myWishlistRoute];

@NgModule({
    imports: [
        BoxSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MyWishlistComponent
    ],
    entryComponents: [
        MyWishlistComponent
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class MyWishlistModule { }