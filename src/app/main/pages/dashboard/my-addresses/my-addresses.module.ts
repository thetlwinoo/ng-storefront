import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BoxSharedModule } from '@box/shared.module';

import {
    MyAddressesComponent,
    AddressesUpdateComponent,
    AddressComponent,
    addressesRoute
} from './';

const ENTITY_STATES = [...addressesRoute];

@NgModule({
    imports: [
        BoxSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MyAddressesComponent,
        AddressComponent,
        AddressesUpdateComponent        
    ],
    entryComponents: [MyAddressesComponent, AddressesUpdateComponent],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class MyAddressesModule { }