import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserRoleService } from '../../services/userRole.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-user-center',
  templateUrl: './user-center.component.html',
  styleUrls: ['./user-center.component.less']
})
export class UserCenterComponent implements OnInit {

  isSysAdmin = false;
  userInfo;
  selectTeam;
  allAccessTeams = [];
  constructor(
    private userRole: UserRoleService,
    private userService: UserService,
  ) { }

  ngOnInit() {
      this.userRole.userInfoChange.subscribe(userInfo => {
      this.userInfo = userInfo;
      if (_.isUndefined(this.userInfo) || _.isEmpty(this.userInfo)) {
        this.isSysAdmin = false;
        return;
      }
      this.isSysAdmin = this.userRole.isSysAdmin();
      if (this.isSysAdmin) {
        this.allAccessTeams = this.userRole.allAccessGroups;
      }
    });
  }

  logout() {
    this.userService.logout();
  }

  /**
   * 登录
   */
  login() {
    this.userService.login();
  }

  /**
   * 当前用户是否已登录
   */
  isLogin() {
    return this.userRole.isLogin();
  }

}
