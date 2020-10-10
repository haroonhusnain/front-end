import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { EstimateService } from 'src/app/services/estimate.service';
import { BookingService } from 'src/app/services/booking.service';
declare const google;

@Component({
  selector: 'app-map-input-estimate',
  templateUrl: './map-input-estimate.component.html',
  styleUrls: ['./map-input-estimate.component.css']
})
export class MapInputEstimateComponent implements OnInit, AfterViewInit {

  activateRoute: any;
  pickupLocation = { lat: null, lng: null };
  destinationLocation = { lat: null, lng: null };
  locations: any = [];
  inputLocations: any = [];
  origin = { lat: null, lng: null };
  destination = { lat: null, lng: null };
  truckDetails: any = [];
  originId: any;
  destinationId: any;
  distance: any;
  categoryId: any;

  constructor(
    private route: ActivatedRoute,
    public esitmateService: EstimateService,
    private router: Router,
    private bookingService: BookingService
  ) { }

  ngAfterViewInit() {
    this.initAutocomplete();
  }

  ngOnInit() {

    this.route.queryParams.subscribe(queryParams => {

      this.activateRoute = queryParams.use_case;
      if (queryParams.originId && queryParams.destinationId) {
        this.originId = queryParams.originId;
        this.destinationId = queryParams.destinationId;
        this.categoryId = queryParams.categoryId;

        this.pickupLocation = {
          lat: Number(queryParams.originId.split(':')[0]),
          lng: Number(queryParams.originId.split(':')[1])
        };
        this.destinationLocation = {
          lat: Number(queryParams.destinationId.split(':')[0]),
          lng: Number(queryParams.destinationId.split(':')[1])
        };
        this.calculateDistance('m');
        this.locations = [this.pickupLocation, this.destinationLocation];
        this.locations = [...this.locations];
        this.getCurrentLocationDetail();
      }

    });
  }

  getCurrentLocationDetail() {
    this.inputLocations = [];
    this.locations.forEach(element => {

      this.esitmateService.getAddress(element.lat, element.lng).subscribe(data => {
        this.inputLocations.push(data.results[0]);
      }, err => { console.log(err); });

    });

  }

  /**
   * Initialize autocomplete places input field
   */
  initAutocomplete() {
    const originInput = document.getElementById('origin-input');
    const destinationInput = document.getElementById('destination-input');

    const searchBox = new google.maps.places.SearchBox(originInput);
    const searchBox2 = new google.maps.places.SearchBox(destinationInput);

    searchBox.addListener('places_changed', () => {

      const places = searchBox.getPlaces();
      if (places.length === 0) {
        return;
      } else {
        this.origin.lat = places[0].geometry.location.lat();
        this.origin.lng = places[0].geometry.location.lng();
        if (this.origin.lat && this.origin.lng) {
          this.esitmateService.setLatLng(this.origin, 'origin');
          this.calculateDistance('m');
        }
      }

    });

    searchBox2.addListener('places_changed', () => {

      const places = searchBox2.getPlaces();
      if (places.length === 0) {
        return;
      } else {
        this.destination.lat = places[0].geometry.location.lat();
        this.destination.lng = places[0].geometry.location.lng();
        if (this.destination.lat && this.destination.lng) {
          this.esitmateService.setLatLng(this.destination, 'destination');
          this.calculateDistance('m');
        }
      }

    });
  }

  /**
   * To get detail of trucks
   * @param distance => calcualted distance
   */
  getTruckDetail(distance) {

    this.esitmateService.getPackages(distance, this.categoryId).subscribe(data => {
      this.truckDetails = data.data;
    });

  }

  /**
   * To calculate distance between two points
   * @param unit => Kilometer = k, Meter = m
   */
  calculateDistance(unit) {
    if ((this.pickupLocation.lat === this.destinationLocation.lat) && (this.pickupLocation.lng === this.destinationLocation.lng)) {
      return 0;
    } else {

      const radlat1 = Math.PI * this.pickupLocation.lat / 180;
      const radlat2 = Math.PI * this.destinationLocation.lat / 180;
      const theta = this.pickupLocation.lng - this.destinationLocation.lng;
      const radtheta = Math.PI * theta / 180;

      let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }

      dist = Math.acos(dist);
      dist = dist * 180 / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit === 'K') { dist = dist * 1.609344; }
      if (unit === 'N') { dist = dist * 0.8684; }

      this.distance = dist.toFixed(2);
      this.getTruckDetail(this.distance);
      return dist.toFixed(2);
    }
  }

  routeTo(truckDetail) {
    if (this.originId && this.destinationId && this.activateRoute) {

      this.router.navigate(['/book/product'], {
        queryParams: {
          originId: this.originId,
          destinationId: this.destinationId,
          use_case: this.activateRoute,
          categoryId: this.categoryId,
          packageId: truckDetail.id,
          distance: this.distance
        }
      });

    }

  }

}
