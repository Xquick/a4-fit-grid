import {InjectionToken} from "@angular/core";

export interface IAppConfig {
    api: {
        url: string
    };
    date: {
        shortFormat: string;
        mediumFormat: string;
        longFormat: string;
    };
}

export const FIT_CONFIG: IAppConfig = {
    api: {
        url: 'http://fit-grid-api.localhost/api/'
    },
    date: {
        shortFormat: 'D.M',
        mediumFormat: 'D.M.YY',
        longFormat: 'D.M.YYYY'
    }
};

export let IAppConfig = new InjectionToken<IAppConfig>('app.config');
