import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ToolbarrComponent } from './toolbarr/toolbarr.component'
import { MaterialModule } from './material';



@NgModule({
  declarations: [
     ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    RouterModule,

  ],
  exports:[]

})
export class SharedModule {
  static forRoot(): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
    throw new Error('Method not implemented.');
  }
}
