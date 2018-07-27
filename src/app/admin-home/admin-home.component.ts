import { Navigate, BcNav } from './common/data/navigate.class';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Params, UrlSegment, Router, NavigationEnd } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  // 面包屑导航获取
  Bcnav = new Navigate();
  // 当前激活的面包屑导航
  actBcNav: BcNav[];
  // 当前激活的菜单
  actMenu: string;
  isCollapsed = false;
  triggerTemplate = null;
  @ViewChild('trigger') customTrigger: TemplateRef<void>;

  /** custom trigger can be TemplateRef **/
  changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }
  constructor(
    private actrouter: ActivatedRoute,
    private router: Router
  ) {
    // 初始化的时候加载面包屑导航数据
    this.actBcNav = this.getBcNav(location.pathname);
  }

  ngOnInit() {
    // 路由切换事件
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
    ).subscribe((event) => {
      this.actBcNav = this.getBcNav(location.pathname);
      // console.log(this.actBcNav);
    });
  }
  /**
  * 获取面包屑导航
  * @param url 输入的pathname
  */
  getBcNav(url: string): BcNav[] {
    let res: BcNav[] = [];
    const urlArray = this.geturl(url);
    if (urlArray.length >= 2) {
      res = this.Bcnav.getnavArray(urlArray[1]);
    } else {
      res = this.Bcnav.getnavArray(urlArray[0]);
    }
    return res;
  }

  /**
   * geturl 把pathname转换成数组
   * @param url 输入的pathname
   * @return 地址数组
   */
  geturl(url: string): string[] {
    let res;
    res = url.split('/');
    // 过滤掉空值
    res = res.filter((e, i, s) => {
      if (e) {
        return true;
      } else {
        return false;
      }
    });
    return res;
  }

  /**
   * 登出
   */
  loginout() {
    sessionStorage.clear();
    this.router.navigate(['/member/login']);
  }
}

