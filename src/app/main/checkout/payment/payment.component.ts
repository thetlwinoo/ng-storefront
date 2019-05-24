import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import * as fromApp from "app/store/app.reducers";
import { Store } from "@ngrx/store";
import * as OrderActions from "app/store/order/order.actions";
import { PaymentObject } from "app/store/order/order.reducer";
import { Router } from "@angular/router";


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;
  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router
  ) { }

  ngOnInit() {
    this.paymentForm = new FormGroup({
      'cardNo': new FormControl('333', Validators.required),
      'cardOwner': new FormControl('ant', Validators.required),
      'cardExp': new FormGroup({
        'month': new FormControl('1', [Validators.required]),
        'year': new FormControl('2018', [Validators.required]),
      }),
      'cardCCV': new FormControl('333', Validators.required),
    });
  }

  onSubmitPaymentForm() {
    console.log(this.paymentForm);
    console.log(this.paymentForm.value.cardExp);
    const paymentData: PaymentObject = {
      cardOwner: this.paymentForm.value.cardOwner,
      cardNo: this.paymentForm.value.cardNo,
      cardExp: this.paymentForm.value.cardExp,
      cardCCV: this.paymentForm.value.cardCCV,
    };
    this.store.dispatch(new OrderActions.PostPayment(paymentData));

    console.log(paymentData);
    this.router.navigate(["/checkout/confirm"]);
  }
}
