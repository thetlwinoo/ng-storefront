import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { OwlCarousel } from 'ngx-owl-carousel';
import { SellerService } from './seller.service';
import { carousel } from '@box/config/carousel';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss']
})
export class SellerComponent implements OnInit {
  @ViewChild('owlSellerProduct') owlElement: OwlCarousel;
  items: MenuItem[];
  cars: any[];
  options: any;
  products: any;
  carousel: any;
  constructor(private sellerService:SellerService) {
    this.carousel = carousel;
    this.products = this.sellerService.products;
   }

  ngOnInit() {
    this.items = [
      {
        label: 'File',
        items: [{
          label: 'New',
          icon: 'pi pi-fw pi-plus',
          items: [
            { label: 'Project' },
            { label: 'Other' },
          ]
        },
        { label: 'Open' },
        { label: 'Quit' }
        ]
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        items: [
          { label: 'Delete', icon: 'pi pi-fw pi-trash' },
          { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
        ]
      }
    ];

    this.options = {
      items: 1,
      merge: true,
      loop: true,
      margin: 10,
      video: true,
      videoHeight: 300,
      lazyLoad: true,
      center: true,
      dots: false,
      responsive: {
        480: {
          items: 2
        },
        600: {
          items: 4
        }
      }
    }
  }

  onPrevClick(event) {
    this.owlElement.trigger('prev.owl.carousel');
  }

  onNextClick(event) {
    this.owlElement.trigger('next.owl.carousel');
  }

}
