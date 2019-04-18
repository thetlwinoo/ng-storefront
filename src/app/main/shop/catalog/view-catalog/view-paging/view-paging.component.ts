import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'view-paging',
  templateUrl: './view-paging.component.html',
  styleUrls: ['./view-paging.component.scss']
})
export class ViewPagingComponent implements OnInit {
  @Input() total: number;
  @Input() limit: number;
  @Input() skip: number;
  @Input() last: number;
  @Input() numbers: number[];
  @Output() setPage = new EventEmitter<any>(); 
  constructor() { }

  ngOnInit() {
    
  }

}
