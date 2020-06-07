import { FormModelFactory } from './form-model-factory';
import { WineFormModel } from '../models/wine/wine.form-model';
import { WineBaseDataModel } from '../models/wine/wine-base-data.form-model';

// maybe add mapper
export class WineFormModelFactory extends FormModelFactory {
    createWineFormModel() {
        const model = new WineFormModel();
        model.base = new WineBaseDataModel();
        model.base.tastedOn = new Date().toISOString();
        model.base.year = new Date().getFullYear() - 1;

        return model;
    }
}
