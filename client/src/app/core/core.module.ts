import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule
  ],
  exports: [
    FlexLayoutModule,
    MaterialModule
  ]
})
export class CoreModule { }
