import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from '@box/services/core/auth/user-route-access.service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MyReviewsComponent } from './my-reviews.component';
import { ReviewsService } from './reviews.service';
import { Reviews, IReviews, Orders, IOrders, ProductReviews, IProductReviews } from '@box/models';
import { ReviewDetailsComponent } from './review-details/review-details.component';
import { ReviewUpdateComponent } from './review-update/review-update.component';
import { OrderService } from 'app/store/order/order.service';
import * as moment from 'moment';

@Injectable({ providedIn: 'root' })
export class MyReviewsResolve implements Resolve<Orders> {
    constructor(
        private service: ReviewsService,
        private orderService: OrderService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Orders> {
        console.log('route', route)
        const id = route.params['id'] ? route.params['id'] : null;
        // const orderId = route.queryParams['orderId'] ? route.queryParams['orderId'] : null;
        // if (id) {
        //     return this.service.find(id).pipe(
        //         filter((response: HttpResponse<Reviews>) => response.ok),
        //         map((reviews: HttpResponse<Reviews>) => reviews.body)
        //     );
        // }

        // let newReviews = new Reviews();
        // const currDate = moment();
        // newReviews.reviewDate = currDate;        
        // newReviews.reviewLineLists = [];        
        // return of(newReviews);

        if (id) {
            // newReviews.orderId = orderId;
            return this.orderService.getOrder(id).pipe(
                filter((response: HttpResponse<Orders>) => response.ok),
                map((orders: HttpResponse<Orders>) => {
                    console.log('erer', orders.body)
                    if (orders.body.orderReview == null) {
                        let newReviews = new Reviews();
                        // const currDate = moment();
                        // newReviews.reviewDate = currDate;
                        newReviews.orderId = orders.body.id;
                        orders.body.orderReview = newReviews;
                    }

                    orders.body.orderLineLists.map(orderLine => {
                        if (orderLine.product.productReview == null) {
                            let productReviews: ProductReviews = new ProductReviews();
                            productReviews.productRating = 5;
                            productReviews.deliveryRating = 0;
                            productReviews.sellerRating = 0;
                            productReviews.productId = orderLine.product.id;
                            orderLine.product.productReview = productReviews;
                        }
                    });

                    return orders.body;
                })
            );
        }
    }
}

export const myReviewsRoute: Routes = [
    {
        path: '',
        component: MyReviewsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'My Reviews'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ReviewDetailsComponent,
        // resolve: {
        //     orders: MyReviewsResolve
        // },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'View Review'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/new',
        component: ReviewUpdateComponent,
        resolve: {
            orders: MyReviewsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Write Review'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ReviewUpdateComponent,
        resolve: {
            orders: MyReviewsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Edit Review'
        },
        canActivate: [UserRouteAccessService]
    },
];
