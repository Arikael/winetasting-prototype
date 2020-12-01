import { Observable } from 'rxjs';
import { FormService } from '../../core/form.service';
import { WineFormService } from './wine-form.service';
import { WineApiService } from 'src/app/api/wine-api.service';
import { WineDto } from 'src/app/api/dtos/wine.dto';
import { MediatorResult, Mediator } from 'src/app/core/mediator/mediator';
import { Injectable } from '@angular/core';
import { WineFormModel } from '../models/wine/wine.form-model';
import { WineFormModelMapper } from './wine-form-model.mapper';

@Injectable({
    providedIn: 'root'
})
export class WineFormSubmitMediator extends Mediator {
    constructor(private formService: FormService<WineFormModel>, private apiService: WineApiService,
        private mapper: WineFormModelMapper) {
        super();
    }

    action(): void | Observable<MediatorResult> {
        const value = this.formService.getForm().value;
        // map to API Model
        const dto = this.mapper.MapToApi(value);

        this.apiService.saveWine(dto);
    }
}
