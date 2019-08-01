import { Component, OnInit, Input } from '@angular/core';
import { addressReducer } from 'app/store/adresses/addresses.reducer';
import { Account } from '@box/models';

@Component({
  selector: 'business-entity',
  templateUrl: './business-entity.component.html',
  styleUrls: ['./business-entity.component.scss']
})
export class BusinessEntityComponent implements OnInit {
  @Input() businessEntity;
  @Input() account: Account;
  @Input() contact;
  
  constructor() { }

  ngOnInit() {
  }

  get acountName() {
    return (this.account.firstName == this.account.lastName) ? this.account.firstName : this.account.firstName + ' ' + this.account.lastName;
  }
}
