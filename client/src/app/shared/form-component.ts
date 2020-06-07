import { Input } from '@angular/core';

export abstract class FormComponent {
    @Input() formControlName = '';
}
