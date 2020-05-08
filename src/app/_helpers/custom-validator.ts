import { AbstractControl } from '@angular/forms';

export class CustomValidator {
    static matchPassword(formGroupControl: AbstractControl) {
        const password: string = formGroupControl.get('password').value;
        const confirmPassword: string = formGroupControl.get('confirmPassword').value;
        if (password !== confirmPassword) {
            formGroupControl.get('confirmPassword').setErrors({ IsPasswordNotMatched: true });
        }
    }
}
