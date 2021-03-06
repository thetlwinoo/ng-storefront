import { Route } from '@angular/router';

import { RegisterComponent } from './register.component';
import { BreadcrumbInitializedGuard } from '@box/services/breadcrumb-initialized-guard.service';

export const registerRoute: Route = {
    path: 'register',
    component: RegisterComponent,
    data: {
        authorities: [],
        pageTitle: 'register.title',
        crumbs: [{
            label: 'register'
        }]
    },
    canActivate: [BreadcrumbInitializedGuard],
};
