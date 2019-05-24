import { Component, OnInit } from '@angular/core';
import { SelectedCatalogService } from './selected-catalog.service';
// import { Product } from '@box/models';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromApp from 'app/store/app.reducers';
import { HttpError } from 'app/store/app.reducers';
import * as CartActions from 'app/store/cart/cart.actions';
import { Cart, Product } from "app/store/cart/cart.reducer";
import { Observable } from "rxjs/Observable";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LocationStrategy } from "@angular/common";
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/catch';
import { HttpErrorResponse } from "@angular/common/http";
import { LoginModalService, AccountService } from '@box/services/core';
import { JhiEventManager } from 'ng-jhipster';

@Component({
  selector: 'app-selected-catalog',
  templateUrl: './selected-catalog.component.html',
  styleUrls: ['./selected-catalog.component.scss']
})
export class SelectedCatalogComponent implements OnInit {
  account: Account;
  images: any;
  product: Product;
  products: Product[];
  public counter: number = 1;
  cartState: Observable<{ cart: Cart, errors: HttpError[], loading: boolean }>;
  inlineLoading: boolean = true;
  modalRef: NgbModalRef;

  constructor(
    private router: Router,
    private selectedCatalogService: SelectedCatalogService,
    private loginModalService: LoginModalService,
    private locStrat: LocationStrategy,
    private store: Store<fromApp.AppState>,
    private accountService: AccountService,
    private modalService: NgbModal,
    private eventManager: JhiEventManager
  ) {
    this.images = this.selectedCatalogService.images;
    this.product = this.selectedCatalogService.product;
    this.products = this.selectedCatalogService.products;
  }

  ngOnInit() {
    this.cartState = this.store.select('cart');
  }

  public increment() {
    this.counter += 1;
  }

  public decrement() {
    if (this.counter > 1) {
      this.counter -= 1;
    }
  }

  addToCart(amount: HTMLInputElement) {
    const val = amount.value;
    let reg = new RegExp('^[0-9]+$');
    if (!reg.test(val) || parseInt(val) == 0) {
      alert("Please enter a valid amount.");
      return;
    }

    // this.store.select('auth')
    //   .take(1)
    //   .subscribe(data => {
    //     if (data.authenticated) {
    //       this.store.dispatch(new CartActions.AddToCart({ id: this.product.id, amount: val }));
    //     }
    //     else {
    //       // this.router.navigate(["/login"]);
    //       this.login();
    //     }
    //   });
    if(this.isAuthenticated()){
      this.store.dispatch(new CartActions.AddToCart({ id: this.product.id, amount: val }));
    }
    else{
      this.login();
    }
  }

  open(content) {
    this.modalService.open(content);
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }


  login() {
    this.modalRef = this.loginModalService.open();
  }
}
