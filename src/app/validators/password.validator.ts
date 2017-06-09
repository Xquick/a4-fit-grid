import {AbstractControl} from "@angular/forms";
export class PasswordValidator {


    static matchPassword(abstractControl: AbstractControl) {
        let password = abstractControl.get('password').value;
        let passwordRepeat = abstractControl.get('passwordRepeat').value;

        if (password !== passwordRepeat) {
            console.log('not same');
            abstractControl.get('passwordRepeat').setErrors({matchPassword: true});
        } else {
            console.log('same');

            return null;
        }
    }
}