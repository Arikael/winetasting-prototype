import { FormModelFactory } from './form-model-factory';
import { WineFormModel } from '../models/wine/wine.form-model';
import { WineBaseDataFormModel } from '../models/wine/wine-base-data.form-model';
import { Injectable } from "@angular/core";

// maybe add mapper
@Injectable()
export class WineFormModelFactory extends FormModelFactory {
    createWineFormModel() {
        const model = new WineFormModel();
        model.base = new WineBaseDataFormModel();
        model.base.tastedOn = new Date().toISOString();
        model.base.year = new Date().getFullYear() - 1;

        model.tastes = [];

        return model;
    }
}
