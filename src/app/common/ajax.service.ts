import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Api } from './../../environments/api.class';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AjaxService {
  // 是否是测试模式 true的时候会用get 直接拿静态文件的json
  private readonly isTest: boolean = environment.istest;
  // 定义基准API地址
  public api = new Api(environment.baseurl);
  // 定义请求头
  private httpOptionsdef = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'user-id': '',
      'user-token': '',
    }),
    params: new HttpParams()
  };

  constructor(
    private http: HttpClient
  ) { }

  /**
   * 获得信息方式 this.isTest 控制是否测试 测试用GET 正式用POST
   * @param apiurl api地址
   * @param urldata url中要传递的参数
   * @param postdata post中要传送的数据
   * @param ispostjson 是否使用 application/json 直接post json
   */
  ajax(apiurl: string, urldata?: Object, postdata?: Object, ispostjson?: boolean): Observable<any> {
    // 处理测试数据
    if (this.isTest && postdata) {
      console.log('postdata', postdata);
      postdata = null;
    } else {
      if (ispostjson) {
        this.httpOptionsdef.headers = this.httpOptionsdef.headers.set('Content-Type', 'application/json; charset=UTF-8');
      } else if (!ispostjson) {
        this.httpOptionsdef.headers = this.httpOptionsdef.headers.set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        postdata = this.transformRequestJson(postdata);
      }
    }
    // 处理请求头
    if (sessionStorage.getItem('user-id')) {
      this.httpOptionsdef.headers = this.httpOptionsdef.headers.set('user-id', sessionStorage.getItem('user-id'));
    }
    if (sessionStorage.getItem('user-token')) {
      this.httpOptionsdef.headers = this.httpOptionsdef.headers.set('user-token', sessionStorage.getItem('user-token'));
    }
    // 处理get参数
    const url = this.api.getUrl(apiurl, this.isTest);
    // const url = urldata ?
    //   this.api.getUrl(apiurl, this.isTest) + '?' + this.transformRequestJson(urldata) : this.api.getUrl(apiurl, this.isTest);
    let urlparams = new HttpParams();
    if (urldata) {
      for (const k in urldata) {
        if (k) {
          urlparams = urlparams.append(k, `${urldata[k]}`);
          console.log(urlparams, k, urldata[k]);
        }
      }
    }
    this.httpOptionsdef.params = urlparams;



    // post 请求
    if (postdata) {
      return this.http.post(url, postdata, this.httpOptionsdef)
        .pipe(
          map((res: any, e) => {
            if (res.code !== 200) {
              alert(res.msg);
            }
            return res;
          }),
          catchError(this.handleError())
        );
      // get 请求
    } else {
      return this.http.get(url, this.httpOptionsdef)
        .pipe(
          map((res: any, e) => {
            if (res.code !== 200) {
              alert(res.msg);
            }
            return res;
          }),
          catchError(this.handleError())
        );
    }
  }

  // 输出错误
  // @param *message:string 错误信息
  private log(message: string): void {
    const data = new Date();
    console.error('error:', data, message);
  }

  // 转换Json 未key-value 对
  // @param *data:json 需要被转换的json数据
  // @return string encodeURIComponent编码之后的key=value数据
  transformRequestJson(data: any): string {
    const str = [];
    for (const k in data) {
      if (k) {
        str.push(encodeURIComponent(k) + '=' + encodeURIComponent(data[k]));
      }
    }
    return str.join('&');
  }
  // 处理错误
  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      // console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
