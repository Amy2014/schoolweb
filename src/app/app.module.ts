import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import zh from '@angular/common/locales/zh';
import {registerLocaleData} from '@angular/common';
import {SharedModule} from './modules/shared/shared.module';
import { UserCenterComponent } from './header/user-center/user-center.component';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { HeadNavComponent } from './header/head-nav/head-nav.component';

registerLocaleData(zh);
@NgModule({
  declarations: [
    AppComponent,
    UserCenterComponent,
    HeadNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'csrftoken',
      headerName: 'X-CSRFToken',
    }),
    BrowserAnimationsModule,
    SharedModule,
    FormsModule,
    NgZorroAntdMobileModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
