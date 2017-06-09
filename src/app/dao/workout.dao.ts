import {common} from "../interfaces/common.interface";
import {response} from "../interfaces/response.interface";
import ISet = common.ISet;
import IExercise = common.IExercise;
import * as _ from 'underscore';
import {Exercise} from "./exercise.dao";


export class Workout implements common.IWorkout {
    id: number;
    name: string;
    exercises: IExercise[];

    constructor(workout: response.IWorkout) {
        this.id = workout.id;
        this.name = workout.name;
        this.exercises = [];

        _.each(workout.exercises, (exercise: response.IExercise) => {
            this.exercises.push(new Exercise(exercise));
        });
    }
}