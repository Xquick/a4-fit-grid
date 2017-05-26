import * as moment from "moment";
import {Exercise} from "../dto/exercise.dto";
import {Plan} from "../dto/plan.dto";

export namespace common {
    export interface IExercise {
        id: number;
        name: string;
        type: string;
        schedule: IExerciseSchedule[];
    }

    export interface IWorkout {
        id: number;
        name: string;
        exerciseList: IExercise[];
    }

    export interface IPlan {
        id: number;
        name: string;
        workoutList: IWorkout[];
    }

    export interface ICurrentWorkout {
        date: moment.Moment;
        name: string;
        plan: Plan;
        exerciseList: ICurrentWorkoutExercise[];
    }

    export interface ICurrentWorkoutExercise {
        id: number;
        name: string;
        type: string;
        isSuperset: boolean;
    }

    export interface IExerciseSchedule {
        date: moment.Moment;
        setList: ISet[]
    }

    export interface IExerciseType {
        name: string;
        exerciseList: Exercise[];
    }

    export interface ICalendarDays {
        weekday: number;
        date: moment.Moment;
        abbreviation: string;
    }
    export interface ISet {
        id: number;
        setNumber: number;
        repCount: number;
        weight: number;
    }

}
