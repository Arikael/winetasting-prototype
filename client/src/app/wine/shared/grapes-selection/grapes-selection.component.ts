import { Component, OnInit, ViewChild, forwardRef } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { GrapeModel, GrapeType } from 'src/app/wine/models/grape.model';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GrapeApiService } from '../../../api/grape-api.service';
import { IonSelect } from '@ionic/angular';


// improve to dynamically use enum key
export class GrapeSelectionView {
  white: string[] = [];
  red: string[] = [];
}

@Component({
  selector: 'app-grapes-selection',
  templateUrl: './grapes-selection.component.html',
  styleUrls: ['./grapes-selection.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GrapesSelectionComponent),
      multi: true
    }
  ]
})
export class GrapesSelectionComponent implements ControlValueAccessor {

  constructor(private grapeService: GrapeApiService) { }

  get favoriteGrapes(): Observable<GrapeModel[]> {
    return this.grapeService.getAllGrapes().pipe(
      map((item) => item.filter(arrItem => arrItem.isFavorite))
    );
  }

  get redGrapes(): Observable<GrapeModel[]> {
    return this.grapeService.getAllGrapes().pipe(
      map((item) => item.filter(arrItem => arrItem.type === GrapeType.red))
    );
  }

  get whiteGrapes(): Observable<GrapeModel[]> {
    return this.grapeService.getAllGrapes().pipe(
      map((item) => item.filter(arrItem => arrItem.type === GrapeType.white))
    );
  }

  selectedGrapes: GrapeModel[] = [];
  grapeSelectValues: GrapeSelectionView = new GrapeSelectionView();

  disabled = false;

  @ViewChild('redGrapeSelect') redGrapeSelect: IonSelect;
  @ViewChild('redGrapeSelect') whiteGrapeSelect: IonSelect;

  onChange = (grapes: string[]) => { };
  onTouched = () => { };

  writeValue(obj: any): void {
    if (Array.isArray(obj)) {
      this.grapeSelectValues.red = obj.filter(x => x.type === 'red');
      this.grapeSelectValues.white = obj.filter(x => x.type === 'white');
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  isFavoriteDisabled(favorite: GrapeModel): boolean {
    return this.grapeSelectValues[favorite.name].findIndex(x => x === favorite.name) > -1;
  }

  onFavoriteClick(favorite: GrapeModel) {
    this.syncFavoriteToSelect(favorite);
  }

  onWhiteGrapeSelectChanged(event: any) {
    this.setGrapeValues(event.detail.value, GrapeType.white);
  }

  onRedGrapeSelectChanged(event: any) {
    this.setGrapeValues(event.detail.value, GrapeType.red);
  }

  private setGrapeValues(values: string[], type: GrapeType) {
    this.grapeSelectValues[type] = values;
    this.onChange(this.getCompleteValue());
  }

  private syncFavoriteToSelect(favorite: GrapeModel) {
    if (this.grapeSelectValues[favorite.type].findIndex(x => x === favorite.name) === -1) {
      this.grapeSelectValues[favorite.type] = [...this.grapeSelectValues[favorite.type], favorite.name];
      this.onChange(this.getCompleteValue());
    }
  }

  private getCompleteValue(): string[] {
    return [...this.grapeSelectValues.red, ...this.grapeSelectValues.white];
  }
}
