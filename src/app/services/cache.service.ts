import {common} from "../interfaces/common.interface";
import {response} from "../interfaces/response.interface";
import * as moment from 'moment';
import * as _ from 'underscore';

import {Exercise} from "../dao/exercise.dao";
import {DataService} from "./data.service";
import {Observable, ReplaySubject} from "rxjs";
import {Inject} from "@angular/core";

import {FIT_CONFIG} from "../app.config";
import ICurrentWorkout = common.ICurrentWorkout;
import ICurrentWorkoutExercise = common.ICurrentWorkoutExercise;
import IExerciseSchedule = common.IExerciseSchedule;
import IExerciseType = common.IExerciseType;
import {Plan} from "../dao/plan.dao";
import ISet = common.ISet;

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
        let exercises: Exercise[] = [];

        Observable.zip(
            this.dataService.loadExerciseList(),
            this.dataService.loadSchedule())
            .subscribe(([exercisesResponse, schedulesResponse]) => {
                _.each(exercisesResponse, (exercise: response.IExercise) => {
                    exercises.push(new Exercise(exercise));
                });

                _.each(exercises, (exercise: Exercise) => {
                    _.each(schedulesResponse, (plan: response.IPlan) => {
                        _.each(plan.workoutGroups, (workoutGroup: response.IWorkoutGroup) => {
                            _.each(workoutGroup.workouts, (workout: response.IWorkout) => {
                                _.each(workout.schedules, (schedule: response.ISchedule) => {
                                    let exerciseLookup: response.IExercise = <response.IExercise>_.find(schedule.exercises, {name: exercise.name});
                                    if (exerciseLookup !== undefined) {
                                        exercise.updateSchedule(new Date(schedule.date), exerciseLookup.scheduledSets);
                                    }
                                });
                            });
                        });
                    });
                });
                this.setExerciseList(exercises);
            });
    }

    public updateCacheExerciseHistory(workout: ICurrentWorkout): void {
        _.each(workout.exerciseList, (exercise: ICurrentWorkoutExercise) => {

            this.getExerciseById(exercise.id, (cachedExercise) => {
                if (!cachedExercise.hasOwnProperty('schedule')) {
                    cachedExercise.schedule = [];
                }

                let schedule: IExerciseSchedule = <IExerciseSchedule>{
                    date: workout.date,
                    sets: <ISet[]>[]
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
            exerciseType.exercises = exerciseArr[key];

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
