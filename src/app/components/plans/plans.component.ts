import {Component} from "@angular/core";
import {CacheService} from "../../services/cache.service";
import {Plan} from "../../dto/plan.dto";

@Component({
    selector: 'plans',
    templateUrl: './plans.template.html'
})

export class PlansComponent {
    userPlans: Plan[];

    constructor(private cacheService: CacheService) {

        this.cacheService.userPlans.subscribe((userPlans: Plan[]) => {
            this.userPlans = userPlans;
        });
    }
}
