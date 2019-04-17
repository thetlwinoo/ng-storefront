import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatButtonModule, MatListModule, MatTooltipModule } from '@angular/material';
import { ProductBoxHoverComponent } from './product-box-hover.component';
import { BoxPipesModule } from '@box/pipes/pipes.module';
import { RouterModule } from '@angular/router';
import { BarRatingModule } from "ngx-bar-rating";

@NgModule({
    declarations: [
        ProductBoxHoverComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MatIconModule,
        MatButtonModule,
        MatListModule,
        MatTooltipModule,
        BoxPipesModule,  
        BarRatingModule      
    ],
    exports: [
        ProductBoxHoverComponent
    ]
})
export class ProductBoxHoverModule {
}
