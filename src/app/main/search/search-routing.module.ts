import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from "./search.component";
import { BreadcrumbInitializedGuard } from '@box/services/breadcrumb-initialized-guard.service';

const routes: Routes = [
  {
    path: ':keyword',
    component: SearchComponent,
    data: {
      crumbs: []
    },
    canActivate: [BreadcrumbInitializedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
