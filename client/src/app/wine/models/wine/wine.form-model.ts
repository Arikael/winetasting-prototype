import { WineBaseDataFormModel } from './wine-base-data.form-model';
import { TasteSelectFormModel } from '../taste.form-model';
import { WineNoseFormModel } from './wine-nose.form.model';

export class WineFormModel {
    id = '';
    base = new WineBaseDataFormModel();
    nose = new WineNoseFormModel();
    tastes: TasteSelectFormModel[] = [];
}
