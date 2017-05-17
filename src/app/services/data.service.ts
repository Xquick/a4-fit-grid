import {common} from "../interfaces/common.interface";
import {response} from "../interfaces/response.interface";
import {Exercise} from "../dto/exercise.dto";
import * as _ from "underscore";
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {FIT_CONFIG} from "../app.config";
import {Inject} from "@angular/core";


export interface IDataService {
    loadExerciseList(): Observable<Exercise[]>;
    loadExerciseHistory(): Observable<response.IWorkoutHistory[]>;
    loadUserWorkoutList(): Observable<common.IWorkout[]>;
    getExerciseDetail(exerciseId: number): Exercise;
    persistWorkout(workout: common.ICurrentWorkout): Observable<boolean>;
}

export class DataService implements IDataService {
    public exerciseListByTypes: common.IExerciseType[];
    public exerciseList: Exercise[];
    public exercise: Exercise;

    constructor(@Inject(Http) private http: Http) {
        this.exerciseListByTypes = [];
    }

    loadExerciseList(): Observable<Exercise[]> {
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

    loadUserWorkoutList(): Observable<common.IWorkout[]> {
        return this.http.get(FIT_CONFIG.api.url + 'users/' + 1 + '/workouts', {})
            .map((response: response.IWorkoutList) => {
                return <common.IWorkout[]>response.data;
            });
    }

    persistWorkout(workout: common.ICurrentWorkout): Observable<boolean> {
        return this.http.post(FIT_CONFIG.api.url + 'users/' + 1 + '/workouts', {
            id: 1,
            date: workout.date.format(FIT_CONFIG.date.longFormat),
            name: workout.name,
            exerciseList: workout.exerciseList

        }).map(function (response: any) {
            return true;
        });
    }
}
