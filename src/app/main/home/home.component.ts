import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
declare const google: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  origin = { lat: null, lng: null };
  destination = { lat: null, lng: null };
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initAutocomplete();
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
