import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, Http} from '@angular/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {RouterModule} from "@angular/router";
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PlansComponent} from "./components/plans/plans.component";
import {MainMenuComponent} from "./components/main-menu/main-menu.component";
import {AppHeaderComponent} from "./components/header/app-header.directive";
import {
    MdCoreModule, MdButtonModule, MdCheckboxModule, MdCardModule, MdRadioModule, MdSlideToggleModule,
    MdIconRegistry, MdDatepickerModule, MdIconModule, MdSidenavModule, MdInputModule, MdNativeDateModule
} from '@angular/material';


import {Ng2DragDropModule} from "ng2-drag-drop";
import 'hammerjs';

import {CacheService} from "./services/cache.service";
import {DataService} from './services/data.service';

import {IAppConfig, FIT_CONFIG} from './app.config';
import {AutoGrowDirective} from './directives/auto-grow.directive';
import {GridComponent} from "./components/grid/grid.component";
import {AppComponent} from "./app.component";
import {WorkoutComponent} from "./components/workout/workout.component";
import {NewWorkoutService} from "./services/new-workout.service";


export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http, './assets/i18n/locale-', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        AutoGrowDirective,
        GridComponent,
        PlansComponent,
        MainMenuComponent,
        AppHeaderComponent,
        WorkoutComponent
    ],
    imports: [
        BrowserModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [Http]
            }
        }),
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot([
            {
                path: 'grid',
                component: GridComponent
            },
            {
                path: 'plans',
                component: PlansComponent
            }]
        ),
        /** Material */
        MdCoreModule, MdDatepickerModule, MdIconModule, MdInputModule, MdCardModule,
        MdCheckboxModule, MdRadioModule, MdButtonModule, MdSlideToggleModule,
        MdSidenavModule, MdNativeDateModule,
        FlexLayoutModule,
        Ng2DragDropModule
    ],
    providers: [DataService, CacheService, NewWorkoutService, MdIconRegistry,
        {provide: IAppConfig, useValue: FIT_CONFIG}],
    bootstrap: [AppComponent]
})
export class AppModule {
}
