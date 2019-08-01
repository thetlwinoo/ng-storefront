import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@app/env';
import { createRequestOption } from '@box/utils/request-util';
import { IProductReviews, ProductReviews } from '@box/models';

type EntityResponseType = HttpResponse<IProductReviews>;
type EntityArrayResponseType = HttpResponse<IProductReviews[]>;

@Injectable({ providedIn: 'root' })
export class ProductReviewsService {
    public resourceUrl = `${environment.serverApi.baseUrl}` + 'api/product-reviews';
    public extendUrl = `${environment.serverApi.baseUrl}` + 'api/product-reviews-extend';

    constructor(protected http: HttpClient) { }

    create(productReviews: IProductReviews): Observable<EntityResponseType> {
        return this.http.post<IProductReviews>(this.resourceUrl, productReviews, { observe: 'response' });
    }

    update(productReviews: IProductReviews): Observable<EntityResponseType> {
        return this.http.put<IProductReviews>(this.resourceUrl, productReviews, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IProductReviews>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IProductReviews[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    createExtend(productReviews: IProductReviews) {
        console.log('post product review', productReviews);
        let params = new HttpParams();
        params = params.set('productId', productReviews.productId.toString());
        return this.http.post<ProductReviews>(this.extendUrl + '/save', productReviews, { observe: 'response', params: params });
    }

    updateExtend(productReviews: IProductReviews) {
        console.log('post product review', productReviews);
        let params = new HttpParams();
        params = params.set('productId', productReviews.productId.toString());
        return this.http.put<ProductReviews>(this.extendUrl + '/save', productReviews, { observe: 'response', params: params });
    }
}
