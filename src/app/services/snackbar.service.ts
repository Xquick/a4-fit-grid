import {Injectable} from "@angular/core";
import {MdSnackBarConfig, MdSnackBar} from "@angular/material";
import {FIT_CONFIG} from "../app.config";
import {TranslateService} from "@ngx-translate/core";

@Injectable()
export class SnackBarService {

    constructor(private snackBar: MdSnackBar, private translateService: TranslateService) {
    }

    /**
     *
     * @param elementText
     * @param messageType - success, info, error
     */
    showSnackBar(elementText: string, messageType) {
        let config = new MdSnackBarConfig();
        config.duration = FIT_CONFIG.snackBar.duration;

        switch (messageType) {
            case 'success':
                config.extraClasses = ['success'];
                break;
            case 'info':
                config.extraClasses = ['info'];
                break;
            case 'error':
                config.extraClasses = ['error'];
                break;
        }

        this.translateService.get('snackbar.confirm').subscribe((message) => {
            this.snackBar.open(elementText, message, config);
        });
    }
}