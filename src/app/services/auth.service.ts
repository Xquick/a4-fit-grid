import {Http, Headers} from "@angular/http";
import {FIT_CONFIG} from "../app.config";
import {auth} from '../interfaces/auth.interface';
import ICredentials = auth.ICredentials;
import {Inject} from "@angular/core";
import {Observable, ReplaySubject} from "rxjs";
import {Router} from "@angular/router";
import {JwtHelper} from "angular2-jwt";

export const LOCAL_STORAGE_AUTH_KEY = 'token';

export class AuthService {
    isAuthenticated: ReplaySubject<boolean>;
    userId: number;
    jwtHelper: JwtHelper = new JwtHelper();

    constructor(@Inject(Http) private http: Http, @Inject(Router) private router: Router) {
        this.isAuthenticated = new ReplaySubject();

    }

    authenticateNow(userCredentials: ICredentials): Observable<boolean> {
        return this.http.post(FIT_CONFIG.api.url + 'authenticate', userCredentials).map((response) => {
            if (response.json().status === 'ok') {
                let token = response.json().token.jwt;
                window.localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, token);

                let decodedToken = this.jwtHelper.decodeToken(token);
                this.userId = decodedToken.data.userId;

                this.isAuthenticated.next(true);

                return true;
            } else {
                return false;
            }
        });
    }

    signUp(userCredentials: ICredentials): Observable<boolean> {
        return this.http.post(FIT_CONFIG.api.url + 'users', userCredentials).map((response) => {
            if (response.json().status === 'ok') {
                window.localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, response.json().token);
                window.localStorage.this.isAuthenticated.next(true);
                return true;
            } else {
                return false;
            }
        });
    }

    logout(): void {
        window.localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
        this.isAuthenticated.next(false);
        this.router.navigate(['login']);
    }


    useJwtHelper() {
        let token = localStorage.getItem('token');

        console.log(
            this.jwtHelper.decodeToken(token),
            this.jwtHelper.getTokenExpirationDate(token),
            this.jwtHelper.isTokenExpired(token)
        );
    }
}