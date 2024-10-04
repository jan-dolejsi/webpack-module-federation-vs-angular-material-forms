import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleARoutingModule } from './module-a-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModuleARoutingModule
  ]
})
export class ModuleAModule { }

// The below line is required to be able to load your module into appshell, and "MfeModule" can not be changed
export { ModuleAModule as MfeModule };
