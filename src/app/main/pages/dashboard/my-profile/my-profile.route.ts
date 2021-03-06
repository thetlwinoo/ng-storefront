import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from '@box/services/core/auth/user-route-access.service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MyProfileComponent } from './my-profile.component';

@Injectable({ providedIn: 'root' })
export class MyProfileResolve {
    constructor() { }
}

export const myProfileRoute: Routes = [
    {
        path: '',
        component: MyProfileComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'My Profile'
        },
        canActivate: [UserRouteAccessService]
    }
];
