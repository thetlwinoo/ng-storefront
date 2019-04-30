import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatIconModule, MatButtonModule, MatListModule, MatTooltipModule } from '@angular/material';
import { ProductCardComponent } from './product-card.component';
import { ProductCardDirective } from './product-card.directive';
import { BoxPipesModule } from '@box/pipes/pipes.module';
// import { BarRatingModule } from "ngx-bar-rating";
import { RatingModule } from 'primeng/rating';

@NgModule({
    declarations: [
        ProductCardComponent,
        ProductCardDirective
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
        RatingModule
    ],
    exports: [
        ProductCardComponent,
        ProductCardDirective
    ]
})
export class ProductCardModule {
}
