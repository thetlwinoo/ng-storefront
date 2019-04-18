import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'view-toolbar',
  templateUrl: './view-toolbar.component.html',
  styleUrls: ['./view-toolbar.component.scss']
})
export class ViewToolbarComponent implements OnInit {
  @Input() total: number;
  @Input() limit: number;
  @Input() skip: number;
  @Output() setPage = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  getCeil(num){
    return Math.ceil(num);
  }
}
