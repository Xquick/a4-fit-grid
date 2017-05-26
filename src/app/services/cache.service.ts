import {common} from "../interfaces/common.interface";
import {response} from "../interfaces/response.interface";
import * as moment from 'moment';
import * as _ from 'underscore';

import {Exercise} from "../dto/exercise.dto";
import {DataService} from "./data.service";
import {Observable, ReplaySubject, Subject} from "rxjs";
import {Inject} from "@angular/core";

import {FIT_CONFIG} from "../app.config";
import ICurrentWorkout = common.ICurrentWorkout;
import ICurrentWorkoutExercise = common.ICurrentWorkoutExercise;
import IExerciseSchedule = common.IExerciseSchedule;
import IExerciseType = common.IExerciseType;
import {Plan} from "../dto/plan.dto";

export interface ICacheService {
    exercise: Exercise;
    sortExercisesByTypes(exercises: Exercise[]): IExerciseType[];
    cacheUserPlans(): void;
    cacheExerciseList(): void;
    updateCacheExerciseHistory(workout: ICurrentWorkout): void;
}

export class CacheService implements ICacheService {
    private _exerciseListByTypes: ReplaySubject<IExerciseType[]>;
    private _exerciseList: ReplaySubject<Exercise[]>;
    private _userPlans: ReplaySubject<Plan[]>;

    exercise: Exercise;

    constructor(@Inject(DataService) private dataService: DataService) {
        this._userPlans = new ReplaySubject();
        this._exerciseList = new ReplaySubject();
        this._exerciseListByTypes = new ReplaySubject();
    }

    cacheExerciseList(): void {
        let returnExerciseList: Exercise[] = [];

        Observable.zip(
            this.dataService.loadExerciseList(),
            this.dataService.loadExerciseHistory())

            .subscribe(([exercises, historyList]) => {
                _.each(exercises, (exercise: response.IExercise) => {
                    returnExerciseList.push(new Exercise(exercise));
                });

                _.each(returnExerciseList, (exercise: Exercise) => {
                    _.each(historyList, (workoutHistory: response.IWorkoutHistory) => {
                        _.each(workoutHistory.schedule, (workoutSchedule: response.IWorkoutSchedule) => {
                            let scheduledExercise: response.IExerciseWithSchedule = <response.IExerciseWithSchedule>_.find(workoutSchedule.exerciseList, {name: exercise.name});

                            if (scheduledExercise !== undefined) {
                                if (exercise.schedule === undefined) {
                                    exercise.schedule = [];
                                }
                                exercise.schedule.push(<IExerciseSchedule>{
                                    date: moment(workoutSchedule.date, FIT_CONFIG.date.longFormat),
                                    setList: scheduledExercise.setList
                                });
                            }
                        });
                    });
                });
                this.setExerciseList(returnExerciseList);
            });
    }

    public updateCacheExerciseHistory(workout: ICurrentWorkout): void {
        console.log(workout);
        _.each(workout.exerciseList, (exercise: ICurrentWorkoutExercise) => {

            this.getExerciseById(exercise.id, (cachedExercise) => {
                if (!cachedExercise.hasOwnProperty('schedule')) {
                    cachedExercise.schedule = [];
                }

                let schedule: IExerciseSchedule = <IExerciseSchedule>{
                    date: workout.date,
                    setList: []
                };

                cachedExercise.schedule.push(schedule);

                _.extend(_.findWhere(this.exerciseList, {id: exercise.id}), cachedExercise);
            });

        });
    }

    public cacheUserPlans(): void {
        let returnPlanList: Plan[] = [];
        this.dataService.loadUserPlanList().subscribe((planList: response.IPlan[]): void => {
            _.each(planList, (plan: response.IPlan) => {
                returnPlanList.push(new Plan(plan));
            });
            this.setUserPlans(returnPlanList);
        });
    }

    /*
     * **
     * Returns exercises sorted by their type (e.g. type: 'back', type: 'chest')
     *
     * @param exercises: Exercise[]
     * @returns {IExerciseType[]} resulting into structure e.g. {'chest': {[Exercise1, Exercise5]}, 'back': {[...]}}
     */
    public sortExercisesByTypes(exercises: Exercise[]): IExerciseType[] {
        let exerciseArr: {[key: string]: Exercise[]} = {};
        let exercisesByType: IExerciseType[] = [];

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
            let exerciseType: IExerciseType = <IExerciseType>{};

            exerciseType.name = key;
            exerciseType.exerciseList = exerciseArr[key];

            exercisesByType.push(exerciseType);
        }

        return exercisesByType;
    }

    getExerciseById(exerciseId: number, callback: (response: Exercise) => void) {
        return this.exerciseList.map((exerciseList) => {
            let exercise = _.find(exerciseList, {id: exerciseId});
            callback(exercise);
        }).subscribe();
    }

    get exerciseListByTypes(): Observable<IExerciseType[]> {
        return this._exerciseListByTypes;
    }

    setExerciseListByTypes(value: IExerciseType[]) {
        this._exerciseListByTypes.next(value);
    }

    get exerciseList(): ReplaySubject<Exercise[]> {
        return this._exerciseList;
    }

    setExerciseList(value: Exercise[]) {
        this._exerciseList.next(value);
    }

    get userPlans(): ReplaySubject<Plan[]> {
        return this._userPlans;
    }

    setUserPlans(value: Plan[]) {
        this._userPlans.next(value);
    }
}
