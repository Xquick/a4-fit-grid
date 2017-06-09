import {Component, HostBinding, ViewChild} from "@angular/core";
import {CacheService} from "../../services/cache.service";
import {Plan} from "../../dao/plan.dao";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'plans',
    templateUrl: './plans.template.html'
})

export class PlansComponent {
    @HostBinding('class') classes = 'app-plans width-100';
    @ViewChild('myTable') table: any;

    userPlans: Plan[];
    selectedPlan: Plan;
    timeout: any;
    expanded: any = {};

    constructor(private cacheService: CacheService,
                private translateService: TranslateService) {

        this.cacheService.userPlans.subscribe((userPlans: Plan[]) => {
            this.userPlans = userPlans;
            this.selectedPlan = userPlans[0];
        });
    }

    getHeight(row: any, index: number): number {
        return row.someHeight;
    }

    onPage(event) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            console.log('paged!', event);
        }, 100);
    }

    fetch(cb) {
        const req = new XMLHttpRequest();
        req.open('GET', `assets/data/100k.json`);

        req.onload = () => {
            cb(JSON.parse(req.response));
        };

        req.send();
    }

    toggleExpandRow(row) {
        console.log('Toggled Expand Row!', row);
        this.table.rowDetail.toggleExpandRow(row);
    }

    onDetailToggle(event) {
        console.log('Detail Toggled', event);
    }
}
