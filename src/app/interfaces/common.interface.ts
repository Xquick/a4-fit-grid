import * as moment from "moment";

export namespace common {

    export interface ISchedule {
        id: number;
        date: moment.Moment;
        workout: IWorkout;
    }

    export interface IWorkoutGroup {
        id: number;
        name: string;
        workouts: IWorkout[];
    }

    export interface IWorkout {
        id: number;
        name: string;
        exercises: IExercise[];
    }

    export interface IExercise {
        id: number;
        name: string;
        type: string;
        schedule: IExerciseSchedule[];
        sets: ISet[];
    }

    export interface IPlan {
        id: number;
        name: string;
        workoutGroups: IWorkoutGroup[];
    }

    export interface IExerciseSchedule {
        date: moment.Moment;
        sets: ISet[]
    }

    export interface IExerciseType {
        name: string;
        exercises: IExercise[];
    }

    export interface ICalendarDays {
        weekday: number;
        date: moment.Moment;
        abbreviation: string;
    }

    export interface ISet {
        setNumber: number;
        repCount: number;
        weight: number;
    }

    export interface IScheduledSet {
        setNumber: number;
        repCount: number;
        weight: number;
    }


    export interface ICurrentWorkout {
        date: moment.Moment;
        name: string;
        plan: IPlan;
        exerciseList: ICurrentWorkoutExercise[];
    }

    export interface ICurrentWorkoutExercise {
        id: number;
        name: string;
        type: string;
        isSuperset: boolean;
    }
}
