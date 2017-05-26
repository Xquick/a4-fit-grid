import {common} from "../interfaces/common.interface";
import {response} from "../interfaces/response.interface";
import IWorkout = common.IWorkout;
import IPlan = common.IPlan;
import * as _ from 'underscore';
import {Workout} from "./workout.dto";


export class Plan implements IPlan {
    id: number;
    name: string;
    workoutList: IWorkout[];

    constructor(plan: response.IPlan) {
        this.id = plan.id;
        this.name = plan.name;
        this.workoutList = [];

        _.each(plan.workoutList, (workout: response.IWorkout) => {
            this.workoutList.push(new Workout(workout));
        });
    }
}