import { Routes, PreloadAllModules, RouterModule } from '@angular/router';
import { AddWineComponent } from './add-wine/add-wine.component';
import { NgModule } from '@angular/core';
import { TastesComponent } from './shared/tastes/tastes.component';
import { BaseDataComponent } from './add-wine/base-data/base-data.component';
import { SummaryComponent } from './add-wine/summary/summary.component';

const routes: Routes = [
  {
    path: 'add',
    component: AddWineComponent,
    children: [
      {
        path: '',
        redirectTo: 'base',
        pathMatch: 'full'
      },
      {
        path: 'base',
        component: BaseDataComponent
      },
      {
        path: 'smell',
        component: TastesComponent
      },
      {
        path: 'taste',
        component: TastesComponent
      },
      {
        path: 'summary',
        component: SummaryComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class WineRoutingModule { }
