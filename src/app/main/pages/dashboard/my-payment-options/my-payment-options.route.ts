import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from '@box/services/core/auth/user-route-access.service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MyPaymentOptionsComponent } from './my-payment-options.component';

@Injectable({ providedIn: 'root' })
export class MyPaymentOptionsResolve {
    constructor() { }
}

export const myPaymentOptionsRoute: Routes = [
    {
        path: '',
        component: MyPaymentOptionsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'My Payment Options'
        },
        canActivate: [UserRouteAccessService]
    }
];
