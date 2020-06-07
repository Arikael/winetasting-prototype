import { WineDto } from 'src/app/api/dtos/wine.dto';
import { WineFormModel } from '../models/wine/wine.form-model';

export class WineFormModelMapper implements Mapper<WineDto, WineFormModel> {
    MapFromApi(from: WineDto): WineFormModel {
        return new WineFormModel();
    }

    MapToApi(from: WineFormModel): WineDto {
        return new WineDto();
    }
}
