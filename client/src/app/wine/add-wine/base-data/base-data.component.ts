import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-data',
  templateUrl: './base-data.component.html',
  styleUrls: ['./base-data.component.scss'],
})
export class BaseDataComponent implements OnInit {

  get defaultDate(): string {
    return new Date().toISOString();
  }

  constructor() { }

  ngOnInit() { }

}
