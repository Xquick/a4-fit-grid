import {IExercise, IExerciseSchedule} from "../interfaces/common.interface";


export class Exercise implements IExercise {
    id: number;
    name: string;
    type: string;
    schedule: IExerciseSchedule[];

    constructor(exercise: IExercise) {
        this.id = exercise.id;
        this.name = exercise.name;
        this.type = exercise.type;
    }
}