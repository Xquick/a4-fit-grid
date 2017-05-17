import * as moment from "moment";
import {Exercise} from "../dto/exercise.dto";

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

    export interface ICurrentWorkout {
        date: moment.Moment;
        name: string;
        exerciseList: ICurrentWorkoutExercise[];
        exerciseMap: boolean[];
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
