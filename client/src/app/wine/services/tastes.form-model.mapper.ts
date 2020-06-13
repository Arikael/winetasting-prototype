import { TastesFormModel } from '../models/tastes.form-model';
import { TasteCategory } from '../models/taste-category';
import { Taste } from '../models/taste';
import { TasteFormModelMapper } from './taste.form-model.mapper';
import { Mapper } from 'src/app/core/mapping';

export class TastesFormModelMapper extends Mapper<TasteCategory[], TastesFormModel> {
    MapFromApi(from: TasteCategory[]): TastesFormModel {
        // use DI
        const tasteMapper = new TasteFormModelMapper();
        const formModel = new TastesFormModel();

        for (const category of from) {
            formModel.categories[category.name] = [];
            category.tastes.map((x: Taste) => {
                formModel.categories[category.name].push(tasteMapper.MapFromApi(x));
            });
        }

        return formModel;
    }

    MapToApi(from: TastesFormModel): TasteCategory[] {
        throw new Error('Method not implemented.');
    }

}
