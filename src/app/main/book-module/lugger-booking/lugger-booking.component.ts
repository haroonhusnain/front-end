import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EstimateService } from 'src/app/services/estimate.service';
import { BookingService } from 'src/app/services/booking.service';
import { Utils } from 'src/app/utils';
import swal from 'sweetalert';
declare const google;

@Component({
  selector: 'app-lugger-booking',
  templateUrl: './lugger-booking.component.html',
  styleUrls: ['./lugger-booking.component.css']
})
export class LuggerBookingComponent implements OnInit, AfterViewInit {

  workingHours: any;
  deliveryDays: any = [
    {
      name: 'Monday',
      isDisabled: false
    },
    {
      name: 'Tuesday',
      isDisabled: false
    },
    {
      name: 'Wednesday',
      isDisabled: false
    },
    {
      name: 'Thursday',
      isDisabled: false
    },
    {
      name: 'Friday',
      isDisabled: false
    },
    {
      name: 'Saturday',
      isDisabled: false
    },
    {
      name: 'Sunday',
      isDisabled: false
    }
  ];
  pickupDays: any = [
    {
      name: 'Monday',
      isDisabled: false
    },
    {
      name: 'Tuesday',
      isDisabled: false
    },
    {
      name: 'Wednesday',
      isDisabled: false
    },
    {
      name: 'Thursday',
      isDisabled: false
    },
    {
      name: 'Friday',
      isDisabled: false
    },
    {
      name: 'Saturday',
      isDisabled: false
    },
    {
      name: 'Sunday',
      isDisabled: false
    }
  ];
  time: any = ['9am-10am', '10am-11am', '11am-12pm', '12pm-1pm', '1pm-2pm', '2pm-3pm', '3pm-4pm', '1pm-5pm', '6pm-7pm'];
  public dateTime1: Date;

  pickupLocation = { lat: null, lng: null };
  destinationLocation = { lat: null, lng: null };
  locations: any = [];
  inputLocations: any = [];
  truckDetails: any = [];
  originId: any;
  destinationId: any;
  distance: any;
  query: any;
  selectedTruck: any;

  isStatus = false;

  rulesData: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private estimateService: EstimateService,
    private bookingService: BookingService
  ) { }

  ngAfterViewInit() {
    this.initAutocomplete();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(queryParams => {
      this.query = queryParams;
      if (queryParams.originId && queryParams.destinationId) {
        this.originId = queryParams.originId;
        this.destinationId = queryParams.destinationId;

        this.pickupLocation = {
          lat: Number(queryParams.originId.split(':')[0]),
          lng: Number(queryParams.originId.split(':')[1])
        };
        this.destinationLocation = {
          lat: Number(queryParams.destinationId.split(':')[0]),
          lng: Number(queryParams.destinationId.split(':')[1])
        };
        this.calculateDistance('k');
        this.locations = [this.pickupLocation, this.destinationLocation];
        this.locations = [...this.locations];
        this.getCurrentLocationDetail();
      }
    });
  }

  getCurrentLocationDetail() {
    this.inputLocations = [];
    this.locations.forEach(element => {

      this.estimateService.getAddress(element.lat, element.lng).subscribe(data => {
        this.inputLocations.push(data.results[0]);
      }, err => { console.log(err); });

    });

  }

  checkAvailablitiy(type) {


    this.estimateService.getAddress(this.pickupLocation.lat, this.pickupLocation.lng).subscribe(data => {

      const places = data.results[0];
      places.address_components.forEach(element => {
        if (element.types[0] === 'postal_code') {
          const zipCode = element.long_name;
          this.checkZone(zipCode, type);
        }
      });
    }, err => { console.log(err); });
  }

  checkZone(zipcode, type) {
    Utils.blockPage();
    this.estimateService.checkZones(zipcode, type).subscribe(data => {

      this.isStatus = data.status;
      if (this.isStatus) {

        this.rulesData = data.data;

        if (type === 'Delievery') {
          this.deliveryDays = this.deliveryDays.map(x => {

            const isFilter = this.rulesData.days.find(y => y === x.name);
            return {
              ...x,
              isDisabled: isFilter ? true : false
            };
          });
        }
        if (type === 'Pickup') {

          this.pickupDays = this.pickupDays.map(x => {

            const isFilter = this.rulesData.days.find(y => y === x.name);
            return {
              ...x,
              isDisabled: isFilter ? true : false
            };
          });

        }

      } else {
        swal(data.message, 'We are not providing services in this area', 'error');
        Utils.showErrorMessage(data.message, 'error');
      }
    }, err => {
      console.log(err);
    }, () => {
      Utils.unblockPage();
    });
  }
  getZipCode() {

  }

  /**
   * Initialize autocomplete places input field
   */
  initAutocomplete() {

    const mapArea = new google.maps.Map(
      document.getElementById('map'), {
      zoom: 20,
      disableDefaultUI: true,
      title: 'Asset 1',
      mapTypeId: 'terrain',
      animation: google.maps.Animation.DROP,
    });

    const marker = new google.maps.Marker({
      position: this.pickupLocation.lat ? this.pickupLocation : { lat: 0, lng: 0 }, map: mapArea
    });

    const marker2 = new google.maps.Marker({
      position: this.destinationLocation.lat ? this.destinationLocation : { lat: 0, lng: 0 }, map: mapArea
    });

    const pathBetween = new google.maps.Polyline({
      path: [
        this.pickupLocation.lat ? this.pickupLocation : { lat: 0, lng: 0 },
        this.destinationLocation.lat ? this.destinationLocation : { lat: 0, lng: 0 }
      ],
      strokeColor: '#ea7c11',
      strokeOpacity: 2.0,
      strokeWeight: 4
    });

    pathBetween.setMap(mapArea);
    this.calculateDistance('k');
    const bounds = new google.maps.LatLngBounds();
    bounds.extend(this.pickupLocation.lat ? this.pickupLocation : { lat: 0, lng: 0 });
    bounds.extend(this.destinationLocation.lat ? this.destinationLocation : { lat: 0, lng: 0 });
    mapArea.fitBounds(bounds);

  }

  /**
   * To get detail of trucks
   * @param distance => calcualted distance
   */
  getTruckDetail(distance) {

    this.estimateService.getTruckDetail(distance).subscribe(data => {
      this.truckDetails = data;

      this.selectedTruck = this.truckDetails.find(x => x.id === Number(this.query.truckId));
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

  saveLuggerBooking(f) {

    const body: any = {
      name: f.value.first_name + ' ' + f.value.last_name,
      email: f.value.email,
      phone_number: f.value.phone_number,
      packageId: this.query.packageId,
      categoryId: this.query.categoryId,
      orgin: this.pickupLocation,
      destination: this.destinationLocation,
      time: f.value.time,
      description: f.value.description,
      deliveryDays: f.value.deliveryDays,
      pickupDays: f.value.pickupDays
    };

    if (body.deliveryDays && body.pickupDays) {
      Utils.blockPage();
      this.saveCall(body);
    } else {
      swal('Days!', 'Please select delivery and pickup days!', 'warning');
    }

  }

  saveCall(body) {
    this.bookingService.saveBooking(body).subscribe(data => {
      if (data.status) {
        swal('Email Sent!', 'Please Verify your Email!', 'warning');
        this.router.navigate(['verify-code']);
      }
    }, err => {
      console.log(err);
      Utils.showErrorMessage('Could not perform this action!', err);
    }, () => {
      Utils.unblockPage();
    });
  }
}
