import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './modules/permission.guard';
import { UserCenterComponent } from './header/user-center/user-center.component';


const routes: Routes = [
  {
    path: 'demo',
    component: UserCenterComponent,
    canActivate: [LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
