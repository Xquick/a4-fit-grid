import {InjectionToken} from "@angular/core";

export interface IAppConfig {
    snackBar: {
        duration: number;
        position: string;
    }
    mockApi: string;
    api: {
        url: string
    };
    date: {
        shortFormat: string;
        mediumFormat: string;
        longFormat: string;
    };
    numberOfHistoryDays: number;
}

export const FIT_CONFIG: IAppConfig = {
    mockApi: '/assets/data/',
    api: {
        url: 'http://fit-grid-api.localhost/api/'
    },
    date: {
        shortFormat: 'D.M',
        mediumFormat: 'D.M.YY',
        longFormat: 'D.M.YYYY'
    },
    numberOfHistoryDays: 8,
    snackBar: {
        duration: 5000,
        position: ''
    }
};

export let IAppConfig = new InjectionToken<IAppConfig>('app.config');
