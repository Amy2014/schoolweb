import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { GlobalStateService } from '../services/globalState.service';
import { UserRoleService } from '../services/userRole.service';
import { UserService } from '../services/user.service';


/**
 * 判断当前用户是否登录，未登录的跳转至openid登录
 */
@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private globalStateService: GlobalStateService,
    private userRole: UserRoleService,
    private userService: UserService
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return Observable.create(observer => {
      this.userRole.userInfoChange.subscribe(userInfo => {
        if (this.userRole.isUserInfoUndefined()) {
          return;
        }
        if (this.userRole.isLogin()) {
          observer.next(true);
        } else {
          this.userService.login(state.url);
          observer.next(false);
        }
      });
    });
  }
}

/**
 * 判断当前用户是否属于该项目组，项目组编号从路由中teamId获取，调用该guard需确保已通过LoginGuard
 */
@Injectable({
  providedIn: 'root'
})
export class ProjectGuard implements CanActivate {
  constructor(
    private globalStateService: GlobalStateService,
    private userRole: UserRoleService,
    private router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return Observable.create(observer => {
      let group = next.params.group;
      if (_.isUndefined(group)) {
        group = next.data.group;
      }
      if (this.userRole.isSysAdmin()) {
        observer.next(true);
      } else if (this.userRole.hasGroup(group)) {
        observer.next(true);
      } else {
        // this.router.navigate(['/', 'no-permission', 'no-access'], {queryParams: {teamId: next.params.teamId}});
        observer.next(false);
      }
    });
  }
}

/**
 * 判断当前用户是否是该项目组的管理员，项目组编号从路由中teamId获取，调用该guard需确保已通过LoginGuard
 */
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private globalStateService: GlobalStateService,
    private userRole: UserRoleService,
    private router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return Observable.create(observer => {
      let group = next.params.group;
      console.log('next', next);
      if (_.isUndefined(group)) {
        group = next.data.group;
      }
      if (this.userRole.isSysAdmin()) {
        observer.next(true);
      } else if (this.userRole.isGroupAdmin(group)) {
        observer.next(true);
      } else {
        // this.router.navigate(['/', 'no-permission', 'no-admin'], {queryParams: {teamId: next.params.teamId}});
        observer.next(false);
      }
    });
  }
}

/**
 * 判断当前用户是否是系统管理员，调用该guard需确保已通过LoginGuard
 */
@Injectable({
  providedIn: 'root'
})
export class SysAdminGuard implements CanActivate {
  constructor(
    private globalStateService: GlobalStateService,
    private userRole: UserRoleService,
    private router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return Observable.create(observer => {
      if (this.userRole.isSysAdmin()) {
        observer.next(true);
      } else {
        this.router.navigate(['/', 'no-permission', 'no-sys-admin'], {queryParams: {teamId: next.params.teamId}});
        observer.next(false);
      }
    });
  }
}
