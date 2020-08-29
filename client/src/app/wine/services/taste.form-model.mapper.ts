import { Taste } from '../models/taste';
import { TasteSelectFormModel } from '../models/taste.form-model';
import { Mapper } from 'src/app/core/mapping';

export class TasteFormModelMapper extends Mapper<Taste, TasteSelectFormModel> {
    MapFromApi(from: Taste): TasteSelectFormModel {
        const formModel = new TasteSelectFormModel();
        formModel.tasteKey = from.name;
        formModel.tasteCategory = from.tasteCategory;

        return formModel;
    }
    MapToApi(from: TasteSelectFormModel): Taste {
        throw new Error('Method not implemented.');
    }

}
