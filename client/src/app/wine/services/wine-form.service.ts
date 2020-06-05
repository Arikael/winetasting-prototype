import { FormGroup } from '@angular/forms';

export abstract class FormService {
    protected form: FormGroup;
    abstract getFormGroup(name: string): FormGroup;
}

export class WineFormService extends FormService {
    constructor() {
        super();

    }

    getFormGroup(name: string): FormGroup {
        const formGroup = this.form.get(name) as FormGroup;

        return formGroup;
    }
}
