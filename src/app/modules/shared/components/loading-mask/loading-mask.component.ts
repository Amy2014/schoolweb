import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-loading-mask',
  templateUrl: './loading-mask.component.html',
  styleUrls: ['./loading-mask.component.less']
})
export class LoadingMaskComponent implements OnInit {
  @Input()
  loading: boolean;

  @Input()
  tips = 'loading...';
  constructor() { }

  ngOnInit() {
  }

}
