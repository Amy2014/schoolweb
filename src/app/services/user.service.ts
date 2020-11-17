/**
 * 用户登录
 */
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClientService} from './httpClient.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = `${environment.serverHost}/${environment.apiVersion}/api`;
  userInfoUrl = `${this.baseUrl}/user`;

  constructor(
    private http: HttpClientService,
  ) {
  }

  login(nextUrl = '/') {
    const loginUrl = `/openid/login/?next=${nextUrl}`;
    window.location.href = loginUrl;
  }

  logout() {
    const logoutUrl = '/logout/';
    window.location.href = logoutUrl;
  }

  getUserInfo() {
    return this.http.get(this.userInfoUrl);
  }

}
