import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from 'src/app/services/booking.service';
import { EstimateService } from 'src/app/services/estimate.service';
import { Utils } from 'src/app/utils';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, AfterViewInit {

  selectedTruck: any;
  trucksDetail: any = [];
  query: any;
  packageItems: any = [];
  packageTotal: any;

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private estimateService: EstimateService,
    private router: Router
  ) {
    this.route.queryParams.subscribe(queryParam => {
      this.query = queryParam;
      this.selectedTruck = queryParam.truckId;
      this.getTrucks(this.query.distance);
    });
  }

  ngOnInit() { }

  getTrucks(distance) {

    this.estimateService.getPackages(distance, this.query.categoryId).subscribe(data => {
      this.trucksDetail = data.data;
    });

  }

  getPackageDetail(truck) {
    const packageDetail: any = this.trucksDetail.find(x => x.id === Number(truck.id));
    this.packageTotal = packageDetail.charges;
    this.packageItems = packageDetail.package_items;
  }

  ngAfterViewInit() {
    Utils.initNavbar();
    Utils.initTabs();
  }

  showLoginDialog() {
    Utils.showMagnificPopup('#small-dialog-2');
  }

  routeTo() {
    this.router.navigate(['/book/lugger'], {
      queryParams: this.query,
    });
  }

}
