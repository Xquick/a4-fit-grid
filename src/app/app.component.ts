import {Component, ViewChild, AfterViewInit, OnInit} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {CacheService} from "./services/cache.service";
import * as _ from 'underscore';
import {NewWorkoutComponent} from "./components/new-workout/new-workout.component";
import {NewWorkoutService} from "./services/new-workout.service";
import {MockNewWorkoutService} from "./mock/new-workout.service.mock";
import {MockDataService} from "./mock/data.service.mock";
import {AuthService} from "./services/auth.service";
import {ReplaySubject} from "rxjs";

@Component({
    selector: 'app',
    templateUrl: './app.template.html'
})

export class AppComponent implements OnInit {

    isAuthenticated: boolean;
    @ViewChild(NewWorkoutComponent) workoutComponent: NewWorkoutComponent;


    constructor(private cacheService: CacheService,
                private authService: AuthService,
                private newWorkoutService: NewWorkoutService,
                translate: TranslateService) {

        translate.use('cz');
    }

    ngOnInit(): void {
        this.authService.isAuthenticated.subscribe((isAuthenticated) => {
            this.isAuthenticated = isAuthenticated;

            if (isAuthenticated) {
                this.cacheService.cacheExerciseList();
                this.cacheService.cacheUserPlans();
                this.newWorkoutService.updateCheckboxMap();
            }
        });
    }

    /***
     * Opens and closes md-sidenav - Current workout
     */
    public toggleWorkout() {
        this.workoutComponent.toggleWorkoutSideNav();
    }
}