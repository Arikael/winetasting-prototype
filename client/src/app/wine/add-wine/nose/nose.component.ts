import { Component, OnInit, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { TasteCategory } from '../../models/taste-category';
import { TasteService } from '../../services/taste.service';

@Component({
  selector: 'app-nose',
  templateUrl: './nose.component.html',
  styleUrls: ['./nose.component.scss'],
})
export class NoseComponent implements OnInit, OnChanges {
  keys: Observable<any[]>;
  get tasteCategories(): Observable<TasteCategory[]> {
    return this.tasteService.getTasteCatgories('');
  }

  constructor(private tasteService: TasteService) { }
  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    console.log(changes);
  }

  ngOnInit() {
    this.keys = this.tasteService.getTasteCatgories('');
  }

}
