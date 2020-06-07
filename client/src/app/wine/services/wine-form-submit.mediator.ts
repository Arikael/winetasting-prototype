import { Observable } from 'rxjs';
import { FormService } from '../../core/form.service';
import { WineFormService } from './wine-form.service';
import { WineApiService } from 'src/app/api/wine-api.service';
import { WineDto } from 'src/app/api/dtos/wine.dto';
import { MediatorResult, Mediator } from 'src/app/core/mediator/mediator';

export class WineFormSubmitMediator extends Mediator {
    constructor(private formService: WineFormService, private apiService: WineApiService) {
        super();
    }

    action(): void | Observable<MediatorResult> {
        const value = this.formService.getForm().value;
        // map to API Model
        this.apiService.saveWine(new WineDto());
    }
}
