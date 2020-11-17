import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { LoadingMaskComponent } from './components/loading-mask/loading-mask.component';



@NgModule({
  declarations: [
    LoadingMaskComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule
  ],
  exports: [
    LoadingMaskComponent,
  ]

})
export class SharedModule {
}
