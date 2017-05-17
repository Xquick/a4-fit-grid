import {Component, OnInit, ViewChild} from "@angular/core";
import {CacheService} from "../../services/cache.service";
import {common} from "../../interfaces/common.interface";
import {MdSidenav} from "@angular/material";
import {NewWorkoutService} from "../../services/new-workout.service";
import {Exercise} from "../../dto/exercise.dto";
@Component({
    selector: '[workout]',
    templateUrl: 'workout.template.html'
})

export class WorkoutComponent implements OnInit {

    @ViewChild('sidenav') sidenav: MdSidenav;
    currentWorkout: common.ICurrentWorkout;

    constructor(private cacheService: CacheService,
                private newWorkoutService: NewWorkoutService) {
    }

    ngOnInit(): void {
        this.currentWorkout = this.cacheService.currentWorkout;
    }

    toggleWorkoutSideNav(){
        this.sidenav.toggle();
    }

    toggleExercise(exercise: Exercise): void {
        this.newWorkoutService.toggleExercise(exercise);
    }
}