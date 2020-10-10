import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'book',
    loadChildren: () => import('./book-module/book-module.module').then(m => m.BookModuleModule)
  },
  {
    path: 'estimate',
    loadChildren: () => import('./estimate/estimate.module').then(m => m.EstimateModule)
  },
  {
    path: 'services',
    loadChildren: () => import('./services/services.module').then(m => m.ServicesModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
