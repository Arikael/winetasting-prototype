import { GrapeModel } from '../grape.model';

export class WineBaseDataFormModel {
    name = '';
    year = 0;
    producer = '';
    grapes: string[] = [];
    tastedOn = '';
}
