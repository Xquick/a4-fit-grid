///<reference path="../ref.ts"/>


module portal {
    'use strict';
    import IWorkoutList = portal.json.IWorkoutList;

    export interface ICacheService {
        exerciseListByTypes: portal.IExerciseType[];
        exerciseList: portal.Exercise[];
        exercise: portal.Exercise;
        userWorkouts: Workout[];

        cacheUserWorkouts(): void;
        updateCacheExerciseHistory(workout: ICurrentWorkout): void;
    }

    export class CacheService implements ICacheService {
        protected $dataService: IDataService;

        exerciseListByTypes: portal.IExerciseType[];
        exerciseList: portal.Exercise[];
        exercise: portal.Exercise;
        userWorkouts: Workout[];

        static $inject = ['$dataService'];

        constructor($dataService: IDataService) {
            this.$dataService = $dataService;
            this.userWorkouts = [];
            if (_.isEmpty(this.exerciseList)) {
                console.log('something');
                this.cacheExerciseList().then(() => {
                    this.cacheExerciseHistory(1).then((success: boolean) => {
                        if (success) {
                            //Do things after exercises were all loaded with history
                        }
                    });
                });
            }
        }

        protected cacheExerciseList(): ng.IPromise<boolean> {
            return this.$dataService.loadExerciseList().then((exercises) => {
                this.exerciseList = [];
                _.each(exercises, (exercise: json.IExercise) => {
                    this.exerciseList.push(new Exercise(exercise));
                })
            }).then(() => {
                return true;
            });
        }

        protected cacheExerciseHistory(user_id: number): ng.IPromise<boolean> {
            return this.$dataService.loadExerciseHistory().then((historyList: json.IWorkoutHistory[]) => {
                _.each(this.exerciseList, (exercise: Exercise) => {
                    _.each(historyList, (workoutHistory: json.IWorkoutHistory) => {
                        _.each(workoutHistory.schedule, (workoutSchedule: json.IWorkoutSchedule) => {
                            let scheduledExercise: json.IExerciseWithSchedule = <json.IExerciseWithSchedule>_.find(workoutSchedule.exerciseList, {name: exercise.name});

                            if (scheduledExercise !== undefined) {
                                if (exercise.schedule === undefined) {
                                    exercise.schedule = [];
                                }
                                exercise.schedule.push(<IExerciseSchedule>{
                                    date: moment(workoutSchedule.date, portal.config.date.shortFormat),
                                    setList: scheduledExercise.setList
                                });
                            }
                        });
                    });
                });

                this.exerciseListByTypes = [];
                this.exerciseListByTypes = this.sortExercisesByTypes(this.exerciseList);
                console.log(this.exerciseListByTypes);
                return true;
            });
        }

        public updateCacheExerciseHistory(workout: ICurrentWorkout): void {
            _.each(workout.exerciseList, (exercise: ICurrentWorkoutExercise) => {
                let cachedExercise: Exercise = <Exercise>_.find(this.exerciseList, {id: exercise.id});
                if (!cachedExercise.hasOwnProperty('schedule')) {
                    cachedExercise.schedule = [];
                }

                let schedule: IExerciseSchedule = <IExerciseSchedule>{
                    date: workout.date,
                    setList: []
                };

                cachedExercise.schedule.push(schedule);

                _.extend(_.findWhere(this.exerciseList, {id: exercise.id}), cachedExercise);
                this.exerciseListByTypes = this.sortExercisesByTypes(this.exerciseList);
            });
        }


        public cacheUserWorkouts(): void {
            this.$dataService.loadUserWorkoutList().then((workoutList: json.IWorkout[]): void => {
                if (_.isEmpty(this.userWorkouts)) {
                    _.each(workoutList, (workout: json.IWorkout) => {
                        this.userWorkouts.push(new Workout(workout));
                    });
                }
            });
        }

        /*
         * **
         * Returns exercises sorted by their type (e.g. type: 'back', type: 'chest')
         *
         * @param exercises: Exercise[]
         * @returns {IExerciseType[]} resulting into structure e.g. {'chest': {[Exercise1, Exercise5]}, 'back': {[...]}}
         */
        private sortExercisesByTypes(exercises: Exercise[]): IExerciseType[] {
            let exerciseArr: {[key: string]: Exercise[]} = {};
            let exercisesByType: IExerciseType[] = [];

            _.each(exercises, exercise => {
                if (typeof exerciseArr[exercise.type] === 'undefined') {
                    exerciseArr[exercise.type] = [];
                }
                let newExercise: Exercise = new Exercise(exercise);

                if (exercise.hasOwnProperty('schedule')) {
                    newExercise.schedule = exercise.schedule;
                }
                exerciseArr[exercise.type].push(newExercise);

            });

            for (let key in exerciseArr) {
                let exerciseType: IExerciseType = <IExerciseType>{};

                exerciseType.name = key;
                exerciseType.exerciseList = exerciseArr[key];

                exercisesByType.push(exerciseType);
            }

            return exercisesByType;
        }
    }
}

angular.module('portal').service('$cacheService', portal.CacheService);