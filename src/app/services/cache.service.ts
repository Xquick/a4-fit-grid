import {common} from "../interfaces/common.interface";
import {response} from "../interfaces/response.interface";
import * as moment from 'moment';
import * as _ from 'underscore';

import {Exercise} from "../dto/exercise.dto";
import {Workout} from "../dto/workout.dto";
import {DataService} from "./data.service";
import {Subscription} from "rxjs";
import {Inject, OnInit} from "@angular/core";

import {FIT_CONFIG} from "../app.config";


export interface ICacheService {
    exerciseListByTypes: common.IExerciseType[];
    exerciseList: Exercise[];
    exercise: Exercise;
    userWorkouts: Workout[];
    currentWorkout: common.ICurrentWorkout;

    cacheUserWorkouts(): void;
    cacheExerciseList(): void;
    updateCacheExerciseHistory(workout: common.ICurrentWorkout): void;
}

export class CacheService implements ICacheService, OnInit {
    exerciseListByTypes: common.IExerciseType[];
    exerciseList: Exercise[];
    exercise: Exercise;
    private _userWorkouts: Workout[];
    private _currentWorkout: common.ICurrentWorkout;

    constructor(@Inject(DataService) private dataService: DataService) {
        this._userWorkouts = [];
        this.exerciseList = [];
        this.initCurrentWorkout();
    }

    ngOnInit(): void {
    }

    cacheExerciseList(): void {
        this.dataService.loadExerciseList().subscribe(exercises => {
            _.each(exercises, (exercise: response.IExercise) => {
                this.exerciseList.push(new Exercise(exercise));
            });

            this.cacheExerciseHistory();
        });
    }

    protected cacheExerciseHistory(): Subscription {
        return this.dataService.loadExerciseHistory()
            .subscribe((historyList) => {
                _.each(this.exerciseList, (exercise: Exercise) => {
                    _.each(historyList, (workoutHistory: response.IWorkoutHistory) => {
                        _.each(workoutHistory.schedule, (workoutSchedule: response.IWorkoutSchedule) => {
                            let scheduledExercise: response.IExerciseWithSchedule = <response.IExerciseWithSchedule>_.find(workoutSchedule.exerciseList, {name: exercise.name});

                            if (scheduledExercise !== undefined) {
                                if (exercise.schedule === undefined) {
                                    exercise.schedule = [];
                                }
                                exercise.schedule.push(<common.IExerciseSchedule>{
                                    date: moment(workoutSchedule.date, FIT_CONFIG.date.shortFormat),
                                    setList: scheduledExercise.setList
                                });
                            }
                        });
                    });
                });

                this.exerciseListByTypes = [];
                this.exerciseListByTypes = this.sortExercisesByTypes(this.exerciseList);
                console.log(this.exerciseListByTypes);
                return true;
            });
    }

    public updateCacheExerciseHistory(workout: common.ICurrentWorkout): void {
        _.each(workout.exerciseList, (exercise: common.ICurrentWorkoutExercise) => {
            let cachedExercise: Exercise = <Exercise>_.find(this.exerciseList, {id: exercise.id});
            if (!cachedExercise.hasOwnProperty('schedule')) {
                cachedExercise.schedule = [];
            }

            let schedule: common.IExerciseSchedule = <common.IExerciseSchedule>{
                date: workout.date,
                setList: []
            };

            cachedExercise.schedule.push(schedule);

            _.extend(_.findWhere(this.exerciseList, {id: exercise.id}), cachedExercise);
            this.exerciseListByTypes = this.sortExercisesByTypes(this.exerciseList);
        });
    }


    public cacheUserWorkouts(): void {
        this.dataService.loadUserWorkoutList().subscribe((workoutList: response.IWorkout[]): void => {
            if (_.isEmpty(this._userWorkouts)) {
                _.each(workoutList, (workout: response.IWorkout) => {
                    this._userWorkouts.push(new Workout(workout));
                });
            }
        });
    }


    public cacheCurrentWorkout(workoutDate) {
        this._currentWorkout.date = moment.unix(workoutDate.getTime() / 1000);
        this.dataService.persistWorkout(this._currentWorkout);
        this.updateCacheExerciseHistory(this._currentWorkout);
        this.initCurrentWorkout();
    }

    /*
     * **
     * Returns exercises sorted by their type (e.g. type: 'back', type: 'chest')
     *
     * @param exercises: Exercise[]
     * @returns {IExerciseType[]} resulting into structure e.g. {'chest': {[Exercise1, Exercise5]}, 'back': {[...]}}
     */
    private sortExercisesByTypes(exercises: Exercise[]): common.IExerciseType[] {
        let exerciseArr: {[key: string]: Exercise[]} = {};
        let exercisesByType: common.IExerciseType[] = [];

        _.each(exercises, exercise => {
            if (typeof exerciseArr[exercise.type] === 'undefined') {
                exerciseArr[exercise.type] = [];
            }
            let newExercise: Exercise = new Exercise(exercise);

            if (exercise.hasOwnProperty('schedule')) {
                newExercise.schedule = exercise.schedule;
            }
            exerciseArr[exercise.type].push(newExercise);

        });

        for (let key in exerciseArr) {
            let exerciseType: common.IExerciseType = <common.IExerciseType>{};

            exerciseType.name = key;
            exerciseType.exerciseList = exerciseArr[key];

            exercisesByType.push(exerciseType);
        }

        return exercisesByType;
    }


    private initCurrentWorkout() {
        this._currentWorkout = <common.ICurrentWorkout>{};
        this._currentWorkout.exerciseList = [];
        this._currentWorkout.exerciseMap = [];
    }


    get currentWorkout(): common.ICurrentWorkout {
        return this._currentWorkout;
    }

    set currentWorkout(value: common.ICurrentWorkout) {
        this._currentWorkout = value;
    }

    get userWorkouts(): Workout[] {
        return this._userWorkouts;
    }

    set userWorkouts(value: Workout[]) {
        this._userWorkouts = value;
    }

}
