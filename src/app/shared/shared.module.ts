import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeslotPickerComponent } from './timeslot-picker/timeslot-picker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [TimeslotPickerComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    TimeslotPickerComponent,
  ]
})
export class SharedModule { }
