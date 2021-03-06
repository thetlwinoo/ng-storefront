import { Component, OnInit, Input } from '@angular/core';
import { addressReducer } from 'app/store/adresses/addresses.reducer';
import { Account } from '@box/models';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  @Input() addresses;
  @Input() account: Account;
  @Input() contact;
  @Input() viewOnly:boolean;
  
  constructor() { }

  ngOnInit() {
  }

  get acountName() {
    return (this.account.firstName == this.account.lastName) ? this.account.firstName : this.account.firstName + ' ' + this.account.lastName;
  }
}
