import {common} from "../interfaces/common.interface";
import {response} from "../interfaces/response.interface";
import {Workout} from "./workout.dao";
import * as _ from 'underscore';


export class WorkoutGroup implements common.IWorkoutGroup {
    id: number;
    name: string;
    workouts: common.IWorkout[];

    constructor(workoutGroup: response.IWorkoutGroup) {
        this.id = workoutGroup.id;
        this.name = workoutGroup.name;
        this.workouts = [];

        _.each(workoutGroup.workouts, (workout: response.IWorkout) => {
            this.workouts.push(new Workout(workout));
        });
    }
}