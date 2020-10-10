import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { AllServicesComponent } from './all-services/all-services.component';
import { StoreDeliveryComponent } from './store-delivery/store-delivery.component';
import { SmallMovesComponent } from './small-moves/small-moves.component';
import { CraigslistDeliveryComponent } from './craigslist-delivery/craigslist-delivery.component';
import { StorageMovesComponent } from './storage-moves/storage-moves.component';
import { DonationsComponent } from './donations/donations.component';
import { JunkRemovalComponent } from './junk-removal/junk-removal.component';
import { MapInputComponent } from './map-input/map-input.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AllServicesComponent,
    StoreDeliveryComponent,
    SmallMovesComponent,
    CraigslistDeliveryComponent,
    StorageMovesComponent,
    DonationsComponent,
    JunkRemovalComponent,
    MapInputComponent
  ],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    FormsModule
  ]
})
export class ServicesModule { }
