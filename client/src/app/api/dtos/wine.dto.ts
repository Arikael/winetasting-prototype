
export class WineBaseDto {
    name = '';
    year = 0;
    producer = '';
    grapes: string[] = [];
    tastedOn = '';
}

export class TasteDto {
    tasteKey = '';
  when = '';
  howMuch = '';
}

export class WineDto {
    base: WineBaseDto = new WineBaseDto();
    nose: TasteDto[] = [];
}

