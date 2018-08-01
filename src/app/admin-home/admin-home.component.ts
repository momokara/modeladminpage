import { Navigate, BcNav } from './common/data/navigate.class';
import { Component, OnInit, ViewChild, TemplateRef, Inject } from '@angular/core';
import { ActivatedRoute, Params, UrlSegment, Router, NavigationEnd } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

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
  uid = null;
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
    private router: Router,
    private titleService: Title,
    @Inject('MsgSer') private MsgSer,
    @Inject('IndexxedDB') private IndexxedDB,
  ) {
    // 初始化的时候加载面包屑导航数据
    this.actBcNav = this.getBcNav(location.pathname.length > 2 ? location.pathname : location.hash);

  }

  ngOnInit() {
    this.uid = this.MsgSer.getMessage('uid');
    this.saveViewHis(event);
    // 路由切换事件
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
    ).subscribe((event) => {
      const urlinfo = location.pathname.length > 2 ? location.pathname : location.hash;
      if (urlinfo) {
        this.actBcNav = this.getBcNav(urlinfo) ? this.getBcNav(urlinfo) : [];
      }
      // 写入访问记录
      this.saveViewHis(event);
      this.uid = this.MsgSer.getMessage('uid');
    });

  }
  /**
  * 获取面包屑导航
  * @param url 输入的pathname
  */
  getBcNav(url: string): BcNav[] {
    let res: BcNav[] = [];
    const urlArray = this.geturl(url) ? this.geturl(url) : [];
    if (urlArray.length > 0) {
      res = this.Bcnav.getnavArray(urlArray[0]);
    }
    if (res.length > 0) {
      this.titleService.setTitle(`星网模特卡-${res[res.length - 1].name}`);
    } else {
      this.titleService.setTitle(`星网模特卡`);
    }
    return res;
  }

  // 记录访问记录
  saveViewHis(router: any) {
    const uid = sessionStorage.getItem('user-id');
    // 写入记录
    if (uid) {
      const timestamp = (new Date()).valueOf();
      const data = {
        logID: timestamp,
        roter: router,
        uid: uid
      };
      this.IndexxedDB.open().then((res) => {
        this.IndexxedDB.insert('ViewHistory', data)
          .then(() => {
            this.IndexxedDB.close();
          }).catch((e) => {
            console.error('写入错误', e);
            this.IndexxedDB.close();
          });
        this.IndexxedDB.cleanViewDB();
      });
    }
  }

  /**
   * geturl 把pathname转换成数组
   * @param url 输入的pathname
   * @return 地址数组
   */
  geturl(url: string): string[] {
    let res;
    const arrurl = url.split('/home/');
    if (arrurl[1]) {
      res = arrurl[1].split('/');
      // 过滤掉空值
      res = res.filter((e, i, s) => {
        if (e && e !== '#') {
          return true;
        } else {
          return false;
        }
      });
    } else {
      res = null;
    }
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

