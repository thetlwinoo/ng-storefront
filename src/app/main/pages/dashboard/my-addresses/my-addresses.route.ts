import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from '@box/services/core/auth/user-route-access.service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Addresses,IAddresses } from '@box/models';
import { AddressesService } from 'app/store/adresses/addresses.service';
import { MyAddressesComponent } from './my-addresses.component';
import { AddressesUpdateComponent } from './addresses-update/addresses-update.component';

@Injectable({ providedIn: 'root' })
export class MyAddressesResolve implements Resolve<Addresses> {
    constructor(private service: AddressesService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Addresses> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Addresses>) => response.ok),
                map((addresses: HttpResponse<Addresses>) => addresses.body)
            );
        }
        return of(new Addresses());
    }
}

export const addressesRoute: Routes = [
    {
        path: '',
        component: MyAddressesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'My Addresses'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: AddressesUpdateComponent,
        resolve: {
            addresses: MyAddressesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Create new address'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: AddressesUpdateComponent,
        resolve: {
            addresses: MyAddressesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Edit my address'
        },
        canActivate: [UserRouteAccessService]
    }
];
