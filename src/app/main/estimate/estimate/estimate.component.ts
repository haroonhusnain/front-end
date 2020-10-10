import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EstimateService } from 'src/app/services/estimate.service';
declare const google: any;

@Component({
  selector: 'app-estimate',
  templateUrl: './estimate.component.html',
  styleUrls: ['./estimate.component.css']
})
export class EstimateComponent implements OnInit {
  origin = { lat: null, lng: null };
  destination = { lat: null, lng: null };

  constructor(
    private route: ActivatedRoute,
    private esitmateService: EstimateService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(query => {

      if (query.originId && query.destinationId) {
        const queryOrigin = query.originId.split(':');
        const queryDestination = query.destinationId.split(':');
        this.origin = { lat: Number(queryOrigin[0]), lng: Number(queryOrigin[1]) };
        this.destination = { lat: Number(queryDestination[0]), lng: Number(queryDestination[1]) };
        this.initMap();
      } else {
        this.staticMap();
      }


    });

    this.getSelectedArea();

  }

  staticMap() {
    const uluru = { lat: -25.344, lng: 131.036 };
    const map = new google.maps.Map(
      document.getElementById('map'), {
      zoom: 4,
      center: { lat: -33, lng: 151 },
      disableDefaultUI: true
    });
  }

  initMap() {
    const mapArea = new google.maps.Map(
      document.getElementById('map'), {
      zoom: 50,
      disableDefaultUI: true,
      title: 'Asset 1',
      mapTypeId: 'terrain',
      animation: google.maps.Animation.DROP,
    });
    const marker = new google.maps.Marker({ position: this.origin.lat ? this.origin : { lat: 0, lng: 0 }, map: mapArea });
    const marker2 = new google.maps.Marker({ position: this.destination.lat ? this.destination : { lat: 0, lng: 0 }, map: mapArea });

    const pathBetween = new google.maps.Polyline({
      path: [this.origin.lat ? this.origin : { lat: 0, lng: 0 }, this.destination.lat ? this.destination : { lat: 0, lng: 0 }],
      strokeColor: '#ea7c11',
      strokeOpacity: 2.0,
      strokeWeight: 4
    });

    pathBetween.setMap(mapArea);

    const bounds = new google.maps.LatLngBounds();
    bounds.extend(this.origin.lat ? this.origin : { lat: 0, lng: 0 });
    bounds.extend(this.destination.lat ? this.destination : { lat: 0, lng: 0 });
    mapArea.fitBounds(bounds);
  }

  getSelectedArea() {
    this.esitmateService.originSubject.subscribe(data => {
      this.origin = data;
      this.initMap();
    });

    this.esitmateService.destinationSubject.subscribe(data => {
      this.destination = data;
      this.initMap();
    });

  }
}
