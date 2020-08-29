import { Component, OnInit, AfterViewInit, AfterContentInit, Input, OnChanges, SimpleChanges, forwardRef } from '@angular/core';
import { TasteApiService } from '../../../api/taste-api.service';
import { ControlValueAccessor, FormArray, FormControl, ControlContainer, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TasteSelectFormModel } from '../../models/taste.form-model';
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

  @Input() tastesOptions: TastesFormModel | TasteSelectFormModel[];
  typedTastesOptions: TastesFormModel;

  private value: TasteSelectFormModel[];

  /*formArray: FormArray;
  get formGroup(): FormGroup {
    if (this.controlContainer?.control instanceof FormArray) {
      return this.controlContainer.control.parent as FormGroup;
    }

    return null;
  }*/

  onChange = (tastes: TasteSelectFormModel[]) => { };
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
  isTastesFormModel(value: TastesFormModel | TasteSelectFormModel[]): value is TastesFormModel {
    return value.hasOwnProperty('categories');
  }

  writeValue(obj: any): void {
    this.value = obj || [];
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

  onTasteSelectionChanged(value: TasteSelectFormModel) {
    this.syncTaste(value);

    this.onChange(this.value);
  }

  ngOnInit() {
    // console.log(this.controlContainer.control instanceof );
  }


  private syncTaste(tasteToSync: TasteSelectFormModel) {
    const existantValue = this.value.findIndex(x => x.tasteKey === tasteToSync.tasteKey);

    if (tasteToSync.isSelected && existantValue === -1) {
      this.value.push(tasteToSync);
    } else if (!tasteToSync.isSelected && existantValue > -1) {
      this.value.splice(existantValue, 1);
    }
  }
}
