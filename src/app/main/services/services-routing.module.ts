import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllServicesComponent } from './all-services/all-services.component';
import { StoreDeliveryComponent } from './store-delivery/store-delivery.component';
import { SmallMovesComponent } from './small-moves/small-moves.component';
import { CraigslistDeliveryComponent } from './craigslist-delivery/craigslist-delivery.component';
import { StorageMovesComponent } from './storage-moves/storage-moves.component';
import { DonationsComponent } from './donations/donations.component';
import { JunkRemovalComponent } from './junk-removal/junk-removal.component';


const routes: Routes = [
  {
    path: 'store-delivery',
    component: StoreDeliveryComponent
  },
  {
    path: 'small-moves',
    component: SmallMovesComponent
  },
  {
    path: 'craigslist-delivery',
    component: CraigslistDeliveryComponent
  },
  {
    path: 'storage-moves',
    component: StorageMovesComponent
  },
  {
    path: 'donations',
    component: DonationsComponent
  },
  {
    path: 'junk-removal',
    component: JunkRemovalComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
