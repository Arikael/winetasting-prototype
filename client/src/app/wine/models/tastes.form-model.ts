import { TasteSelectFormModel } from './taste.form-model';

export class TastesFormModel {
    categories: {
        [index: string]: TasteSelectFormModel[];
    } = {};
}
