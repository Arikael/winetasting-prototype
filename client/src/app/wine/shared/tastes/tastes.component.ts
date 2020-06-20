import { Component, OnInit, AfterViewInit, AfterContentInit, Input, OnChanges, SimpleChanges, forwardRef } from '@angular/core';
import { TasteApiService } from '../../../api/taste-api.service';
import { Observable } from 'rxjs';
import { TasteCategory } from '../../models/taste-category';
import { delay, tap } from 'rxjs/operators';
import { ControlValueAccessor, FormArray, FormControl, ControlContainer, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TasteFormModel } from '../../models/taste.form-model';
import { TastesFormModel } from '../../models/tastes.form-model';

@Component({
  selector: 'app-tastes',
  templateUrl: './tastes.component.html',
  styleUrls: ['./tastes.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TastesComponent),
      multi: true
    }
  ]
})
export class TastesComponent implements OnInit, ControlValueAccessor, OnChanges {

  @Input() tastesOptions: TastesFormModel | TasteFormModel[];
  typedTastesOptions: TastesFormModel;

  formArray: FormArray;
  get formGroup(): FormGroup {
    if (this.controlContainer?.control instanceof FormArray) {
      return this.controlContainer.control.parent as FormGroup;
    }

    return null;
  }

  onChange = (tastes: TasteFormModel[]) => { };
  onTouched = () => { };

  constructor(private tasteService: TasteApiService, private controlContainer: ControlContainer) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tastesOptions) {
      const changedTasteOptions = changes.tastesOptions.currentValue;

      if (this.isTastesFormModel(changedTasteOptions)) {
        this.typedTastesOptions = changedTasteOptions;
      } else {
        // todo: convert
      }
    }
  }

  // TODO improve
  isTastesFormModel(value: TastesFormModel | TasteFormModel[]): value is TastesFormModel {
    return value.hasOwnProperty('categories');
  }

  writeValue(obj: any): void {

  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    // console.log(this.controlContainer.control instanceof );
  }

}
