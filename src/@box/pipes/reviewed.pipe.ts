import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'reviewed'
})
export class ReviewedPipe implements PipeTransform {
    transform(array, val) {        
        if (array && array.length > 0) {
            if (val == false) {
                return array.filter(data => data.product.productReview == null)
            }
            else {
                return array.filter(data => data.product.productReview !== null)
            }
        }
        return array;
    }
}
