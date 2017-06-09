import {CacheService} from "./cache.service";
import {Exercise} from "../dao/exercise.dao";
import {common} from "../interfaces/common.interface";
import * as _ from 'underscore';
import * as moment from 'moment';
import {Inject, OnInit} from "@angular/core";
import IExerciseSchedule = common.ISchedule;
import ICurrentWorkout = common.ICurrentWorkout;
import {DataService} from "./data.service";
import {Plan} from "../dao/plan.dao";
import {Workout} from "../dao/workout.dao";


export interface IExerciseCheckboxMap {
    history: boolean[][];
    current: boolean[]
}

export class NewWorkoutService {

    checkboxMap: IExerciseCheckboxMap;
    _currentWorkout: ICurrentWorkout;

    constructor(@Inject(CacheService) private cacheService: CacheService,
                @Inject(DataService) private dataService: DataService) {

        this.initCurrentWorkout();
    }

    /***
     * Adds/Removes exercise into the current workout
     * @param exercise
     */
    public toggleExercise(exercise: Exercise) {
        let selectedExerciseList: common.ICurrentWorkoutExercise[] = this.currentWorkout.exerciseList;
        let exerciseExists = _.find(selectedExerciseList, {name: exercise.name});

        if (!exerciseExists) {
            this.checkboxMap.current[exercise.id] = true;
            this.currentWorkout.exerciseList.push({
                id: exercise.id,
                name: exercise.name,
                type: exercise.type,
                isSuperset: false
            });
        } else {
            this.checkboxMap.current[exercise.id] = false;
            this.currentWorkout.exerciseList = <common.ICurrentWorkoutExercise[]>_.without(selectedExerciseList, _.findWhere(selectedExerciseList, {id: exercise.id}));
        }
    }

    /**
     * Creates map containing boolean information which checkboxes should be ticked
     */
    public updateCheckboxMap(): void {
        this.checkboxMap = <IExerciseCheckboxMap>{};
        this.checkboxMap.current = [];
        this.checkboxMap.history = [];

        this.cacheService.exerciseList.subscribe((exerciseList: Exercise[]) => {

            _.each(exerciseList, (exercise: Exercise) => {
                this.checkboxMap.history[exercise.id] = [];

                if (exercise.hasOwnProperty('schedule')) {
                    _.each(exercise.schedule, (scheduleItem: IExerciseSchedule) => {
                        let today: moment.Moment = moment();
                        let daysAgo = today.diff(scheduleItem.date, 'days');
                        this.checkboxMap.history[exercise.id][daysAgo] = true;
                    });
                }
            });
        });
    }

    public saveCurrentWorkout(workoutDate: Date, selectedPlan: Plan, selectedWorkout: Workout) {
        if (workoutDate) {
            this._currentWorkout.date = moment.unix(workoutDate.getTime() / 1000);
        }

        if (selectedPlan) {
            this.currentWorkout.plan = selectedPlan;
        }

        this.dataService.persistWorkout(this._currentWorkout).subscribe(() => {
            this.cacheService.updateCacheExerciseHistory(this._currentWorkout);
            this.cacheService.cacheUserPlans();
            this.updateCheckboxMap();

            //clear workout after it is saved
            this.initCurrentWorkout();
        });

    }

    get currentWorkout(): ICurrentWorkout {
        return this._currentWorkout;
    }

    set currentWorkout(value: ICurrentWorkout) {
        this._currentWorkout = value;
    }

    private initCurrentWorkout() {
        this._currentWorkout = <ICurrentWorkout>{};
        this._currentWorkout.exerciseList = [];
    }
}