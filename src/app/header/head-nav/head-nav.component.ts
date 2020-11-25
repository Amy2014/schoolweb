import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-head-nav',
  templateUrl: './head-nav.component.html',
  styleUrls: ['./head-nav.component.less']
})
export class HeadNavComponent implements OnInit, AfterViewInit {
  hidden = false;
  fullScreen = true;
  topFlag = true;
  tintColor = '#515151';
  unselectedTintColor = '#888';
  tabbarStyle: object = {
    position: 'fixed',
    height: '100%',
    width: '100%',
    top: 0,
  };
  selectedIndex = 1;
  navItem: any = [
    {name: '主页', iconUrl: './../assets/img/home.png', normal: '#21b68a4d', focus: '#ededed', content: 'content'},
    {name: '放行列表', iconUrl: './../assets/img/travel.svg', normal: '#ff5b054d', focus: '#ededed', content: 'content'},
    {name: '来访列表', iconUrl: './../assets/img/visitor.svg', normal: '#03a9f44d', focus: '#ededed', content: 'content'},
    {name: '陪读家长', iconUrl: './../assets/img/parent.svg', normal: '#9c27b04d', focus: '#ededed', content: 'content'},
    {name: '洗车预约', iconUrl: './../assets/img/car.svg', normal: '#0096884d', focus: '#ededed', content: 'content'},
    {name: '修改密码', iconUrl: './../assets/img/password.svg', normal: '#ffeb3b4d', focus: '#ededed', content: 'content'},
    {name: '退出登录', iconUrl: './../assets/img/logout.svg', normal: '#f443364d', focus: '#ededed', content: 'content'}];

  @ViewChild('content') content: TemplateRef<any>[];
  contentlist = [];

  constructor() { }

  ngOnInit(): void {
  }

  tabBarTabOnPress(pressParam: any) {
    console.log('onPress Params: ', pressParam);
    this.selectedIndex = pressParam.index;
  }
  showTabBar(event) {
    event.preventDefault();
    this.hidden = !this.hidden;
  }

  showNextTabBar(event) {
    event.preventDefault();
    const PANE_COUNT = 4;
    if (this.selectedIndex === PANE_COUNT - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
    console.log('selectedIndex: ', this.selectedIndex);
  }
  showFullScreen(event) {
    event.preventDefault();
    this.fullScreen = !this.fullScreen;
    this.tabbarStyle = this.fullScreen
      ? {
        position: 'fixed',
        height: '100%',
        width: '100%',
        top: 0
      }
      : { height: '400px' };
  }

  changePosition(event) {
    event.preventDefault();
    this.topFlag = !this.topFlag;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.contentlist = [this.content];
      console.log(this.contentlist);
    }, 10);

  }
}
