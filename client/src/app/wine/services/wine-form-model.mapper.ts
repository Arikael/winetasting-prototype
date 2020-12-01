import { WineDto } from 'src/app/api/dtos/wine.dto';
import { WineFormModel } from '../models/wine/wine.form-model';
import { Mapper } from 'src/app/core/mapping';

export class WineFormModelMapper implements Mapper<WineDto, WineFormModel> {
    MapFromApi(from: WineDto): WineFormModel {
        return new WineFormModel();
    }

    MapToApi(from: WineFormModel): WineDto {
        const dto = new WineDto();
        dto.base.grapes = from.base.grapes;
        dto.base.name = from.base.name;
        dto.base.producer = from.base.producer;
        dto.base.tastedOn = from.base.tastedOn;
        dto.base.year = from.base.year;

        dto.nose.push()
    }
}
