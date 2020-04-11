import { Routes, PreloadAllModules, RouterModule } from '@angular/router';
import { AddWineComponent } from './edit-wine/add-wine.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: 'add', component: AddWineComponent}
];

@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
  export class WineRoutingModule { }
