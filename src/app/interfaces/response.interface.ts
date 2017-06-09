import {Exercise} from "../dao/exercise.dao";
import {Response} from "@angular/http";

export namespace response {
    export interface IExerciseList extends Response {
        data: {
            exerciseList: IExercise[]
        }
    }

    export interface ISchedule {
        workout: IWorkout;
        exercises: IExercise[];
        date: Date;
    }

    export interface IExercise {
        id: number;
        name: string;
        type: string;
        sets: ISet[];
        scheduledSets: IScheduledSet[];
    }

    export interface IWorkout {
        id: number;
        name: string;
        exercises: IExercise[];
        schedules: ISchedule[];
        workoutId: number;
    }

    export interface ISet {
        id: number;
        setNumber: number;
        repCount: number;
        weight: number;
        workoutInstanceExerciseId: number;
    }

    export interface IScheduledSet {
        id: number;
        setNumber: number;
        repCount: number;
        weight: number;
        workoutInstanceExerciseId: number;
    }

    export interface IPlan {
        id: number;
        name: string;
        workoutGroups: IWorkoutGroup[];
    }

    export interface IWorkoutGroup {
        id: number;
        name: string;
        workouts: IWorkout[];
    }

    export interface IWorkoutHistory {
        workout_id: number ;
        workout_name: string;
        schedule: IWorkout[]
    }
}