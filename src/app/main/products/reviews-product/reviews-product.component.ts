import { Component, OnInit, Input } from '@angular/core';
import { ProductBannerComponent } from 'app/main/home/banner/banner.component';
import { Subscription } from "rxjs/Subscription";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { ReviewsService } from 'app/main/pages/dashboard/my-reviews/reviews.service';
import { filter, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { IReviewLines, ReviewLines } from '@box/models';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

@Component({
  selector: 'reviews-product',
  templateUrl: './reviews-product.component.html',
  styleUrls: ['./reviews-product.component.scss']
})
export class ReviewsProductComponent implements OnInit {
  @Input() product;
  paramSubscription: Subscription;
  innerLoading: boolean = true;
  fetchError: HttpErrorResponse = null;
  id: number;
  reviewLines: IReviewLines[];

  constructor(
    private reviewsService: ReviewsService,
    protected jhiAlertService: JhiAlertService,
    private route: ActivatedRoute
  ) { }
  average: number = 5;

  details = [
    {
      star: 5,
      progress: 100,
      percent: 1
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
    this.paramSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.reviewsService.getReviewLinesByProductId(this.id)
          .pipe(
            filter((res: HttpResponse<IReviewLines[]>) => res.ok),
            map((res: HttpResponse<IReviewLines[]>) => res.body)
          )
          .subscribe((res: any[]) => {
            this.reviewLines = res;
            console.log('get reviews lines', this.reviewLines);
          },
            (res: HttpErrorResponse) => this.onError(res.message)
          );
      }
    );
  }

  protected onError(errorMessage: string) {
    console.log('error', errorMessage);
    this.jhiAlertService.error(errorMessage, null, null);
  }

}
