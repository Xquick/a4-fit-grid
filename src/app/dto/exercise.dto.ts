import {common} from "../interfaces/common.interface";
import {response} from "../interfaces/response.interface";


export class Exercise implements common.IExercise {
    id: number;
    name: string;
    type: string;
    schedule: common.IExerciseSchedule[];

    constructor(exercise: response.IExercise) {
        this.id = exercise.id;
        this.name = exercise.name;
        this.type = exercise.type;
    }
}