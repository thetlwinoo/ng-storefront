import { NgModule } from '@angular/core';

import { KeysPipe } from './keys.pipe';
import { GetByIdPipe } from './getById.pipe';
import { HtmlToPlaintextPipe } from './htmlToPlaintext.pipe';
import { FilterPipe } from './filter.pipe';
import { CamelCaseToDashPipe } from './camelCaseToDash.pipe';
import { EllipsisPipe } from './ellipsis.pipe';
import { OrderByPipe } from './order-by.pipe';
import { ReviewedPipe } from './reviewed.pipe';
import { SafePipe } from './safe.pipe';

@NgModule({
    declarations: [
        KeysPipe,
        GetByIdPipe,
        HtmlToPlaintextPipe,
        FilterPipe,
        CamelCaseToDashPipe,
        EllipsisPipe,
        OrderByPipe,
        ReviewedPipe,
        SafePipe
    ],
    imports: [],
    exports: [
        KeysPipe,
        GetByIdPipe,
        HtmlToPlaintextPipe,
        FilterPipe,
        CamelCaseToDashPipe,
        EllipsisPipe,
        OrderByPipe,
        ReviewedPipe,
        SafePipe
    ]
})
export class BoxPipesModule {
}
