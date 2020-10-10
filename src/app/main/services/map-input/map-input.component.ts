import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
declare const google;

@Component({
  selector: 'app-map-input',
  templateUrl: './map-input.component.html',
  styleUrls: ['./map-input.component.css']
})
export class MapInputComponent implements OnInit, AfterViewInit {

  origin = { lat: null, lng: null };
  destination = { lat: null, lng: null };
  @Input() serviceType: any;
  constructor(
    private router: Router
  ) { }

  ngAfterViewInit() {
    this.initAutocomplete();
  }

  ngOnInit() {
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
      }
    });

    searchBox2.addListener('places_changed', () => {
      const places = searchBox2.getPlaces();
      if (places.length === 0) {
        return;
      } else {
        this.destination.lat = places[0].geometry.location.lat();
        this.destination.lng = places[0].geometry.location.lng();
      }
    });
  }

  getEstimate() {

    if ((this.origin.lat && this.origin.lng) && (this.destination.lat && this.destination.lng)) {
      this.router.navigate(['/estimate'], {
        queryParams: {
          originId: this.origin.lat + ':' + this.origin.lng,
          destinationId: this.destination.lat + ':' + this.destination.lng
        }
      });
    }
  }
}
