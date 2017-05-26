import {Pipe, PipeTransform} from "@angular/core";
import {FIT_CONFIG} from "../app.config";
import * as moment from "moment";

@Pipe({
    name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {
    transform(dateInput: any): any {

        let formatedDate: string;

        let today: moment.Moment = moment();
        let timeDiff = today.diff(dateInput, 'days');
        if (timeDiff < 1) {
            formatedDate = 'date.today';
        } else if (timeDiff < 2) {
            formatedDate = 'date.yesterday';
        } else {
            formatedDate = dateInput.format(FIT_CONFIG.date.shortFormat);
        }
        return formatedDate;
    }
}

