import {Component, ViewChild, AfterViewInit} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {CacheService} from "./services/cache.service";
import * as _ from 'underscore';
import {NewWorkoutComponent} from "./components/new-workout/new-workout.component";
import {NewWorkoutService} from "./services/new-workout.service";
import {MockNewWorkoutService} from "./mock/new-workout.service.mock";
import {MockDataService} from "./mock/data.service.mock";

@Component({
    selector: 'app',
    templateUrl: './app.template.html'
})

export class AppComponent {

    @ViewChild(NewWorkoutComponent) workoutComponent: NewWorkoutComponent;

    public workoutDate: Date;

    constructor(private cacheService: CacheService,
                private newWorkoutService: NewWorkoutService,
                translate: TranslateService) {

        translate.use('cz');

        cacheService.cacheExerciseList();
        cacheService.cacheUserPlans();
        this.newWorkoutService.updateCheckboxMap();
    }

    /***
     * Opens and closes md-sidenav - Current workout
     */
    public toggleWorkout() {
        this.workoutComponent.toggleWorkoutSideNav();
    }
}