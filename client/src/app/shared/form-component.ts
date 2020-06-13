import { Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

export abstract class FormComponent {
    @Input() formGroup: FormGroup;
}
