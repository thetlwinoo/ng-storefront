import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BreadcrumbService } from './breadcrumb.service';

@Injectable()
export class BreadcrumbInitializedGuard implements CanActivate {
    routeParams = '';
    constructor(private service: BreadcrumbService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const crumbs = route.data['crumbs'];
        console.log('Crumbs',crumbs)
        // this.routeParams = route.params.category || route.params.id || undefined;
        // console.log(crumbs,this.routeParams);
        // if (this.routeParams) {
        //     crumbs.push({
        //         label: this.routeParams
        //     })
        // }        
        this.service.setCrumbs(crumbs);
        return true;
    }
}