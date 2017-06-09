import {Component, OnInit, HostBinding} from "@angular/core";
import {FormGroup, FormControl, FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {auth} from "../../interfaces/auth.interface";
import ICredentials = auth.ICredentials;
import {AuthService} from "../../services/auth.service";
import {PasswordValidator} from "../../validators/password.validator";
@Component({
    selector: 'sign-up',
    templateUrl: './sign-up.template.html'
})

export class SignUpComponent implements OnInit {

    @HostBinding('class') classes = 'width-100';
    formGroup: FormGroup;

    constructor(private router: Router,
                private authService: AuthService,
                private formBuilder: FormBuilder) {

    }

    ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
                firstname: [''],
                lastname: [''],
                email: [''],
                username: [''],
                password: [''],
                passwordRepeat: [''],
            },
            {
                validator: PasswordValidator.matchPassword
            });
    }

    signUp(credentials: ICredentials) {
        this.authService.signUp(credentials).subscribe((isAuthenticated) => {
            if (isAuthenticated) {
                this.router.navigate(['/grid']);
            }
        });
    }
}