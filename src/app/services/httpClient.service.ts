import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(
    private http: HttpClient
  ) {
  }

  transKeys(data, format) {
    if (_.isArray(data)) {
      _.each(data, d => {
        this.transKeys(d, format);
      });
    } else if (_.isObject(data)) {
      _.forIn(data, (value, key) => {
        this.transKeys(value, format);
        const newKey = this.transFormat(key, format);
        if (newKey !== key) {
          data[newKey] = value;
          delete data[key];
        }
      });
    }
    return data;
  }

  transFormat(value: string, format: string) {
    if (format === 'camelCase') {
      return _.camelCase(value);
    } else if (format === 'snakeCase') {
      return _.snakeCase(value);
    } else {
      return value;
    }
  }

  parseParams(queryParams: object) {
    let params: HttpParams = new HttpParams({});
    _.forIn(queryParams, (value, key) => {
      params = params.set(key.toString(), value);
    });
    return params;
  }

  createOptions(params?: object, headerParams?: object): any {
    let headers = new HttpHeaders({});

    const token = environment.token;
    if (!!token) {
      headers = headers.set('Authorization', `Token ${token}`);
    }
    if (!!headerParams) {
      _.forEach(headerParams, (k, v) => {
        headers = headers.set(v, k);
      });
    }
    const options: any = {
      headers,
    };

    if (!!params) {
      options.params = this.parseParams(params);
    }

    return options;
  }

  public get(url: string, params?: any, headerParams?: any): Observable<any> {
    const transParams = this.transKeys(params, 'snakeCase');
    return this.http.get(url, this.createOptions(transParams, headerParams)).pipe(
      map(res => this.transKeys(res, 'camelCase')),
      catchError(this.basicCatchError)
    );
  }

  post(url: string, data: any, params?: any): Observable<any> {
    const transParams = this.transKeys(params, 'snakeCase');
    const transData = this.transKeys(data, 'snakeCase');
    return this.http.post(url, transData, this.createOptions(transParams)).pipe(
      map(res => this.transKeys(res, 'camelCase')),
      catchError(this.basicCatchError)
    );
  }

  put(url: string, data: any, params?: any): Observable<any> {
    const transParams = this.transKeys(params, 'snakeCase');
    const transData = this.transKeys(data, 'snakeCase');
    return this.http.put(url, transData, this.createOptions(transParams)).pipe(
      map(res => this.transKeys(res, 'camelCase')),
      catchError(this.basicCatchError)
    );
  }

  patch(url: string, data: any, params?: any): Observable<any> {
    const transParams = this.transKeys(params, 'snakeCase');
    const transData = this.transKeys(data, 'snakeCase');
    return this.http.patch(url, transData, this.createOptions(transParams)).pipe(
      map(res => this.transKeys(res, 'camelCase')),
      catchError(this.basicCatchError)
    );
  }

  delete(url: string, params?: any): Observable<any> {
    const transParams = this.transKeys(params, 'snakeCase');
    return this.http.delete(url, this.createOptions(transParams)).pipe(
      map(res => this.transKeys(res, 'camelCase')),
      catchError(this.basicCatchError)
    );
  }

  /**
   * 错误捕获函数
   * @param {HttpErrorResponse} err - http请求的报错
   * @returns {Observable<any>} - 返回的Observable对象
   */
  basicCatchError(err: HttpErrorResponse): Observable<any> {
    // 隐藏404，403以及500报错，并返回一个undefined的数据
    // 其余错误抛出
    // if (err.status === 404 || err.status === 403 || err.status === 500) {
    //   return of(undefined);
    // } else {
    //   throw err;
    // }
    throw err;
  }
}
