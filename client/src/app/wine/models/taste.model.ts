export class TasteModel {
    tasteKey = '';
    isSelected = false;
    when = '';
    howMuch = '';

    static isOfType(obj: any): obj is TasteModel {
      if ('tasteKey' in obj && 'isSelected' in obj) {
        return true;
      }

      return false;
    }
  }
