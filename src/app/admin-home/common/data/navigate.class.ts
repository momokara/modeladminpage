import { filter } from 'rxjs/operators';
// 面包屑导航
export class Navigate {
  // 根页面
  public readonly home: BcNav = {
    'name': '管理中心',
    'url': '/home/default',
    'parent': null,
    'children': ['userdefault', 'modeldefault', 'uploaddefault']
  };
  // 根页面
  public readonly default: BcNav = {
    'name': '管理中心',
    'url': '/home/default',
    'parent': null,
    'children': []
  };
  // 帐号管理
  public readonly userdefault: BcNav = {
    'name': '帐号管理',
    'url': '/home/userdefault',
    'parent': 'home',
    'children': ['userlist', 'usergroup']
  };
  // 帐号管理-用户列表
  public readonly userlist: BcNav = {
    'name': '用户列表',
    'url': '/home/userlist',
    'parent': 'userdefault',
    'children': ['edituser']
  };
  // 帐号管理-添加用户
  public readonly adduser: BcNav = {
    'name': '添加用户',
    'url': '/home/edituser',
    'parent': 'userlist',
    'children': []
  };
  // 帐号管理-用户详情
  public readonly edituser: BcNav = {
    'name': '用户详情',
    'url': '/home/edituser',
    'parent': 'userlist',
    'children': []
  };
  // 帐号管理-用户分组
  public readonly usergroup: BcNav = {
    'name': '用户分组',
    'url': '/home/usergroup',
    'parent': 'userdefault',
    'children': []
  };
  // 模特管理
  public readonly modeldefault: BcNav = {
    'name': '模特管理',
    'url': '/home/modeldefault',
    'parent': 'home',
    'children': ['modellist', 'modelgroup']
  };
  // 模特管理-模特列表
  public readonly modellist: BcNav = {
    'name': '模特列表',
    'url': '/home/modellist',
    'parent': 'modeldefault',
    'children': []
  };
  // 模特管理-模特分组
  public readonly modelgroup: BcNav = {
    'name': '模特分组',
    'url': '/home/modelgroup',
    'parent': 'modeldefault',
    'children': []
  };
  // 文件管理
  public readonly uploaddefault: BcNav = {
    'name': '文件管理',
    'url': '/home/uploaddefault',
    'parent': 'home',
    'children': ['uploadimglist', 'upvideolist']
  };
  // 文件管理-图片列表
  public readonly uploadimglist: BcNav = {
    'name': '图片列表',
    'url': '/home/uploadimglist',
    'parent': 'uploaddefault',
    'children': []
  };
  // 文件管理-视频列表
  public readonly upvideolist: BcNav = {
    'name': '视频列表',
    'url': '/home/upvideolist',
    'parent': 'uploaddefault',
    'children': []
  };
  /**
   * @param getnavArray
   * @param actnave:string 当前激活的菜单
   * return:array 面包屑导航的data 数组
   */
  public getnavArray(actnave: string): BcNav[] {
    let res: BcNav[] = [];
    let rowdata = this[actnave];
    if (rowdata) {
      res = [rowdata].concat(res);
      while (rowdata.parent) {
        rowdata = this[rowdata.parent];
        res = [rowdata].concat(res);
      }
    }
    return res;
  }
  /**
   * @param getMenu 获取菜单数组
   */
  public getMenu(): any {
    let res: any;
    res = [];
    const root = this.home;
    res = this.getchildrenMenu(this.home.children);
    res.forEach(element => {
      element.childrenMenu = this.getchildrenMenu(element.children);
    });
    return res;
  }
  /**
   * @param childrenMenuList 子菜单列表 children
   * @returns 子菜单列表
   */
  private getchildrenMenu(childrenMenuList: string[]): BcNav[] {
    let res: BcNav[] = [];
    if (childrenMenuList.length > 0) {
      childrenMenuList.forEach(e => {
        res = res.concat([this[e]]);
      });
    }
    return res;
  }
}

export class BcNav {
  name: string;
  url: string;
  parent: string;
  children: string[];
}
