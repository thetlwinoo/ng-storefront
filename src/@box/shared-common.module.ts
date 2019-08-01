import { NgModule } from '@angular/core';
import { FileUploadModule } from 'ng2-file-upload';
import { ResourceSharedLibsModule, FindLanguageFromKeyPipe, JhiAlertComponent, JhiAlertErrorComponent } from '.';

@NgModule({
    imports: [
        ResourceSharedLibsModule,
        FileUploadModule
    ],
    declarations: [
        FindLanguageFromKeyPipe,
        JhiAlertComponent,
        JhiAlertErrorComponent
    ],
    exports: [
        ResourceSharedLibsModule,
        FileUploadModule,
        FindLanguageFromKeyPipe,
        JhiAlertComponent,
        JhiAlertErrorComponent
    ]
})
export class ResourceSharedCommonModule { }
