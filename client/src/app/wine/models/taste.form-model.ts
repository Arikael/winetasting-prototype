export class TasteSelectFormModel {
  tasteKey = '';
  isSelected = false;
  when = '';
  howMuch = '';
  tasteCategory = '';

  static isOfType(obj: any): obj is TasteSelectFormModel {
    if ('tasteKey' in obj && 'isSelected' in obj) {
      return true;
    }

    return false;
  }
}
