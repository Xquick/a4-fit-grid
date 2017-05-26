import {Inject} from "@angular/core";

import {CacheService} from "../services/cache.service";
import {MockDataService} from "./data.service.mock";

export class MockCacheService extends CacheService {

    constructor(@Inject(MockDataService) mockDataService: MockDataService) {
        super(mockDataService);
    }
}
