export enum GrapeType {
  red = 'red',
  white = 'white'
}

export class GrapeModel {
  name = '';
  isFavorite = false;
  type: GrapeType;
}
