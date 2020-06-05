import { Input } from '@angular/core';
import { FormService } from '../wine/services/wine-form.service';

export abstract class FormComponent {
    @Input() formControlName = '';

    constructor(protected formService: FormService) {}
}
