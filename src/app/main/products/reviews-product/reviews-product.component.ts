import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductBannerComponent } from 'app/main/home/banner/banner.component';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { ReviewsService } from 'app/store/reviews/reviews.service';
import { filter, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { IReviewLines, ReviewLines } from '@box/models';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import * as fromApp from "app/store/app.reducers";
import { Store } from "@ngrx/store";
import * as ReviewsActions from "app/store/reviews/reviews.actions";
import { HttpError } from "app/store/app.reducers";

@Component({
  selector: 'reviews-product',
  templateUrl: './reviews-product.component.html',
  styleUrls: ['./reviews-product.component.scss']
})
export class ReviewsProductComponent implements OnInit, OnDestroy {
  @Input() product;
  paramSubscription: Subscription;
  reviewSubscription: Subscription;
  innerLoading: boolean = true;
  fetchError: HttpErrorResponse = null;
  id: number;
  reviewLines: IReviewLines[];
  reviewState: Observable<{ reviewLines: ReviewLines[], data: any, errors: HttpError[], loading: boolean }>;
  overAllRating: number = 0;
  ratingCount: number = 0;
  private _unsubscribeAll: Subject<any>;

  constructor(
    private store: Store<fromApp.AppState>,
    private reviewsService: ReviewsService,
    protected jhiAlertService: JhiAlertService,
    private route: ActivatedRoute
  ) {
    this._unsubscribeAll = new Subject();
  }
  average: number = 5;
  ratingObject = {
    fiveStars: 0,
    fourStars: 0,
    threeStars: 0,
    twoStars: 0,
    oneStar: 0,
    overAllRating: 0,
    ratingCount: 0,
  };

  data: any[] = [
    {
      star: 5,
      progress: 0,
      percent: 0
    },
    {
      star: 4,
      progress: 0,
      percent: 0
    },
    {
      star: 3,
      progress: 0,
      percent: 0
    },
    {
      star: 2,
      progress: 0,
      percent: 0
    },
    {
      star: 1,
      progress: 0,
      percent: 0
    }
  ];

  ngOnInit() {
    // this.reviewState = this.store.select('reviews');
    this.paramSubscription = this.route.params
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.reviewsService.getReviewLinesByProductId(this.id)
            .pipe(
              filter((res: HttpResponse<IReviewLines[]>) => res.ok),
              map((res: HttpResponse<IReviewLines[]>) => res.body)
            )
            .subscribe((res: any[]) => {
              this.reviewLines = res;

              let allRating = 0, count = 0;

              res.map(data => {
                allRating += data.productRating;
                count += 1;
                switch (data.productRating) {
                  case 5:
                    this.ratingObject.fiveStars += 1; break;
                  case 4:
                      this.ratingObject.fourStars += 1; break;
                  case 3:
                      this.ratingObject.threeStars += 1; break;
                  case 2:
                      this.ratingObject.twoStars += 1; break;
                  case 1:
                      this.ratingObject.oneStar += 1; break;
                  default: break;
                }
              });
              this.ratingObject.overAllRating = Math.ceil(allRating / count);
              this.ratingObject.ratingCount = count;

              this.data.map(i => {
                switch (i.star) {
                  case 5:
                    i.percent = this.ratingObject.fiveStars | 0;
                    i.progress = i.percent > 0 ? 100 : 0; break;
                  case 4:
                    i.percent = this.ratingObject.fourStars | 0;
                    i.progress = i.percent > 0 ? 100 : 0; break;
                  case 3:
                    i.percent = this.ratingObject.threeStars | 0;
                    i.progress = i.percent > 0 ? 100 : 0; break;
                  case 2:
                    i.percent = this.ratingObject.twoStars | 0;
                    i.progress = i.percent > 0 ? 100 : 0; break;
                  case 1:
                    i.percent = this.ratingObject.oneStar | 0;
                    i.progress = i.percent > 0 ? 100 : 0; break;
                  default:
                    i.percent = 0;
                    i.progress = 0; break;
                }
              })

              // console.log('get reviews lines', this.reviewLines);
            },
              (res: HttpErrorResponse) => this.onError(res.message)
            );

          // this.store.dispatch(new ReviewsActions.FetchReviews(params['id']));
        });

    // this.reviewSubscription = this.reviewState
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe(val => {
    //     this.overAllRating = val.data.overAllRating | 0;
    //     this.ratingCount = val.data.ratingCount | 0;
    //     this.reviewLines = val.reviewLines;
    //     this.data.map(i => {
    //       switch (i.star) {
    //         case 5:
    //           i.percent = val.data.fiveStars | 0;
    //           i.progress = i.percent > 0 ? 100 : 0; break;
    //         case 4:
    //           i.percent = val.data.fourStars | 0;
    //           i.progress = i.percent > 0 ? 100 : 0; break;
    //         case 3:
    //           i.percent = val.data.threeStars | 0;
    //           i.progress = i.percent > 0 ? 100 : 0; break;
    //         case 2:
    //           i.percent = val.data.twoStars | 0;
    //           i.progress = i.percent > 0 ? 100 : 0; break;
    //         case 1:
    //           i.percent = val.data.oneStar | 0;
    //           i.progress = i.percent > 0 ? 100 : 0; break;
    //         default:
    //           i.percent = 0;
    //           i.progress = 0; break;
    //       }
    //     })
    //   })

  }

  protected onError(errorMessage: string) {
    console.log('error', errorMessage);
    this.jhiAlertService.error(errorMessage, null, null);
  }

  private getDiffDays(date: Date) {

    var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    var currentDate = new Date();
    var reviewedDate = new Date(date);

    var diffDays = Math.round(Math.abs((currentDate.getTime() - reviewedDate.getTime()) / (oneDay)));

    return diffDays;
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();

    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }

    // if (this.reviewSubscription) {
    //   this.reviewSubscription.unsubscribe();
    // }
  }
}
