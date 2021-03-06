import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

import { LoginModalService } from '@box/services/core/login/login-modal.service';
import { ActivateService } from './activate.service';
import { PeopleService } from '@box/services/e-commerce/people.service';

@Component({
    selector: 'jhi-activate',
    templateUrl: './activate.component.html'
})
export class ActivateComponent implements OnInit {
    error: string;
    success: string;
    modalRef: NgbModalRef;

    constructor(
        private activateService: ActivateService,
        private peopleService: PeopleService,
        private loginModalService: LoginModalService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        console.log('activate init')
        this.route.queryParams.subscribe(params => {
            this.activateService.get(params['key']).subscribe(
                () => {
                    this.error = null;
                    this.success = 'OK';                    
                },
                () => {
                    this.success = null;
                    this.error = 'ERROR';
                }
            );
        });
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }
}
