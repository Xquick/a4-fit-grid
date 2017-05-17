import {Component, Input} from "@angular/core";
@Component({
    selector: 'app-header',
    templateUrl: './app-header.template.html'
})

export class AppHeaderComponent {
    @Input() appTitle: string;

    constructor() {

    }
}