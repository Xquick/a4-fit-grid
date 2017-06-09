import {Component, OnInit} from "@angular/core";

import * as moment from 'moment';
import {Exercise} from "../../dao/exercise.dao";
import {common} from "../../interfaces/common.interface";
import {FIT_CONFIG} from "../../app.config";
import * as _ from 'underscore';
import {CacheService} from "../../services/cache.service";
import ICurrentWorkout = common.ICurrentWorkout;
import {NewWorkoutService, IExerciseCheckboxMap} from "../../services/new-workout.service";

import IExerciseType = common.IExerciseType;
import IExerciseSchedule = common.ISchedule;
import ICalendarDays = common.ICalendarDays;

@Component({
    selector: 'grid',
    templateUrl: './grid.template.html',
    styleUrls: ['./grid.style.scss']
})

export class GridComponent implements OnInit {
    exerciseList: Exercise[];
    exerciseListByType: IExerciseType[];

    public calendarDays: ICalendarDays[] = [];

    constructor(private cacheService: CacheService,
                private newWorkoutService: NewWorkoutService) {
    }

    ngOnInit(): void {
        this.cacheService.exerciseList.subscribe((exerciseList: Exercise[]) => {
            this.exerciseList = exerciseList;
            this.exerciseListByType = this.cacheService.sortExercisesByTypes(exerciseList);
            this.initHistoryDates();
        });
    }

    public toggleExercise(exercise: Exercise) {
        this.newWorkoutService.toggleExercise(exercise);
    }

    get checkboxMap(): IExerciseCheckboxMap {
        return this.newWorkoutService.checkboxMap;
    }

    get currentWorkout(): ICurrentWorkout {
        return this.newWorkoutService.currentWorkout;
    }

    private initHistoryDates() {
        if (this.calendarDays.length === 0) {
            for (let i = 0; i < FIT_CONFIG.numberOfHistoryDays; i++) {
                let date: moment.Moment = moment();

                date = date.subtract(i, 'days');

                let calendarDay: ICalendarDays = <ICalendarDays>{};
                calendarDay.date = date;
                calendarDay.weekday = date.day();
                calendarDay.abbreviation = "";
                this.calendarDays.push(calendarDay);
            }
        }
    }
}
