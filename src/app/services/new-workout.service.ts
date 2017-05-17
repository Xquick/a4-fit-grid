import {CacheService} from "./cache.service";
import {Exercise} from "../dto/exercise.dto";
import {common} from "../interfaces/common.interface";
import * as _ from 'underscore';
import {Inject} from "@angular/core";

export class NewWorkoutService {
    constructor(@Inject(CacheService) private cacheService: CacheService) {

    }

    /***
     * Adds/Removes exercise into the current workout
     * @param exercise
     */
    public toggleExercise(exercise: Exercise) {
        let selectedExerciseList: common.ICurrentWorkoutExercise[] = this.cacheService.currentWorkout.exerciseList;
        let exerciseExists = _.find(selectedExerciseList, {name: exercise.name});

        if (!exerciseExists) {
            this.cacheService.currentWorkout.exerciseMap[exercise.id] = true;
            this.cacheService.currentWorkout.exerciseList.push({
                id: exercise.id,
                name: exercise.name,
                type: exercise.type,
                isSuperset: false
            });
        } else {
            this.cacheService.currentWorkout.exerciseMap[exercise.id] = false;
            this.cacheService.currentWorkout.exerciseList = <common.ICurrentWorkoutExercise[]>_.without(selectedExerciseList, _.findWhere(selectedExerciseList, {id: exercise.id}));
        }
    }
}