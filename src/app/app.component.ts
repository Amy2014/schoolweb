import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { UserRoleService } from './services/userRole.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'angularAPP';
  loading = true;
  userUndefined = true;

  constructor(
    private userRole: UserRoleService
  ) {
  }

  ngOnInit(): void {
    this.userRole.init();
    this.userRole.userInfoChange.subscribe(userInfo => {
      if (!_.isUndefined(userInfo)) {
        this.loading = false;
        this.userUndefined = false;
      } else {
        this.loading = false;
        this.userUndefined = true;
      }
    });
  }

}
