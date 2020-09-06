import { Input, Directive } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive()
export abstract class FormComponent {
    @Input() formGroup: FormGroup;
}
