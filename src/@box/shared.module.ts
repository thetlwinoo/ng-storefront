import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { BoxDirectivesModule } from '@box/directives/directives';
import { BoxPipesModule } from '@box/pipes/pipes.module';

import { ResourceSharedLibsModule, ResourceSharedCommonModule} from './';
import { JhiLoginModalComponent } from './components';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        BoxDirectivesModule,
        BoxPipesModule,
        ResourceSharedCommonModule,
        ResourceSharedLibsModule
    ],
    declarations: [JhiLoginModalComponent],
    entryComponents: [JhiLoginModalComponent],
    providers: [],
    exports: [
        CommonModule,
        ResourceSharedCommonModule,
        FlexLayoutModule,
        BoxDirectivesModule,
        BoxPipesModule,
        JhiLoginModalComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BoxSharedModule {
}
