import {Component, OnInit, ViewChild, EventEmitter, Output} from "@angular/core";
import {CacheService} from "../../services/cache.service";
import {common} from "../../interfaces/common.interface";
import {MdSidenav, MdSnackBarConfig} from "@angular/material";
import {NewWorkoutService} from "../../services/new-workout.service";
import {Exercise} from "../../dao/exercise.dao";
import * as _ from 'underscore';
import ICurrentWorkout = common.ICurrentWorkout;
import {Plan} from "../../dao/plan.dao";
import ICurrentWorkoutExercise = common.ICurrentWorkoutExercise;
import {TranslateService} from "@ngx-translate/core";
import {SnackBarService} from "../../services/snackbar.service";
import {Workout} from "../../dao/workout.dao";

@Component({
    selector: 'new-workout',
    templateUrl: './new-workout.template.html',
    styleUrls: ['/new-workout.style.scss']
})

export class NewWorkoutComponent implements OnInit {
    @Output() onCloseSidenav = new EventEmitter();
    selectedDate: Date;
    selectedPlan: Plan;
    selectedWorkout: Workout;
    userPlans: Plan[];

    constructor(private newWorkoutService: NewWorkoutService,
                private cacheService: CacheService,
                private translateService: TranslateService,
                private snackBar: SnackBarService) {
    }

    ngOnInit(): void {
        this.cacheService.userPlans.subscribe((userPlans: Plan[]) => {
            this.userPlans = userPlans;
        });
    }

    public toggleWorkoutSideNav() {
        this.onCloseSidenav.emit();
    }

    public toggleExercise(exercise: Exercise): void {
        this.newWorkoutService.toggleExercise(exercise);
    }

    public toggleExerciseSuperset(exercise: ICurrentWorkoutExercise): void {
        if (exercise) {
            exercise.isSuperset = !exercise.isSuperset;
        }
    }

    public saveWorkout() {
        if (this.selectedPlan && this.selectedWorkout) {
            this.newWorkoutService.saveCurrentWorkout(this.selectedDate, this.selectedPlan, this.selectedWorkout);

            this.translateService.get('new-workout.workout-created').subscribe((message) => {
                this.snackBar.showSnackBar(message, 'success');
            });
        } else {
            this.translateService.get('new-workout.plan-not-selected').subscribe((message) => {
                this.snackBar.showSnackBar(message, 'error');
            });
        }
    }

    public toggleNewPlanDialog(): void {
        // let config = new MdSnackBarConfig();

    }

    public get currentWorkout(): ICurrentWorkout {
        return this.newWorkoutService.currentWorkout;
    }

}