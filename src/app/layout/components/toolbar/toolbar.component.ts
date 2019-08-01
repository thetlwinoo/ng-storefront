import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { BoxConfigService } from '@box/services/config.service';
import { BoxSidebarService } from '@box/components/sidebar/sidebar.service';

import { navigation } from 'app/navigation/navigation';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LoginModalService, AccountService, LoginService } from '@box/services/core';
import { Observable } from "rxjs/Observable";
import { Account } from '@box/models';
import { Subscription } from "rxjs/Subscription";
import { Store } from "@ngrx/store";
import * as fromApp from 'app/store/app.reducers';
import { HttpError } from 'app/store/app.reducers';
import { Wishlists, Compares } from '@box/models';
import * as WishlistActions from 'app/store/wishlist/wishlist.actions';
import * as CompareActions from 'app/store/compare/compare.actions';

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ToolbarComponent implements OnInit, OnDestroy {
    account: Account;
    modalRef: NgbModalRef;
    wishlistState: Observable<{ wishlists: Wishlists, errors: HttpError[], loading: boolean }>;
    compareState: Observable<{ compares: Compares, errors: HttpError[], loading: boolean }>;
    isCollapsed: boolean = true;

    boxConfig: any;
    horizontalNavbar: boolean;
    rightNavbar: boolean;
    hiddenNavbar: boolean;
    languages: any;
    navigation: any;
    selectedLanguage: any;
    userStatusOptions: any[];
    wishlistCount: number = 0;
    compareCount: number = 0;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {BoxConfigService} _boxConfigService
     * @param {BoxSidebarService} _boxSidebarService
     * @param {TranslateService} _translateService
     */
    constructor(
        private _boxConfigService: BoxConfigService,
        private _boxSidebarService: BoxSidebarService,
        private _translateService: TranslateService,
        private accountService: AccountService,
        private loginService: LoginService,
        private router: Router,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private store: Store<fromApp.AppState>,
    ) {
        // Set the defaults
        this.userStatusOptions = [
            {
                'title': 'Online',
                'icon': 'icon-checkbox-marked-circle',
                'color': '#4CAF50'
            },
            {
                'title': 'Away',
                'icon': 'icon-clock',
                'color': '#FFC107'
            },
            {
                'title': 'Do not Disturb',
                'icon': 'icon-minus-circle',
                'color': '#F44336'
            },
            {
                'title': 'Invisible',
                'icon': 'icon-checkbox-blank-circle-outline',
                'color': '#BDBDBD'
            },
            {
                'title': 'Offline',
                'icon': 'icon-checkbox-blank-circle-outline',
                'color': '#616161'
            }
        ];

        this.languages = [
            {
                id: 'en',
                title: 'English',
                flag: 'us'
            },
            {
                id: 'tr',
                title: 'Turkish',
                flag: 'tr'
            }
        ];

        this.navigation = navigation;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to the config changes        
        this._boxConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((settings) => {
                this.boxConfig = settings;
                this.horizontalNavbar = settings.layout.navbar.position === 'top';
                this.rightNavbar = settings.layout.navbar.position === 'right';
                this.hiddenNavbar = settings.layout.navbar.hidden === true;
            });

        this.accountService.identity().then((account: Account) => {
            this.account = account;
            console.log('logon account',account)
        });
        this.registerAuthenticationSuccess();        

        // Set the selected language from default languages
        this.selectedLanguage = _.find(this.languages, { 'id': this._translateService.currentLang });

        this.wishlistState = this.store.select('wishlist');
        this.wishlistState.subscribe(data=>{
            if(data && data.wishlists && data.wishlists.wishlistLists){
                this.wishlistCount = data.wishlists.wishlistLists.length;
            }
            else{
                this.wishlistCount = 0 ;
            }
        });

        this.compareState = this.store.select('compare');
        this.compareState.subscribe(data=>{
            console.log('compare',data)
            if(data && data.compares && data.compares.compareLists){
                this.compareCount = data.compares.compareLists.length;
            }else{
                this.compareCount = 0 ;
            }
        });

        this.store.dispatch(new WishlistActions.FetchWishlist());
        this.store.dispatch(new CompareActions.FetchCompare());
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.accountService.identity().then(account => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.accountService.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    logout() {
        this.loginService.logout();
        this.router.navigate(['']);
    }
    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();        
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void {
        this._boxSidebarService.getSidebar(key).toggleOpen();
    }

    /**
     * Search
     *
     * @param value
     */
    search(value): void {
        // Do your search here...
        console.log(value);
    }

    /**
     * Set the language
     *
     * @param lang
     */
    setLanguage(lang): void {
        // Set the selected language for the toolbar
        this.selectedLanguage = lang;

        // Use the selected language for translations
        this._translateService.use(lang.id);
    }
}
