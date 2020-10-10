import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare const google: any;

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.initMap();
  }

  initMap() {
    const uluru = { lat: -25.344, lng: 131.036 };
    const map = new google.maps.Map(
      document.getElementById('map'), {
      zoom: 4,
      center: { lat: -33, lng: 151 },
      disableDefaultUI: true
    });
    // const marker = new google.maps.Marker({ position: uluru, map: map });
  }

  saveLocation(f) {
    console.log(f.value);
    this.router.navigate(['/book/product']);
  }

}
