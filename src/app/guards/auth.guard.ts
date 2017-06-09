import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
export class AuthGuard implements CanActivate {

    constructor(@Inject(Router) private router: Router,
                @Inject(AuthService) private authService: AuthService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        if (window.localStorage.getItem('auth_key')) {

            this.authService.userId;
            this.authService.isAuthenticated.next(true);
            return true;
        }

        console.log('Not authenticated');
        this.router.navigate(['/login']);
        return true;
    }

}