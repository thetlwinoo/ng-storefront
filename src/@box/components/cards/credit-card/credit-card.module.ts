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
import { CreditCardComponent } from './credit-card.component';
import { HttpModule } from "@angular/http";
import { CreditCardService } from 'app/store/payment/credit-card.service';

@NgModule({
    declarations: [
        CreditCardComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
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
        CreditCardComponent
    ],
    exports: [
        CreditCardComponent
    ],
    providers: [
        CreditCardService
    ]
})
export class CreditCardModule {
}
