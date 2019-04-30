import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BoxSharedModule } from '@box/shared.module';
import { BoxSidebarModule } from '@box/components/sidebar/sidebar.module';
import { MatIconModule, MatCheckboxModule, MatDividerModule, MatListModule, MatExpansionModule, MatFormFieldModule, MatDatepickerModule, MatButtonModule, MatDialogModule, MatInputModule, MatRadioModule } from '@angular/material';
import { ManageOrdersComponent } from './manage-orders.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { SidebarContentComponent } from './sidebar-content/sidebar-content.component';
import { MyOrdersService } from './my-orders/my-orders.service';
// import { AuthGuard } from 'app/guards/auth.guard';
import { BreadcrumbInitializedGuard } from '@box/services/breadcrumb-initialized-guard.service';

const routes = [
  {
    path: 'manage-orders',
    component: ManageOrdersComponent,
    // canActivate: [AuthGuard],
    // resolve: {
    //     data: CheckoutCompletedService
    // },
    data: {
      crumbs: [{
        label: 'Manage Orders'
      }]
    },
    canActivate: [BreadcrumbInitializedGuard],
    children: [
      {
        path: 'my-orders',
        component: MyOrdersComponent,
        resolve: {
          data: MyOrdersService
        },
        data: {
          crumbs: [{
            label: 'Manage Orders'
          }, {
            label: 'My Orders'
          }]
        },
        canActivate: [BreadcrumbInitializedGuard]
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BoxSharedModule,
    BoxSidebarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatExpansionModule
  ],
  declarations: [
    ManageOrdersComponent,
    MyOrdersComponent,
    SidebarContentComponent
  ],
  providers: [
    MyOrdersService,
    BreadcrumbInitializedGuard
  ]
})
export class ManageOrdersModule { }
