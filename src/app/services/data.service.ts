import {common} from "../interfaces/common.interface";
import {response} from "../interfaces/response.interface";
import {Exercise} from "../dto/exercise.dto";
import {Observable} from "rxjs";
import {Http} from "@angular/http";
import {Inject} from "@angular/core";
import * as _ from "underscore";
import {FIT_CONFIG} from "../app.config";

import IWorkout = common.IWorkout;
import ICurrentWorkout = common.ICurrentWorkout;
import IExerciseType = common.IExerciseType;


export interface IDataService {
    loadExerciseList(): Observable<Exercise[]>;
    loadExerciseHistory(): Observable<response.IWorkoutHistory[]>;
    loadUserPlanList(): Observable<response.IPlan[]>;
    getExerciseDetail(exerciseId: number): Exercise;
    persistWorkout(workout: ICurrentWorkout): void;
}

export class DataService implements IDataService {
    public exerciseListByTypes: IExerciseType[];
    public exerciseList: Exercise[];
    public exercise: Exercise;

    constructor(@Inject(Http) protected http: Http) {
        this.exerciseListByTypes = [];
    }

    loadExerciseList(): Observable<response.IExercise[]> {
        return this.http.get(FIT_CONFIG.api.url + 'exercises/')
            .map((response: any) => {
                return <Exercise[]>response.json().exerciseList;
            });
    }

    loadExerciseHistory(): Observable<response.IWorkoutHistory[]> {
        return this.http.get(FIT_CONFIG.api.url + 'users/' + 1 + '/history')
            .map((response: any) => {
                return response.json();
            });
    }

    getExerciseDetail(exerciseId: number): Exercise {
        return <Exercise>_.find(this.exerciseList, {'id': exerciseId});
    }

    loadUserPlanList(): Observable<response.IPlan[]> {
        return this.http.get(FIT_CONFIG.api.url + 'users/' + 1 + '/plans', {})
            .map((response: response.IWorkoutList) => {
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

        return this.http.post(FIT_CONFIG.api.url + 'users/' + 1 + '/workouts', workoutPostData).map(response => {
            return true;
        });
    }
}
