import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormComponent } from 'src/app/shared/form-component';

@Component({
  selector: 'app-base-data',
  templateUrl: './base-data.component.html',
  styleUrls: ['./base-data.component.scss'],
})
export class BaseDataComponent extends FormComponent implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() { }

}
