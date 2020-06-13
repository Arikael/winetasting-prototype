import { TasteFormModel } from './taste.form-model';

export class TastesFormModel {
    categories: {
        [index: string]: TasteFormModel[];
    } = {};
}
