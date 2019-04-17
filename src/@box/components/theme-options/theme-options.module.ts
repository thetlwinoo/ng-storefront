import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MatButtonModule, MatCheckboxModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatOptionModule, MatRadioModule, MatSelectModule, MatSlideToggleModule
} from '@angular/material';

import { BoxDirectivesModule } from '@box/directives/directives';
import { BoxMaterialColorPickerModule } from '@box/components/material-color-picker/material-color-picker.module';
import { BoxSidebarModule } from '@box/components/sidebar/sidebar.module';

import { BoxThemeOptionsComponent } from '@box/components/theme-options/theme-options.component';

@NgModule({
    declarations: [
        BoxThemeOptionsComponent
    ],
    imports     : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        FlexLayoutModule,

        MatButtonModule,
        MatCheckboxModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatOptionModule,
        MatRadioModule,
        MatSelectModule,
        MatSlideToggleModule,

        BoxDirectivesModule,
        BoxMaterialColorPickerModule,
        BoxSidebarModule
    ],
    exports     : [
        BoxThemeOptionsComponent
    ]
})
export class BoxThemeOptionsModule
{
}
