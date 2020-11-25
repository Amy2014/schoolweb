import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoadingMaskComponent } from './components/loading-mask/loading-mask.component';



@NgModule({
  declarations: [
    LoadingMaskComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    LoadingMaskComponent,
  ]

})
export class SharedModule {
}
