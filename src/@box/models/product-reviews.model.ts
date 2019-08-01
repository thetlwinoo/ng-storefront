export interface IProductReviews {
    id?: number;
    productRating?: number;
    productReview?: string;
    sellerRating?: number;
    sellerReview?: string;
    deliveryRating?: number;
    deliveryReview?: string;
    photoContentType?: string;
    photo?: any;
    productId?: number;
}

export class ProductReviews implements IProductReviews {
    constructor(
        public id?: number,
        public productRating?: number,
        public productReview?: string,
        public sellerRating?: number,
        public sellerReview?: string,
        public deliveryRating?: number,
        public deliveryReview?: string,
        public photoContentType?: string,
        public photo?: any,
        public productId?: number
    ) {}
}
