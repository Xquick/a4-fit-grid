import {Component, Input, HostBinding, Output, EventEmitter} from "@angular/core";
import {AuthService} from "../../../services/auth.service";
@Component({
    selector: 'menu-item',
    templateUrl: './menu-item.template.html'
})

export class MenuItemComponent {
    @HostBinding('class') classes = 'width-100';

    @Input() routePath: string;
    @Input() routeName: string;
    @Input() iconName: string;
    @Input() iconClass: string;

    constructor() {

    }
}