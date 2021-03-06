import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CheckboxModule } from 'primeng/checkbox';
import { InputMaskModule } from 'primeng/inputmask';
import { BusinessEntityComponent } from './business-entity.component';

@NgModule({
    declarations: [
        BusinessEntityComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        ButtonModule,
        CardModule,
        InputTextModule,
        InputTextareaModule,
        SelectButtonModule,
        CheckboxModule,
        InputMaskModule
    ],
    entryComponents: [
        BusinessEntityComponent
    ],
    exports: [
        BusinessEntityComponent
    ]
})
export class BusinessEntityModule {
}
