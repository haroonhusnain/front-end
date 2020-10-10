import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstimateRoutingModule } from './estimate-routing.module';
import { EstimateComponent } from './estimate/estimate.component';
import { ServicesEstimateComponent } from './services-estimate/services-estimate.component';
import { MapInputEstimateComponent } from './map-input-estimate/map-input-estimate.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [EstimateComponent, ServicesEstimateComponent, MapInputEstimateComponent],
  imports: [
    CommonModule,
    EstimateRoutingModule,
    FormsModule
  ]
})
export class EstimateModule { }
