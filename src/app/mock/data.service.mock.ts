import {common} from "../interfaces/common.interface";
import {response} from "../interfaces/response.interface";
import {Exercise} from "../dao/exercise.dao";
import {Observable} from "rxjs";
import {Inject} from "@angular/core";
import * as _ from "underscore";
import IWorkout = common.IWorkoutGroup;
import ICurrentWorkout = common.ICurrentWorkout;
import IExerciseType = common.IExerciseType;
import {DataService} from "../services/data.service";
import {
    EXERCISE_JSON,
    USER_EXERCISE_HISTORY_JSON,
    USER_PLANS_JSON
} from './data/data.mock';
import {AuthHttp} from "angular2-jwt";

export interface IDataService {
    loadExerciseList(): Observable<Exercise[]>;
    loadExerciseHistory(): Observable<response.IWorkoutHistory[]>;
    loadUserPlanList(): Observable<response.IPlan[]>;
    getExerciseDetail(exerciseId: number): Exercise;
    persistWorkout(workout: ICurrentWorkout): void;
}

export class MockDataService extends DataService {

    constructor(@Inject(AuthHttp) authHttp: AuthHttp) {
        super(authHttp);
    }

    loadExerciseList(): Observable<response.IExercise[]> {
        return Observable.of(EXERCISE_JSON);
    }

    loadSchedule(): Observable<response.IWorkoutHistory[]> {
        return Observable.of(USER_EXERCISE_HISTORY_JSON)
    }

    getExerciseDetail(exerciseId: number): Exercise {
        return <Exercise>_.find(this.exerciseList, {'id': exerciseId});
    }

    loadUserPlanList(): Observable<response.IPlan[]> {
        return Observable.of(USER_PLANS_JSON)
    }
}
