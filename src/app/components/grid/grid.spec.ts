import {GridComponent} from './grid.component'
import {MockCacheService} from "../../mock/cache.service.mock";
import {TestBed, ComponentFixture, async} from "@angular/core/testing";
import {HttpModule} from "@angular/http";
import {MockDataService} from "../../mock/data.service.mock";
import {CacheService} from "../../services/cache.service";
import {DataService} from "../../services/data.service";
import {NewWorkoutService} from "../../services/new-workout.service";
import {
    MdCoreModule, MdDatepickerModule, MdIconModule, MdInputModule, MdCardModule,
    MdSlideToggleModule, MdButtonModule, MdRadioModule, MdCheckboxModule, MdSidenavModule, MdNativeDateModule,
    MdToolbarModule, MdSelectModule
} from "@angular/material";
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormatDatePipe} from "../../pipes/format-date.pipe";
import {AppHeaderComponent} from "../header/app-header.directive";
import {TranslateModule, TranslateService} from "@ngx-translate/core";

describe('Component: GridComponent', () => {
    let fixture: ComponentFixture<GridComponent>;
    let gridComponent: GridComponent;
    let mockDataService: MockDataService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule, MdCoreModule, MdDatepickerModule, MdIconModule, MdInputModule, MdCardModule,
                MdCheckboxModule, MdRadioModule, MdButtonModule, MdSlideToggleModule,
                MdSidenavModule, MdNativeDateModule, MdToolbarModule, MdSelectModule,
                FlexLayoutModule,
                TranslateModule.forRoot({})],
            declarations: [GridComponent, FormatDatePipe, AppHeaderComponent],
            providers: [
                {
                    provide: CacheService,
                    useClass: MockCacheService
                },
                {
                    provide: DataService,
                    useClass: MockDataService
                }, NewWorkoutService, TranslateService, MockDataService]
        });

        fixture = TestBed.createComponent(GridComponent);
        gridComponent = fixture.componentInstance;
        mockDataService = TestBed.get(MockDataService);
    });

    it('should have calendarDays loaded', () => {
        async(() => {
            gridComponent.ngOnInit();

            fixture.whenStable().then(() => {
                expect(gridComponent.calendarDays.length).toBeGreaterThan(0);
            });
        });
    });

    it('should have exerciseList loaded', () => {
        async(() => {
            gridComponent.ngOnInit();

            fixture.whenStable().then(() => {
                expect(gridComponent.exerciseList.length).toBeGreaterThan(0);
            });
        });
    });

    it('should have exerciseListByType loaded', () => {
        async(() => {
            gridComponent.ngOnInit();

            fixture.whenStable().then(() => {
                expect(gridComponent.exerciseListByType.length).toBeGreaterThan(0);
            });
        });
    });
});