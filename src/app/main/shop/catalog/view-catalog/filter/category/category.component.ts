import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductTags, TagFilter } from '@box/models';
declare var $: any;
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  @Input() categories: any[] = [];
  @Input() productCategories: any[] = [];
  @Output() selectedCategories: EventEmitter<any[]> = new EventEmitter<any[]>();
  selectedFiles: TreeNode[] = [];

  constructor() { }

  ngOnInit() {
    $('.collapse-block-title').on('click', function (e) {
      e.preventDefault;
      var speed = 300;
      var thisItem = $(this).parent(),
        nextLevel = $(this).next('.collection-collapse-block-content');
      if (thisItem.hasClass('open')) {
        thisItem.removeClass('open');
        nextLevel.slideUp(speed);
      } else {
        thisItem.addClass('open');
        nextLevel.slideDown(speed);
      }
    });
  }

  nodeChange(event) {
    this.selectedCategories.emit(this.selectedFiles);
  }

  expandAll() {
    this.categories.forEach(node => {
      this.expandRecursive(node, true);
    });
  }

  collapseAll() {
    this.categories.forEach(node => {
      this.expandRecursive(node, false);
    });
  }

  private expandRecursive(node: TreeNode, isExpand: boolean) {
    node.expanded = isExpand;
    if (node.children) {
      node.children.forEach(childNode => {
        this.expandRecursive(childNode, isExpand);
      });
    }
  }
}
