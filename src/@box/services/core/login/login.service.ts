import { Injectable } from '@angular/core';

import { AccountService } from '@box/services/core/auth/account.service';
import { AuthServerProvider } from '@box/services/core/auth/auth-jwt.service';
import { JhiTrackerService } from '@box/services/core/tracker/tracker.service';

@Injectable({ providedIn: 'root' })
export class LoginService {
    constructor(
        private accountService: AccountService,
        private trackerService: JhiTrackerService,
        private authServerProvider: AuthServerProvider
    ) {}

    login(credentials, callback?) {
        const cb = callback || function() {};

        return new Promise((resolve, reject) => {
            this.authServerProvider.login(credentials).subscribe(
                data => {                                    
                    this.accountService.identity(true).then(account => {
                        console.log('login data',account)    
                        this.trackerService.sendActivity();
                        resolve(data);
                    });
                    return cb();
                },
                err => {
                    this.logout();
                    reject(err);
                    return cb(err);
                }
            );
        });
    }

    loginWithToken(jwt, rememberMe) {
        return this.authServerProvider.loginWithToken(jwt, rememberMe);
    }

    logout() {
        this.authServerProvider.logout().subscribe();
        this.accountService.authenticate(null);
    }
}
