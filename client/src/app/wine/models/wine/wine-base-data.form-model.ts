import { GrapeModel } from '../grape.model';

export class WineBaseDataModel {
    name = '';
    year = 0;
    producer = '';
    grapes: string[] = [];
    tastedOn = '';
}
