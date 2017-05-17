import {Component, Inject, OnInit, Output, EventEmitter} from "@angular/core";
import {MdDialog} from "@angular/material";

import * as moment from 'moment';
import {Exercise} from "../../dto/exercise.dto";
import {common} from "../../interfaces/common.interface";
import {FIT_CONFIG} from "../../app.config";
import * as _ from 'underscore';
import {CacheService} from "../../services/cache.service";
import ICurrentWorkout = common.ICurrentWorkout;
import {NewWorkoutService} from "../../services/new-workout.service";

@Component({
    selector: 'grid',
    templateUrl: './grid.template.html',
    styleUrls: ['./grid.style.scss']
})

export class GridComponent implements OnInit {

    @Output() exerciseToggled = new EventEmitter();
    currentWorkout: ICurrentWorkout;
    public calendarDays: common.ICalendarDays[] = [];

    constructor(private mdDialog: MdDialog,
                private cacheService: CacheService,
                private newWorkoutService: NewWorkoutService) {
        this.initHistoryDates();
    }

    ngOnInit(): void {
        this.currentWorkout = this.cacheService.currentWorkout;
    }

    public toggleExercise(exercise: Exercise) {
        this.newWorkoutService.toggleExercise(exercise);
    }

    public didExerciseOccurreOnThisDay(exercise: Exercise, day: common.ICalendarDays): boolean {
        let occurred = false;
        if (exercise.hasOwnProperty('schedule')) {
            _.each(exercise.schedule, (scheduleItem: common.IExerciseSchedule) => {
                if (moment(day.date.format(FIT_CONFIG.date.mediumFormat)).isSame(moment(scheduleItem.date.format(FIT_CONFIG.date.mediumFormat)))) {
                    occurred = true;
                }
            });

            return occurred;
        } else {
            return false;
        }
    }

    private initHistoryDates() {
        for (let i = 0; i < 10; i++) {
            let date: moment.Moment = moment();

            date = date.subtract(i, 'days');

            let calendarDay: common.ICalendarDays = <common.ICalendarDays>{};
            calendarDay.date = date;
            calendarDay.weekday = date.day();
            calendarDay.abbreviation = "";
            this.calendarDays.push(calendarDay);
        }
    }
}