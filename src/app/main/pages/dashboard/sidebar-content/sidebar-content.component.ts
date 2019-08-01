import { Component, OnInit, Input } from '@angular/core';
import { accountState } from 'app/account';

@Component({
  selector: 'sidebar-content',
  templateUrl: './sidebar-content.component.html',
  styleUrls: ['./sidebar-content.component.scss']
})
export class SidebarContentComponent implements OnInit {
  @Input() account;
  constructor() { }

  ngOnInit() {
  }

}
