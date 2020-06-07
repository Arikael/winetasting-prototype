import { FormGroup, FormBuilder } from '@angular/forms';

export abstract class FormService<T> {
    protected form: FormGroup;
    abstract getForm(): FormGroup;
    setModel(model: T): void {
        this.form.reset(model);
    }

    protected abstract createForm(): void;

    constructor(protected formBuilder: FormBuilder, formModel: T | null) {
        this.createForm();

        if (formModel) {
            this.setModel(formModel);
        }
    }
}
