import { Injectable } from '@angular/core';
// cookies 的基本写入,读取,删除操作
@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor() { }

  /**
   * 写入cookie
   * @param cname 字段名
   * @param cvalue 值
   * @param exdays 过去时间
   */
  set(cname, cvalue, exdays): void {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + '; ' + expires;
  }

  /**
   * 读取cookies
   * @param cname 字段名
   */
  get(cname): string {
    const name = cname + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') { c = c.substring(1); }
      if (c.indexOf(name) !== -1) { return c.substring(name.length, c.length); }
    }
    return '';
  }

  /**
   * 删除cookies
   * @param cname 字段名
   */
  del(cname): void {
    this.set(cname, null, -1);
  }
}
