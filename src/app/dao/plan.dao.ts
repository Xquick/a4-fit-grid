import {common} from "../interfaces/common.interface";
import {response} from "../interfaces/response.interface";
import IWorkout = common.IWorkoutGroup;
import IPlan = common.IPlan;
import * as _ from 'underscore';
import {WorkoutGroup} from "./workout-group.dao";
import IWorkoutGroup = common.IWorkoutGroup;


export class Plan implements IPlan {
    id: number;
    name: string;
    workoutGroups: IWorkoutGroup[];

    constructor(plan: response.IPlan) {
        this.id = plan.id;
        this.name = plan.name;
        this.workoutGroups = [];

        _.each(plan.workoutGroups, (workoutGroup: response.IWorkoutGroup) => {
            this.workoutGroups.push(new WorkoutGroup(workoutGroup));
        });
    }
}