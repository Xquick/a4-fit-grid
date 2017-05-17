import {Component, ViewChild, AfterViewInit} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {CacheService} from "./services/cache.service";
import * as _ from 'underscore';
import {common} from "./interfaces/common.interface";
import {Exercise} from "./dto/exercise.dto";
import * as moment from "moment";
import {DataService} from "./services/data.service";
import {MdSidenav} from "@angular/material";
import {WorkoutComponent} from "./components/workout/workout.component";

@Component({
    selector: 'app',
    templateUrl: './app.template.html'
})

export class AppComponent {

    @ViewChild(WorkoutComponent) workoutComponent: WorkoutComponent;

    public workoutDate: Date;

    constructor(private cacheService: CacheService,
                translate: TranslateService) {

        translate.use('cz');

        if (_.isEmpty(cacheService.exerciseList)) {
            cacheService.cacheExerciseList();
        }

    }

    public onDropExercise(index: number, type: string) {
        this.cacheService.currentWorkout.exerciseList.splice(index, 1);
    }

    /***
     * Opens and closes md-sidenav - Current workout
     */
    public toggleWorkout() {
        this.workoutComponent.toggleWorkoutSideNav();
    }

    public toggleExerciseSuperset(exerciseId: number): void {
        let exerciseMatch = _.find(this.cacheService.currentWorkout.exerciseList, {id: exerciseId});

        if (exerciseMatch) {
            exerciseMatch.isSuperset = !exerciseMatch.isSuperset;
        }
    }

    public saveWorkout() {
        this.cacheService.cacheCurrentWorkout(this.workoutDate);
    }
}