import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'mfe1',
    loadChildren: () => import('mfe1/Module')
      .then(m => m.MfeModule)
  },
  {
    path: 'mfe2',
    loadChildren: () => import('mfe2/Module')
      .then(m => m.MfeModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
