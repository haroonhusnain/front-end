import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllBookServicesComponent } from './all-book-services/all-book-services.component';
import { ProductComponent } from './product/product.component';
import { LocationComponent } from './location/location.component';
import { LuggerBookingComponent } from './lugger-booking/lugger-booking.component';


const routes: Routes = [
  {
    path: '',
    component: AllBookServicesComponent
  },
  {
    path: 'product',
    component: ProductComponent
  },
  {
    path: 'location',
    component: LocationComponent
  },
  {
    path: 'lugger',
    component: LuggerBookingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookModuleRoutingModule { }
