///<reference path="../ref.ts"/>

module portal {
    'use strict';


    export class Workout implements portal.IWorkout {
        id: number;
        name: string;
        exerciseList: IExercise[];

        constructor(workout: json.IWorkout) {
            this.id = workout.id;
            this.name = workout.name;
            this.exerciseList = workout.exerciseList;
        }
    }
}