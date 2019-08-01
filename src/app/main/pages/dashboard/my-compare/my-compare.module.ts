import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BoxSharedModule } from '@box/shared.module';
import {
    MyCompareComponent,
    myCompareRoute
} from './';

const ENTITY_STATES = [...myCompareRoute];

@NgModule({
    imports: [
        BoxSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MyCompareComponent
    ],
    entryComponents: [
        MyCompareComponent
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class MyCompareModule{}