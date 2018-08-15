import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpRoutingModule } from './help-routing.module';
import { HelpHomeComponent } from './help-home/help-home.component';

@NgModule({
  imports: [
    CommonModule,
    HelpRoutingModule
  ],
  declarations: [HelpHomeComponent]
})
export class HelpModule { }
