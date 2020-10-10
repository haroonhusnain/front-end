import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstimateComponent } from './estimate/estimate.component';
import { ServicesEstimateComponent } from './services-estimate/services-estimate.component';
import { MapInputEstimateComponent } from './map-input-estimate/map-input-estimate.component';


const routes: Routes = [
  {
    path: '',
    component: EstimateComponent,
    children: [
      {
        path: '',
        component: ServicesEstimateComponent
      },
      {
        path: 'destination',
        component: MapInputEstimateComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstimateRoutingModule { }
