import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

export enum ChipListSelectionMode {
  Single,
  Multiple,
  None
}

@Component({
  selector: 'app-chip-list',
  templateUrl: './chip-list.component.html',
  styleUrls: ['./chip-list.component.scss'],
})
export class ChipListComponent implements OnInit, OnChanges {

  @Input() items: any[] = [];
  @Input() selectedItems: any[] = [];
  @Input() label = undefined;
  @Input() key = 'key';
  @Input() backgroundColor = 'secondary';
  @Input() selectedBackgroundColor = 'tertiary';
  @Input() selectionMode = ChipListSelectionMode.Single;
  @Input() class = '';

  @Output() selectedItemsChanged = new EventEmitter<any[]>();
  @Output() chipClicked = new EventEmitter<any>();

  chipsConfig: [{
    selected: boolean,
    item: any
  }];

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit() { }

  private isItemSelected(item: any): boolean {
    return this.getItemSelectedIndex(item) > -1;
  }

  private getItemSelectedIndex(item: any): number {
    return this.selectedItems.findIndex((x: any) => x[this.key] === item[this.key]);
  }

  getChipColor(item: any): string {
    return this.isItemSelected(item) ? this.selectedBackgroundColor : this.backgroundColor;
  }

  onChipClick(item: any) {
    if (this.selectionMode === ChipListSelectionMode.None) {
      return;
    }

    const selectedItemIndex = this.getItemSelectedIndex(item);

    if (this.selectionMode === ChipListSelectionMode.Single) {
      this.selectedItems = [item];
    } else {
      if (selectedItemIndex > -1) {
        this.selectedItems.splice(selectedItemIndex, 1);
      } else {
        this.selectedItems.push(item);
      }
    }

    this.selectedItemsChanged.emit(this.selectedItems);
    this.chipClicked.emit(item);
  }

}
