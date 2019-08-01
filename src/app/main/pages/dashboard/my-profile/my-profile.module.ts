import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BoxSharedModule } from '@box/shared.module';
import {
    MyProfileComponent,
    myProfileRoute
} from './';

const ENTITY_STATES = [...myProfileRoute];

@NgModule({
    imports: [
        BoxSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MyProfileComponent
    ],
    entryComponents: [
        MyProfileComponent
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class MyProfileModule{}