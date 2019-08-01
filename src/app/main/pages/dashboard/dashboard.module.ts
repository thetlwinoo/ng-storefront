import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoxSharedModule } from '@box/shared.module';
import { BoxSidebarModule } from '@box/components/sidebar/sidebar.module';
import { SidebarContentComponent } from './sidebar-content/sidebar-content.component';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [
    DashboardComponent,
    SidebarContentComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    BoxSharedModule,
    BoxSidebarModule,
  ]  
})
export class DashboardModule { }
