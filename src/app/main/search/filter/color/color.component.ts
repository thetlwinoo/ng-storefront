import { ViewEncapsulation, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductColor, ColorFilter } from '@box/models';
import { boxAnimations } from '@box/animations';

@Component({
  selector: 'color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss'],
  animations: boxAnimations,
  encapsulation: ViewEncapsulation.None
})
export class ColorComponent implements OnInit {
  public selectedColors: any;
  expand: boolean;
  public activeItem: any = '';

  // Using Input and Output EventEmitter
  @Input() colorsFilters: ColorFilter[] = [];
  @Output() changedColorFilters: EventEmitter<ColorFilter[]> = new EventEmitter<ColorFilter[]>();

  constructor() {
    this.expand = true;
   }

  ngOnInit() { }

  // Click to call function 
  // public changeColor(colors: ColorFilter) {
  //   this.activeItem = colors.color
  //   if (colors.color) {
  //     this.colorFilters.emit([colors]);
  //   } else {
  //     this.colorFilters.emit([]);
  //   }
  // }

}
