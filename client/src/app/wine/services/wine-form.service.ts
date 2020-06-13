import { FormGroup, FormBuilder } from '@angular/forms';
import { WineFormModel } from '../models/wine/wine.form-model';
import { FormService } from 'src/app/core/form.service';

// TODO we should add FormModels for every form not one monolithic one.
export class WineFormService extends FormService<WineFormModel> {
    constructor(formBuilder: FormBuilder, formModel: WineFormModel | null) {
        super(formBuilder, formModel);
    }

    getForm(): FormGroup {
        return this.form;
    }

    createForm() {
        this.form = this.formBuilder.group({
            base: this.formBuilder.group({
                name: this.formBuilder.control(''),
                year: this.formBuilder.control(''),
                producer: this.formBuilder.control(''),
                tastedOn: this.formBuilder.control(new Date()),
                grapes: this.formBuilder.control([])
            }),
            nose: this.formBuilder.group({
                tastes: this.formBuilder.array([])
            })
        });
    }
}
