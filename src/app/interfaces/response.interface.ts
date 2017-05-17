import {Exercise} from "../dto/exercise.dto";

export namespace json {
    export interface IExerciseList {
        data: {
            exerciseList: IExercise[]
        }
    }

    export interface IExercise {
        id: number;
        name: string;
        type: string;
    }

    export interface ISet {
        id: number;
        setNumber: number;
        repCount: number;
        weight: number;
        workoutScheduleExerciseId: number;
    }

    export interface IExerciseWithSchedule extends IExercise {
        setList: ISet[]
    }

    export interface IWorkoutList {
        data: IWorkout[];
    }

    export interface IWorkout {
        id: number;
        name: string;
        exerciseList: Exercise[];
    }

    export interface IWorkoutSchedule {
        date: string;
        exerciseList: IExerciseWithSchedule[];
    }

    export interface IWorkoutHistory {
        workout_id: number ;
        workout_name: string;
        schedule: IWorkoutSchedule[]
    }

    export interface IWorkoutHistoryList {
        data: IWorkoutHistory[]
    }
}