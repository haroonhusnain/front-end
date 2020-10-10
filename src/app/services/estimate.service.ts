import { Injectable } from '@angular/core';
import { GlobalApiCallService } from '../helpers/global-service/global-api-call.service';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstimateService {
  public originSubject = new Subject<any>();
  public destinationSubject = new Subject<any>();

  private apikey = 'AIzaSyB8Ew5yi_m4X9Xrj0SSZMI2VhM8N8lYmcw';

  constructor(
    private globalApiCallService: GlobalApiCallService
  ) { }

  getAddress(lat, lng) {
    return this.globalApiCallService.getRequest(`
    https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${this.apikey}
      `);
  }

  getZipcode(lat, lng) {
    return this.globalApiCallService.getRequest(`
    http://api.geonames.org/findNearbyPostalCodesJSON?lat=${lat}&lng=${lng}&username=demo
      `);
  }

  checkZones(zipcode, selectedType) {
    return this.globalApiCallService.getRequest(`${environment.apiBase}/get-zone?zip_code=${zipcode}&type=${selectedType}`);
  }

  setLatLng(latLng, inputType) {
    if (inputType === 'origin') {
      this.originSubject.next(latLng);
    }
    if (inputType === 'destination') {
      this.destinationSubject.next(latLng);
    }
  }

  getTruckDetail(distance) {
    return this.globalApiCallService.getRequest(`${environment.apiBase}/get-trucks?kilometers=${distance}`);
  }

  getAllCategories() {
    return this.globalApiCallService.getRequest(`${environment.apiBase}/get-categories`);
  }

  getPackages(distance, categoryId) {
    return this.globalApiCallService.getRequest(`${environment.apiBase}/get-packages?distance=${distance}&category_id=${categoryId}`);
  }

}
