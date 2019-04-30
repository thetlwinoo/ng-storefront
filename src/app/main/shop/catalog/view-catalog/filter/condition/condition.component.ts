import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductTags, TagFilter } from '@box/models';
declare var $: any;
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-condition',
  templateUrl: './condition.component.html',
  styleUrls: ['./condition.component.scss']
})
export class ConditionComponent implements OnInit {
  @Output() changeCondition: EventEmitter<any[]> = new EventEmitter<any[]>();
  selectedCondition: TreeNode[] = [];

  constructor() { }

  ngOnInit() {
    // $('.collapse-block-title').on('click', function (e) {
    //   e.preventDefault;
    //   var speed = 300;
    //   var thisItem = $(this).parent(),
    //     nextLevel = $(this).next('.collection-collapse-block-content');
    //   if (thisItem.hasClass('open')) {
    //     thisItem.removeClass('open');
    //     nextLevel.slideUp(speed);
    //   } else {
    //     thisItem.addClass('open');
    //     nextLevel.slideDown(speed);
    //   }
    // });
  }

}
