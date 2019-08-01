import { Moment } from 'moment';

export interface IReviews {
    id?: number;
    reviewerName?: string;
    emailAddress?: string;
    reviewDate?: Moment;
    overAllSellerRating?: number;
    overAllSellerReview?: string;
    overAllDeliveryRating?: number;
    overAllDeliveryReview?: string;
    reviewAsAnonymous?: boolean;
    completedReview?: boolean;
    orderId?: number;
}

export class Reviews implements IReviews {
    constructor(
        public id?: number,
        public reviewerName?: string,
        public emailAddress?: string,
        public reviewDate?: Moment,
        public overAllSellerRating?: number,
        public overAllSellerReview?: string,
        public overAllDeliveryRating?: number,
        public overAllDeliveryReview?: string,
        public reviewAsAnonymous?: boolean,
        public completedReview?: boolean,
        public orderId?: number
    ) {
        this.reviewAsAnonymous = this.reviewAsAnonymous || false;
        this.completedReview = this.completedReview || false;
    }
}
