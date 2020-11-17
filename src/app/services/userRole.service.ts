/**
 * 用户角色权限等信息
 */
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class UserRoleService {
  userInfo;
  allGroups = [];
  allAccessGroups = [];
  selectTeam: string = null;
  userInfoChange = new BehaviorSubject(undefined);
  selectTeamChange = new BehaviorSubject(undefined);

  constructor(
    private userService: UserService,
    // private groupService: GroupService,
  ) {
  }

  init() {
    this.initUserInfo();
    this.initSelectTeam();
  }

  /**
   * 获取用户基本信息
   */
  getUserInfo() {
    this.userService.getUserInfo().subscribe(userInfo => {
      // console.log('userInfo', userInfo);
      if (!_.isEmpty(userInfo)) {
        this.userInfo = userInfo;
        return;
      } else {
        this.userInfo = {} as any;
      }
      this.userInfoChange.next(this.userInfo);
    }, err => {
      this.userInfo = {} as any;
      this.userInfoChange.next(this.userInfo);
    });
  }

  /**
   * 用户基本信息初始化
   */
  initUserInfo() {
    this.getUserInfo();
  }

  /**
   * 用户基本信息更新
   */
  updateUserInfo() {
    this.getUserInfo();
  }

  /**
   * 初始化用户当前所选组
   */
  initSelectTeam() {
    this.selectTeam = localStorage.getItem('selectTeam');
    this.userInfoChange.subscribe(userInfo => {
      this.userInfo = userInfo;
      if (_.isUndefined(this.userInfo) || _.isEmpty(this.userInfo)) {
        return;
      }
      const isSysAdmin = this.isSysAdmin();
      if (isSysAdmin) {
        const t = _.find(this.allAccessGroups, {name: this.selectTeam});
        if (_.isNull(this.selectTeam) || _.isUndefined(t)) {
          this.selectTeam = this.allAccessGroups[0].name;
          localStorage.setItem('selectTeam', this.selectTeam);
        }
      } else {
        if (this.userInfo.userAccessGroup.length <= 0) {
          this.selectTeam = null;
          localStorage.removeItem('selectTeam');
        } else {
          if (_.isNull(this.selectTeam) ||
            _.isUndefined(_.find(this.userInfo.userAccessGroup, item => item.group.name === this.selectTeam))) {
            this.selectTeam = this.userInfo.userAccessGroup[0].group.name;
            localStorage.setItem('selectTeam', this.selectTeam);
          }
        }
      }
      this.selectTeamChange.next(this.selectTeam);
    });
  }

  /**
   * 当前用户信息是否存在
   */
  isUserInfoUndefined() {
    return _.isUndefined(this.userInfo);
  }

  isUserInfoEmpty() {
    return _.isEmpty(this.userInfo);
  }

  /**
   * 获取当前选择的组
   */
  getSelectTeam() {
    return this.selectTeam;
  }

  /**
   * 切换选择的组
   * @param teamId
   */
  changeSelectTeam(teamId: string) {
    if (this.selectTeam === teamId) {
      return;
    }
    this.selectTeam = teamId;
    localStorage.setItem('selectTeam', teamId);
    this.selectTeamChange.next(this.selectTeam);
  }

  /**
   * 获取当前的组
   * @param teamId
   */
  getSeletcTeamID() {
    const selectTeam = _.find(this.allAccessGroups, team => {
      return team.name === this.selectTeam;
    });
    return selectTeam;
  }

  /**
   * 是否是teamId对应组的管理员
   * @param teamId
   */
  isGroupAdmin(group: string) {
    if (this.isUserInfoUndefined() || this.isUserInfoEmpty()) {
      return false;
    }
    const team = _.find(this.userInfo.userAccessGroup, item => item.group.name === group);
    if (_.isUndefined(team) || team.role.role !== 'GA') {
      return false;
    } else {
      return true;
    }
  }

  /**
   * 当前用户是否已登录
   */
  isLogin() {
    return !(this.isUserInfoUndefined() || this.isUserInfoEmpty());
  }

  /**
   * 是否是系统管理员
   */
  isSysAdmin() {
    if (this.isUserInfoUndefined() || this.isUserInfoEmpty()) {
      return false;
    }
    return this.userInfo.userRole.indexOf('SA') >= 0;
  }

  /**
   * 当前用户是否属于group对应的组
   * @param group
   */
  hasGroup(group: string) {
    if (_.isEmpty(this.userInfo)) {
      return false;
    }
    const team = _.find(this.userInfo.userAccessGroup, item => item.group.name === group);
    if (_.isUndefined(team)) {
      return false;
    }
    return true;
  }

  /**
   * 根据项目代号获取项目id
   * @param name
   */
  transformGroupNameToId(name) {
    const group = _.find(this.allAccessGroups, {name});
    if (group) {
      return group.id;
    }
    return null;
  }
}
