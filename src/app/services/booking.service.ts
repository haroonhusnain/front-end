import { Injectable } from '@angular/core';
import { GlobalApiCallService } from '../helpers/global-service/global-api-call.service';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  public trucks = new Subject<any>();

  constructor(
    private globalApiCallService: GlobalApiCallService
  ) { }

  setTrucks(trucks) {
    this.trucks.next(trucks);
  }

  saveBooking(body) {
    return this.globalApiCallService.postRequest(`${environment.apiBase}/book`, body);
  }
}
