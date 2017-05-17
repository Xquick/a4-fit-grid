import {common} from "../interfaces/common.interface";
import {response} from "../interfaces/response.interface";


export class Workout implements common.IWorkout {
    id: number;
    name: string;
    exerciseList: common.IExercise[];

    constructor(workout: response.IWorkout) {
        this.id = workout.id;
        this.name = workout.name;
        this.exerciseList = workout.exerciseList;
    }
}