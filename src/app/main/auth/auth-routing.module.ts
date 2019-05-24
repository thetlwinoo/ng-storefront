import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NonAuthGuardService } from "@box/services/e-commerce/non-auth-guard.service";
import { BreadcrumbInitializedGuard } from '@box/services/breadcrumb-initialized-guard.service';

const routes: Routes = [
  {
    path: 'login',
    component: SigninComponent,
    canActivate: [
      NonAuthGuardService,
      BreadcrumbInitializedGuard
    ],
    data: {
      crumbs: [{
        label: 'signin'
      }]
    }
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [
      NonAuthGuardService,
      BreadcrumbInitializedGuard
    ],
    data: {
      crumbs: [{
        label: 'signup'
      }]
    }
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [
      NonAuthGuardService,
      BreadcrumbInitializedGuard
    ],
    data: {
      crumbs: [{
        label: 'forgot password'
      }]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    BreadcrumbInitializedGuard
  ]
})
export class AuthRoutingModule { }
