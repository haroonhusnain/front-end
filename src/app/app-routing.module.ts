import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppWrapperComponent } from './app-wrapper/app-wrapper.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
import { WrapperResolver } from './resolvers/wrapper.resolver';
import { VerifyCodeComponent } from './authentication/verify-code/verify-code.component';


const routes: Routes = [
  {
    path: '',
    component: AppWrapperComponent,
    resolve: { response: WrapperResolver },
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: '',
        loadChildren: () => import('./main/main.module').then(m => m.MainModule)
      },
      {
        path: 'become-a-lugger',
        component: SignUpComponent
      },
      {
        path: 'verify-code',
        component: VerifyCodeComponent
      },
      // {
      //   path: 'dashboard',
      //   loadChildren: './dashboard/dashboard.module#DashboardModule',
      //   canActivate: [AuthGuard, ActiveBuddyGuard],
      //   resolve: { success: DashboardResolver },
      //   runGuardsAndResolvers: 'always'
      // },
      {
        path: 'reset-password',
        component: ResetPasswordComponent
      },
      {
        path: '**',
        loadChildren: () => import('./main/error-page/error-page.module').then(m => m.ErrorPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
