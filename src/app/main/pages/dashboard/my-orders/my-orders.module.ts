import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BoxSharedModule } from '@box/shared.module';
import {
    MyOrdersComponent,
    myOrdersRoute,
    OrderDetailsComponent
} from './';

const ENTITY_STATES = [...myOrdersRoute];

@NgModule({
    imports: [
        BoxSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MyOrdersComponent,
        OrderDetailsComponent
    ],
    entryComponents: [
        MyOrdersComponent,
        OrderDetailsComponent
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class MyOrdersModule{}