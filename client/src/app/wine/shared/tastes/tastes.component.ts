import { Component, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';
import { TasteService } from '../../services/taste.service';
import { Observable } from 'rxjs';
import { TasteCategory } from '../../models/taste-category';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-tastes',
  templateUrl: './tastes.component.html',
  styleUrls: ['./tastes.component.scss'],
})
export class TastesComponent implements OnInit, AfterViewInit, AfterContentInit {
  tasteCategories: Observable<TasteCategory[]>;

  constructor(private tasteService: TasteService) { }
  ngAfterContentInit(): void {
    this.tasteCategories = this.tasteService.getTasteCatgories('').pipe(delay(0));

  }
  ngAfterViewInit(): void {

  }

  ngOnInit() {
  }

}
