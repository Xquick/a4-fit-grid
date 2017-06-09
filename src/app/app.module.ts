import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
    MdIconRegistry, MdDatepickerModule, MdIconModule, MdSidenavModule, MdInputModule, MdNativeDateModule, MdToolbar,
    MdToolbarModule, MdSelectModule, MdSnackBarModule, MdListModule, MdTabsModule
} from '@angular/material';


import {DndModule} from "ng2-dnd";
import 'hammerjs';

import {CacheService} from "./services/cache.service";
import {DataService} from './services/data.service';

import {IAppConfig, FIT_CONFIG} from './app.config';
import {AutoGrowDirective} from './directives/auto-grow.directive';
import {GridComponent} from "./components/grid/grid.component";
import {AppComponent} from "./app.component";
import {NewWorkoutComponent} from "./components/new-workout/new-workout.component";
import {NewWorkoutService} from "./services/new-workout.service";
import {FormatDatePipe} from "./pipes/format-date.pipe";
import {MockDataService} from "./mock/data.service.mock";
import {SnackBarService} from "./services/snackbar.service";
import {AuthGuard} from "./guards/auth.guard";
import {LoginComponent} from "./components/login/login.component";
import {AuthService} from "./services/auth.service";
import {MenuItemComponent} from "./components/main-menu/menu-item/menu-item.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import {FirstKeyPipe} from "./pipes/first.pipe";
import {AuthHttp, AuthConfig, JwtHelper} from "angular2-jwt";
import {AuthModule} from "./modules/auth.module";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";


export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http, './assets/i18n/locale-', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        AutoGrowDirective,
        MenuItemComponent,
        GridComponent,
        PlansComponent,
        MainMenuComponent,
        AppHeaderComponent,
        NewWorkoutComponent,
        LoginComponent,
        SignUpComponent,
        FormatDatePipe,
        FirstKeyPipe
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
                component: GridComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'plans',
                component: PlansComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'sign-up',
                component: SignUpComponent
            },
            {
                path: '',
                redirectTo: '/grid',
                pathMatch: 'full'
            }]
        ),
        MdCoreModule, MdDatepickerModule, MdIconModule, MdInputModule, MdCardModule,
        MdCheckboxModule, MdRadioModule, MdButtonModule, MdSlideToggleModule,
        MdSidenavModule, MdNativeDateModule, MdToolbarModule, MdSelectModule, MdListModule,MdTabsModule,
        FlexLayoutModule, MdSnackBarModule, ReactiveFormsModule, FormsModule,AuthModule,
        DndModule.forRoot(), NgxDatatableModule
    ],
    providers: [
        DataService, CacheService, NewWorkoutService,
        MdIconRegistry, MockDataService, SnackBarService,
        AuthGuard, AuthService,
        {provide: IAppConfig, useValue: FIT_CONFIG}],
    bootstrap: [AppComponent]
})
export class AppModule {
}
