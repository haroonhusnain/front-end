import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EstimateService } from 'src/app/services/estimate.service';

@Component({
  selector: 'app-services-estimate',
  templateUrl: './services-estimate.component.html',
  styleUrls: ['./services-estimate.component.css']
})
export class ServicesEstimateComponent implements OnInit {

  originId: any;
  destinationId: any;
  categories: any = [];
  activeParam: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private estimateService: EstimateService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(query => {
      if (query.originId && query.destinationId) {
        this.activeParam = query;
      }
    });
    this.getAllCategories();
  }

  getAllCategories() {
    this.estimateService.getAllCategories().subscribe(data => {
      this.categories = data.data;
    });
  }

  /**
   * to navigate to other route using params
   * @param category => services
   */
  routeTo(category) {
    if (this.activeParam.originId) {

      this.router.navigate(['/estimate/destination'], {
        queryParams: {
          ...this.activeParam,
          use_case: category.name,
          categoryId: category.id
        }
      });

    } else {

      this.router.navigate(['/estimate/destination'], {
        queryParams: {
          use_case: category.name
        }
      });

    }

  }

}
