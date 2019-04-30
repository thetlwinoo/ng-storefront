import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material';
import { BoxSidebarModule, BoxThemeOptionsModule } from '@box/components';
import { BoxSharedModule } from '@box/shared.module';
import { RouterModule } from '@angular/router';
import { HeaderModule } from 'app/layout/components/header/header.module';
import { ChatPanelModule } from 'app/layout/components/chat-panel/chat-panel.module';
import { ContentModule } from 'app/layout/components/content/content.module';
import { FooterModule } from 'app/layout/components/footer/footer.module';
import { ContentBelowModule } from 'app/layout/components/content-below/content-below.module';
import { NavbarModule } from 'app/layout/components/navbar/navbar.module';
import { QuickPanelModule } from 'app/layout/components/quick-panel/quick-panel.module';
import { ToolbarModule } from 'app/layout/components/toolbar/toolbar.module';
// import { McBreadcrumbsModule } from 'ngx-breadcrumbs';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { HorizontalLayout1Component } from 'app/layout/horizontal/layout-1/layout-1.component';
import { BreadcrumbService } from '@box/services/breadcrumb.service';

@NgModule({
    declarations: [
        HorizontalLayout1Component
    ],
    imports: [
        // McBreadcrumbsModule.forRoot(),
        RouterModule,
        BreadcrumbModule,
        MatSidenavModule,

        BoxSharedModule,
        BoxSidebarModule,
        BoxThemeOptionsModule,

        HeaderModule,
        ChatPanelModule,
        ContentModule,
        FooterModule,
        NavbarModule,
        QuickPanelModule,
        ToolbarModule,
        ContentBelowModule
    ],
    exports: [
        HorizontalLayout1Component
    ],
    providers: [
        BreadcrumbService        
    ]
})
export class HorizontalLayout1Module {
}
