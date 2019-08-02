import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CloudinaryModel, Orders, Reviews, IOrderLines } from '@box/models';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { IReviews, IProducts, Products } from '@box/models';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ReviewsService } from '../reviews.service';
import { ReviewLinesService } from '../review-lines.service';
import { ProductService } from '@box/services/e-commerce/product.service';
import { OrderService } from 'app/store/order/order.service';

@Component({
  selector: 'app-review-update',
  templateUrl: './review-update.component.html',
  styleUrls: ['./review-update.component.scss']
})
export class ReviewUpdateComponent implements OnInit {
  productRate = 5;
  deliveryRate = 0;
  // reviewAsAnonymous: boolean = false;
  checked1: boolean = false;
  selectedFace: String = null;
  reviewPhoto: any = null;
  orders: any;
  // reviews: IReviews = new Reviews();
  isSaving: boolean;
  // products: Products;
  // reviews: IReviews;
  // savedReviews: IReviews;
  // orders: Orders;
  // products: IProducts[];

  constructor(
    private router: Router,
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected reviewsService: ReviewsService,
    protected reviewLinesService: ReviewLinesService,
    // protected productsService: ProductsService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ orders }) => {
      console.log('reviews orders', orders)
      this.orders = orders;
      // this.reviews.orderId = orders.id;
      // this.reviewsService.getReviewsByOrderId(orders.id).subscribe(reviews=> {
      //   if(reviews.body){
      //     this.reviews = reviews.body;
      //     console.log('RRRRRRRRRviews',this.reviews)
      //   }       
      // })
    });
  }

  public onUploadCompleted(event) {
    if (event[0]) {
      const reviewPhoto: any = new Object();
      const uploadEvent = event[0];
      const cloudinaryModel: CloudinaryModel = new CloudinaryModel();
      cloudinaryModel.cloud_name = 'www-pixsurf-com';
      // cloudinaryModel.transformations = 'w_256,ar_1:1,c_fill,g_auto,e_art:hokusai'; //square
      // cloudinaryModel.transformations = "w_512,ar_16:9,c_fill,g_auto,e_sharpen"; //spharpen
      cloudinaryModel.transformations = "c_thumb,w_200,g_face"
      cloudinaryModel.resource_type = uploadEvent.data.resource_type;
      cloudinaryModel.type = uploadEvent.data.type;
      cloudinaryModel.public_id = uploadEvent.data.public_id;
      cloudinaryModel.version = uploadEvent.data.version;
      cloudinaryModel.format = uploadEvent.data.format;

      // reviewPhoto.originalPhoto = uploadEvent.data.url;
      // reviewPhoto.thumbnailPhoto = this.generatePhoto(cloudinaryModel);
      // reviewPhoto.priority = this.selectedIndex;
      // reviewPhoto.reviewId = this.review.id;
      // reviewPhoto.deleteToken = uploadEvent.data.delete_token;
      // console.log('Upload Event', reviewPhoto);
      // this.save(reviewPhoto);
    }
  }

  private generatePhoto(cloudinary: CloudinaryModel) {
    let url = 'http://res.cloudinary.com/';
    url = url + cloudinary.cloud_name + '/';
    url = url + cloudinary.resource_type + '/';
    url = url + cloudinary.type + '/';
    url = url + cloudinary.transformations + '/';
    url = url + 'v' + cloudinary.version + '/';
    url = url + cloudinary.public_id;
    url = url + '.' + cloudinary.format;

    console.log('thumb nail url', url);
    return url;
  }

  onDeleteReviewPhoto(event) {
    // console.log('on delete product photo', event);
    this.router.navigate(['/', 'manage-images', { outlets: { popup: this.reviewPhoto.id + '/delete' } }]);
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  setFileData(event, entity, field, isImage) {
    this.dataUtils.setFileData(event, entity, field, isImage);
  }

  clearInputImage(event,field: string, fieldContentType: string, idInput: string) {
    this.dataUtils.clearInputImage(event, this.elementRef, field, fieldContentType, idInput);
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;

    if (this.orders.orderReview.id !== undefined) {
      // this.orders.orderReview.orderId = this.orders.id;
      this.subscribeToSaveResponse(this.reviewsService.updateExtend(this.orders.orderReview, this.orders.id));
    } else {
      this.subscribeToSaveResponse(this.reviewsService.createExtend(this.orders.orderReview));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<any>>) {
    result.subscribe((res: HttpResponse<any>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess(event) {
    const totalCount: number = this.orders.orderLineLists.length;
    let completedReviewsCount: number = 0;
    if (this.orders.orderReview) {
      this.orders.orderReview.reviewLists.map((reviewLine, index) => {
        if (reviewLine.productRating && reviewLine.productReview) {
          completedReviewsCount += 1;
        }

        reviewLine.reviewId = event.id;
        reviewLine.productId = reviewLine.product.id;

        if (reviewLine.id !== undefined) {
          this.subscribeToSaveProductReviewsResponse(this.reviewLinesService.update(reviewLine), totalCount, ++index, completedReviewsCount);
        } else {
          this.subscribeToSaveProductReviewsResponse(this.reviewLinesService.create(reviewLine), totalCount, ++index, completedReviewsCount);
        }
      });
    }

  }

  protected subscribeToSaveProductReviewsResponse(result: Observable<HttpResponse<any>>, totalCount: number, count: number, completedReviewsCount: number) {
    result.subscribe((res: HttpResponse<any>) => this.onSaveProductReviewsSuccess(res.body, totalCount, count, completedReviewsCount), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveProductReviewsSuccess(event, totalCount: number, count: number, completedReviewsCount: number) {
    if (totalCount == count) {
      if (completedReviewsCount == totalCount) {
        this.reviewsService.completedReviews(this.orders.id).subscribe((res: HttpResponse<any>) => this.onCompletedReviews(res), (res: HttpErrorResponse) => this.onSaveError())
      }
      else {
        this.isSaving = false;
        this.previousState();
      }
    }
  }

  protected onCompletedReviews(event) {
    console.log('on completed reviews', event);
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackProductsById(index: number, item: any) {
    return item.id;
  }

  trackId(index: number, item: IOrderLines) {
    return item.id;
  }

  onSelectFace(event) {
    this.selectedFace = event;
  }

  getRatingDescription(id: number) {
    switch (id) {
      case 1: {
        return "Extremely Bad";
        break;
      }
      case 2: {
        return "Dissatisfied";
        break;
      }
      case 3: {
        return "Fair";
        break;
      }
      case 4: {
        return "Satisfied";
        break;
      }
      case 5: {
        return "Delighted";
        break;
      }
      default: {
        return "";
        break;
      }
    }
  }
  getSellerRatingDescription(id: number) {
    switch (id) {
      case 1: {
        return "Negative";
        break;
      }
      case 2: {
        return "Neutral";
        break;
      }
      case 3: {
        return "Positive";
        break;
      }
      default: {
        return "";
        break;
      }
    }
  }
}
