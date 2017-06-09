import {Component, HostBinding, OnInit, Output, EventEmitter} from "@angular/core";
import {AuthService} from "../../services/auth.service";
@Component({
    selector: 'main-menu',
    templateUrl: './main-menu.template.html'
})

export class MainMenuComponent implements OnInit {
    @HostBinding('class') classes = 'height-100 width-100';
    @Output() onToggleWokoutSidenav = new EventEmitter();

    isAuthenticated: boolean;

    constructor(private authService: AuthService) {

    }

    ngOnInit(): void {
        this.authService.isAuthenticated.subscribe((isAuthenticated) => {
            this.isAuthenticated = isAuthenticated;
        });
    }

    logout(): void {
        this.authService.logout();
    }

    toggleWorkoutSidenav(): void {
        this.onToggleWokoutSidenav.emit();
    }
}