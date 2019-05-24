import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule, MatToolbarModule, MatInputModule, MatFormFieldModule, MatListModule, MatBadgeModule, MatProgressSpinnerModule } from '@angular/material';

import { BoxSharedModule } from '@box/shared.module';

import { HeaderComponent } from 'app/layout/components/header/header.component';
import { SearchBarComponent } from './search/search-bar.component';

// import { KeywordsModule } from '@store/keywords/keywords.module';
import { HeaderService } from './header.service';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';

@NgModule({
    declarations: [
        HeaderComponent,
        SearchBarComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatInputModule,
        MatFormFieldModule,
        MatListModule,
        MatBadgeModule,
        MatProgressSpinnerModule,
        BoxSharedModule,
        AutoCompleteModule,
        ButtonModule
        // KeywordsModule      
    ],
    exports: [
        HeaderComponent
    ],
    providers: [
        HeaderService
    ]
})
export class HeaderModule {
}
