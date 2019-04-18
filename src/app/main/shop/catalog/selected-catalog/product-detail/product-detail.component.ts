import { Component, OnInit, Input } from '@angular/core';
// import { StockItem } from '@box/models';
import { carousel } from '@box/config/carousel';
// import { PhotoService } from '@box/services/photo.service';

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  @Input() product: any;
  // @Input() relatedItems: any;
  @Input() images: any;
  carousel: any;
  selectedGalleryImage: any;

  constructor(
    // private photoService: PhotoService
  ) {
    this.carousel = carousel;
    
    // this.photoService.onImagesChanged.subscribe(images => {
    //   this.selectedGalleryImage = images[0];
    // })
  }

  ngOnInit() {
  }

  onSelectGalleryImage(event,image) {
    event.preventDefault();
    event.stopPropagation();
    this.selectedGalleryImage = image;
    return false;    
  }
}
