export class TasteFormModel {
  tasteKey = '';
  isSelected = false;
  when = '';
  howMuch = '';
  tasteCategory = '';

  static isOfType(obj: any): obj is TasteFormModel {
    if ('tasteKey' in obj && 'isSelected' in obj) {
      return true;
    }

    return false;
  }
}
