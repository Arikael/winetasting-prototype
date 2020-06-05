import { FormModelFactory } from './form-model-factory';
import { WineFormModel } from '../models/wine/wine.form-model';

export class WineFormModelFactory extends FormModelFactory {
    createWineFormModel() {
        return new WineFormModel();
    }
}
