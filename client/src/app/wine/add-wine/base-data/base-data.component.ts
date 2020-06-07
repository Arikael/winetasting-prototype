import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-base-data',
  templateUrl: './base-data.component.html',
  styleUrls: ['./base-data.component.scss'],
})
export class BaseDataComponent implements OnInit {

  @Input() formGroup: FormGroup;

  get defaultDate(): string {
    return new Date().toISOString();
  }

  constructor() {
  }

  ngOnInit() { }

}
