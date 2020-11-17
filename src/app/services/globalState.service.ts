/**
 * 自定义本地全举变量
 */
import { Injectable } from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalStateService {

  private subjects: Map<string, BehaviorSubject<any>> = new Map<string, BehaviorSubject<any>>();

  constructor() {
  }

  /**
   * 订阅获取一个全局变量，如果无该变量返回undefined
   * @param name
   * @param callback
   */
  subscribe(name: string, callback): Subscription {
    const subject = this.subjects.get(name);
    if (!subject) {
      return undefined;
    }

    return subject.subscribe(value => {
      callback.call(null, value);
    });
  }

  /**
   * 注册添加一个全局变量
   * @param name
   * @param initValue
   */
  register(name: string, initValue: any) {
    this.subjects.set(name, new BehaviorSubject<any>(initValue));
  }

  /**
   * 修改当前全局变量的值
   * @param name
   * @param value
   */
  notify(name: string, value: any): boolean {
    const subject = this.subjects.get(name);
    if (!subject) {
      return false;
    }

    subject.next(value);
  }
}
