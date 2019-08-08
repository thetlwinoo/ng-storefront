import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { ActivatedRoute, Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { BoxConfigService } from '@box/services/config.service';
import { navigation } from 'app/navigation/navigation';
import { MenuItem } from 'primeng/api';
import { BreadcrumbService } from '@box/services/breadcrumb.service';

@Component({
    selector: 'horizontal-layout-1',
    templateUrl: './layout-1.component.html',
    styleUrls: ['./layout-1.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HorizontalLayout1Component implements OnInit, OnDestroy {
    crumbs$: Observable<MenuItem[]>;
    home: MenuItem;
    boxConfig: any;
    navigation: any;

    // Private
    private _unsubscribeAll: Subject<any>;
    title: any;

    /**
     * Constructor
     *
     * @param {BoxConfigService} _boxConfigService
     */
    constructor(
        private breadcrumb: BreadcrumbService,
        private _boxConfigService: BoxConfigService,
        // router: Router,
        private route: ActivatedRoute,
        private router: Router
    ) {
        // Set the defaults
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
        // this.crumbs$ = this.breadcrumb.crumbs$;
        this.home = {icon: 'pi pi-home', routerLink: ['/shop/home']};
        // Subscribe to config changes
        this._boxConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {
                this.boxConfig = config;
            });
    }

    // handleNavigationEnd() {
    //     console.log('routerState:snapshot', this.router.routerState.snapshot.root.data); // always {}

    //     this.route.data.subscribe((data) => console.log('ActivatedRoute:subscribe', data)); // always {}
    // }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
