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
import {DataService} from "../services/data.service";
import {
    EXERCISE_JSON,
    USER_EXERCISE_HISTORY_JSON,
    USER_PLANS_JSON
} from './data/data.mock';

export interface IDataService {
    loadExerciseList(): Observable<Exercise[]>;
    loadExerciseHistory(): Observable<response.IWorkoutHistory[]>;
    loadUserPlanList(): Observable<response.IPlan[]>;
    getExerciseDetail(exerciseId: number): Exercise;
    persistWorkout(workout: ICurrentWorkout): void;
}

export class MockDataService extends DataService {

    constructor(@Inject(Http) http: Http) {
        super(http);
    }

    loadExerciseList(): Observable<response.IExercise[]> {
        return Observable.of(EXERCISE_JSON);
    }

    loadExerciseHistory(): Observable<response.IWorkoutHistory[]> {
        return Observable.of(USER_EXERCISE_HISTORY_JSON)
    }

    getExerciseDetail(exerciseId: number): Exercise {
        return <Exercise>_.find(this.exerciseList, {'id': exerciseId});
    }

    loadUserPlanList(): Observable<response.IPlan[]> {
        return Observable.of(USER_PLANS_JSON)
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
