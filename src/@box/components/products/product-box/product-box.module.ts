import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatIconModule, MatButtonModule, MatListModule, MatTooltipModule } from '@angular/material';
import { ProductBoxComponent } from './product-box.component';
import { BoxPipesModule } from '@box/pipes/pipes.module';
import { ProgressBarModule } from 'primeng/progressbar';
import { SnackBarService } from '@box/services/snackbar.service';
import { CardModule } from 'primeng/card';

@NgModule({
    declarations: [
        ProductBoxComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        MatIconModule,
        MatButtonModule,
        MatListModule,
        MatTooltipModule,
        BoxPipesModule,
        ProgressBarModule,
        CardModule
    ],
    exports: [
        ProductBoxComponent
    ],
    providers: [
        SnackBarService
    ]
})
export class ProductBoxModule {
}
