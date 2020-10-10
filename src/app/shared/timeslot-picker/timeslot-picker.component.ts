import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { Utils } from './../../utils';

@Component({
  selector: 'app-timeslot-picker',
  templateUrl: './timeslot-picker.component.html',
  styleUrls: ['./timeslot-picker.component.css']
})
export class TimeslotPickerComponent implements OnInit, AfterViewInit {
  protected fb: FormBuilder = new FormBuilder();
  public checkboxForm: FormGroup;
  @Input() readonly = false;
  @Input() data;

  constructor() {

  }

  ngOnInit() {
    if (this.data) {
      this.data = this.data.map(x => {
        const hours = x.hours.split('|').map(y => y === '1');
        return hours;
      });
      const tempData = {
        mon: this.data[0],
        tue: this.data[1],
        wed: this.data[2],
        thu: this.data[3],
        fri: this.data[4],
        sat: this.data[5],
        sun: this.data[6],
      };
      this.data = tempData;
    }
    this.checkboxForm = new FormGroup({
      mon: this.fb.array(this.getTimeControlsArray('mon')),
      tue: this.fb.array(this.getTimeControlsArray('tue')),
      wed: this.fb.array(this.getTimeControlsArray('wed')),
      thu: this.fb.array(this.getTimeControlsArray('thu')),
      fri: this.fb.array(this.getTimeControlsArray('fri')),
      sat: this.fb.array(this.getTimeControlsArray('sat')),
      sun: this.fb.array(this.getTimeControlsArray('sun')),
    });
  }

  ngAfterViewInit() {
    Utils.initTabs();
  }

  /**
   * Get names of controls in form
   */
  protected get formControlNames() {
    const controls = [];
    for (const key in this.checkboxForm.controls) {
      if (true) {
        controls.push(key);
      }
    }
    return controls;
  }

  /**
   * Get FormArray instance
   * @param name e.g. mon, tue
   */
  protected getDayArray(name) {
    return this.checkboxForm.get(name) as FormArray;
  }

  /**
   * Setting up controls
   */
  protected getTimeControlsArray(day) {
    const timecontrols: Array<FormControl> = new Array<FormControl>();
    for (let index = 0; index < 17; index++) {
      console.log(this.data);
      
      timecontrols.push(this.fb.control({ value: this.data ? this.data[day][index] : false, disabled: this.readonly }));
    }
    return timecontrols;
  }

  /**
   * get data by parent
   */
  public getData() {
    const data = [];
    this.formControlNames.forEach(name => {
      const obj = {
        day: name,
        hours: this.getDayArray(name).value.map(x => x ? 1 : 0).join('|')
      };
      data.push(obj);
    });
    return data;
  }

}
