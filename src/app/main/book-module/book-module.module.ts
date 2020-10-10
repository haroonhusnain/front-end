import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookModuleRoutingModule } from './book-module-routing.module';
import { AllBookServicesComponent } from './all-book-services/all-book-services.component';
import { ProductComponent } from './product/product.component';
import { LocationComponent } from './location/location.component';
import { FormsModule } from '@angular/forms';
import { LuggerBookingComponent } from './lugger-booking/lugger-booking.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';


@NgModule({
  declarations: [AllBookServicesComponent, ProductComponent, LocationComponent, LuggerBookingComponent],
  imports: [
    CommonModule,
    BookModuleRoutingModule,
    FormsModule,
    SharedModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ]
})
export class BookModuleModule { }
