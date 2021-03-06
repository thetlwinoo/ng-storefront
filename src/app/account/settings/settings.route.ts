import { Route } from '@angular/router';

import { UserRouteAccessService } from '@box/services/core/auth/user-route-access.service';
import { SettingsComponent } from './settings.component';

export const settingsRoute: Route = {
    path: 'settings',
    component: SettingsComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'global.menu.account.settings'
    },
    canActivate: [UserRouteAccessService]
};
