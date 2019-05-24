import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { BoxDirectivesModule } from '@box/directives/directives';
import { BoxPipesModule } from '@box/pipes/pipes.module';

import { JhiLoginModalComponent } from './components';
// import { LoginService } from './services/core/login/login.service';
import { CookieModule } from 'ngx-cookie';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        FlexLayoutModule,

        BoxDirectivesModule,
        BoxPipesModule,
        CookieModule.forRoot(),
        NgbModule.forRoot(),
        InputTextModule,
        ButtonModule
    ],
    declarations: [JhiLoginModalComponent],
    entryComponents: [JhiLoginModalComponent],
    providers: [],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        FlexLayoutModule,

        BoxDirectivesModule,
        BoxPipesModule,
        JhiLoginModalComponent
    ]
})
export class BoxSharedModule {
}
