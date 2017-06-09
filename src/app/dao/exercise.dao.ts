import {common} from "../interfaces/common.interface";
import {response} from "../interfaces/response.interface";
import {Set} from "./set.dao";
import ISet = common.ISet;
import * as _ from 'underscore';
import IExerciseSchedule = common.IExerciseSchedule;
import IScheduledSet = response.IScheduledSet;
import * as moment from 'moment';
import {FIT_CONFIG} from "../app.config";
import {ScheduledSet} from "./scheduled-set.dao";


export class Exercise implements common.IExercise {
    id: number;
    name: string;
    type: string;
    schedule: common.IExerciseSchedule[];
    sets: ISet[];

    constructor(exercise: response.IExercise) {
        this.id = exercise.id;
        this.name = exercise.name;
        this.type = exercise.type;
        this.sets = [];

        _.each(exercise.sets, (set: response.ISet) => {
            this.sets.push(new Set(set));
        })
    }

    updateSchedule(date: Date, scheduledSetsData: IScheduledSet[]) {
        this.schedule = this.schedule || [];

        let scheduledSets: ISet[] = [];

        _.each(scheduledSetsData, (scheduledSet: IScheduledSet) => {
            scheduledSets.push(new ScheduledSet(scheduledSet));
        });

        this.schedule.push(<IExerciseSchedule>{
            date: moment(date, FIT_CONFIG.date.longFormat),
            sets: scheduledSets
        });
    }
}