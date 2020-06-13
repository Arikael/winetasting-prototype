import { Component, OnInit, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { TasteCategory } from '../../models/taste-category';
import { TasteApiService } from '../../../api/taste-api.service';
import { FormComponent } from 'src/app/shared/form-component';
import { ControlContainer, FormGroup } from '@angular/forms';
import { TastesFormModel } from '../../models/tastes.form-model';
import { TastesFormModelMapper } from '../../services/tastes.form-model.mapper';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-nose',
  templateUrl: './nose.component.html',
  styleUrls: ['./nose.component.scss'],
})
export class NoseComponent implements OnInit, OnChanges {
  get formGroup(): FormGroup {
    return this.controlContainer?.control instanceof FormGroup
      ? this.controlContainer.control as FormGroup
      : null;
  }

   getTastesOptions(): Observable<TastesFormModel> {
    // TODO: use DI
    const mapper = new TastesFormModelMapper();

    return this.tasteService.getTasteCatgories('').pipe(
      map((categories: TasteCategory[]) => mapper.MapFromApi(categories)));
  }

  constructor(private tasteService: TasteApiService, private controlContainer: ControlContainer) {
  }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    console.log(changes);
  }

  ngOnInit() {
    console.log(this.controlContainer.control instanceof FormGroup);
  }

}
