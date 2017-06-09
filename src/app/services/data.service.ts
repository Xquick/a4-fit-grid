import {common} from "../interfaces/common.interface";
import {response} from "../interfaces/response.interface";
import {Exercise} from "../dao/exercise.dao";
import {Observable} from "rxjs";
import {Inject} from "@angular/core";
import * as _ from "underscore";
import {FIT_CONFIG} from "../app.config";
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';

import IWorkout = common.IWorkoutGroup;
import ICurrentWorkout = common.ICurrentWorkout;
import IExerciseType = common.IExerciseType;
import IExercise = response.IExercise;


export interface IDataService {
    loadExerciseList(): Observable<IExercise[]>;
    loadSchedule(): Observable<response.IWorkoutHistory[]>;
    loadUserPlanList(): Observable<response.IPlan[]>;
    getExerciseDetail(exerciseId: number): Exercise;
    persistWorkout(workout: ICurrentWorkout): void;
}

export class DataService implements IDataService {
    public exerciseListByTypes: IExerciseType[];
    public exerciseList: Exercise[];
    public exercise: Exercise;

    constructor(@Inject(AuthHttp) protected authHttp: AuthHttp) {
        this.exerciseListByTypes = [];
    }

    loadExerciseList(): Observable<response.IExercise[]> {
        return this.authHttp.get(FIT_CONFIG.api.url + 'exercises/')
            .map((response: any) => {
                return <response.IExercise[]>response.json().exercises;
            });
    }

    loadSchedule(): Observable<response.IWorkoutHistory[]> {
        return this.authHttp.get(FIT_CONFIG.api.url + 'users/' + 1 + '/schedule')
            .map((response: any) => {
                return response.json();
            });
    }

    getExerciseDetail(exerciseId: number): Exercise {
        return <Exercise>_.find(this.exerciseList, {'id': exerciseId});
    }

    loadUserPlanList(): Observable<response.IPlan[]> {
        return this.authHttp.get(FIT_CONFIG.api.url + 'users/' + 1 + '/plans')
            .map((response) => {
                return <response.IPlan[]>response.json();
            });
    }

    persistWorkout(workout: ICurrentWorkout): Observable<boolean> {
        let workoutPostData = {
            id: 1,
            name: workout.name,
            planId: workout.plan.id,
            exerciseList: workout.exerciseList
        };

        if (workout.date) {
            workoutPostData['date'] = workout.date.format(FIT_CONFIG.date.longFormat);
        }

        return this.authHttp.post(FIT_CONFIG.api.url + 'users/' + 1 + '/workouts', workoutPostData).map(response => {
            return true;
        });
    }
}
