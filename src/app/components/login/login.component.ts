import {Component, OnInit, HostBinding} from "@angular/core";
import {Http} from "@angular/http";
import {AuthService} from "../../services/auth.service";
import {auth} from '../../interfaces/auth.interface';
import ICredentials = auth.ICredentials;
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
@Component({
    selector: 'login',
    templateUrl: './login.template.html'
})

export class LoginComponent implements OnInit {
    @HostBinding('class') classes = 'width-100';

    formGroup: FormGroup;

    constructor(private http: Http,
                private authService: AuthService,
                private router: Router) {

    }

    ngOnInit(): void {
        this.formGroup = new FormGroup({
            username: new FormControl(),
            password: new FormControl()
        });
    }

    login(credentials: ICredentials): void {
        this.authService.authenticateNow(credentials).subscribe((isAuthenticated) => {
            if (isAuthenticated) {
                this.router.navigate(['/grid']);
            }
        })
    }
}