import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatIconModule, MatMenuModule, MatTooltipModule } from '@angular/material';

import { BoxPipesModule } from '@box/pipes/pipes.module';

import { BoxMaterialColorPickerComponent } from '@box/components/material-color-picker/material-color-picker.component';

@NgModule({
    declarations: [
        BoxMaterialColorPickerComponent
    ],
    imports: [
        CommonModule,

        FlexLayoutModule,

        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatTooltipModule,

        BoxPipesModule
    ],
    exports: [
        BoxMaterialColorPickerComponent
    ],
})
export class BoxMaterialColorPickerModule
{
}
