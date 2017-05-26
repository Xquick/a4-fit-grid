import {common} from "../interfaces/common.interface";
import {Inject} from "@angular/core";
import IExerciseSchedule = common.IExerciseSchedule;
import ICurrentWorkout = common.ICurrentWorkout;
import {NewWorkoutService} from "../services/new-workout.service";
import {MockCacheService} from "./cache.service.mock";
import {DataService} from "../services/data.service";
import {CacheService} from "../services/cache.service";


export class MockNewWorkoutService extends NewWorkoutService {
    constructor(@Inject(CacheService) mockCacheService: MockCacheService,
                @Inject(DataService) dataService: DataService) {

        super(mockCacheService, dataService);
    }
}