import { Taste } from '../models/taste';
import { TasteFormModel } from '../models/taste.form-model';
import { Mapper } from 'src/app/core/mapping';

export class TasteFormModelMapper extends Mapper<Taste, TasteFormModel> {
    MapFromApi(from: Taste): TasteFormModel {
        const formModel = new TasteFormModel();
        formModel.tasteKey = from.name;

        return formModel;
    }
    MapToApi(from: TasteFormModel): Taste {
        throw new Error('Method not implemented.');
    }

}
