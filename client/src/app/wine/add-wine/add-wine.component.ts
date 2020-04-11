import { Component, OnInit } from '@angular/core';
import { WizardService } from 'src/app/wizard/wizard.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  providers: [
    WizardService
  ],
  selector: 'app-add-wine',
  templateUrl: './add-wine.component.html',
  styleUrls: ['./add-wine.component.scss'],
})
export class AddWineComponent implements OnInit {
  constructor(private wizardService: WizardService) {
    this.wizardService.createSteps([
      {
        id: 'base',
        icon: 'document-outline',
        link: 'add/base'
      },
      {
        id: 'nose',
        icon: 'nutrition-outline',
        link: 'add/nose'
      },
      {
        id: 'mouth',
        icon: 'restaurant-outline',
        link: 'add/mouth'
      },
      {
        id: 'rating',
        icon: 'star-half',
        link: 'add/rating'
      }
    ]);
  }

  ngOnInit() {}

}
