import { WineBaseDataModel } from './wine-base-data.form-model';
import { TasteModel } from '../taste.model';

export class WineFormModel {
    id = '';
    base = new WineBaseDataModel();
    tastes: TasteModel[] = [];
}