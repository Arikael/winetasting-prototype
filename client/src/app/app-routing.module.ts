import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { WineListComponent } from './wine/wine-list/wine-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'wines', pathMatch: 'full' },
  { path: 'wine', loadChildren: () => import('./wine/wine.module').then( m => m.WineModule)},
  { path: 'wines', component: WineListComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
