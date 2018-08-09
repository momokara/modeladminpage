import { filter } from 'rxjs/operators';
// 面包屑导航显示
// 根据名称 自动适配中文名字以及父级页面
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
  // 管理员管理
  public readonly userdefault: BcNav = {
    'name': '管理员管理',
    'url': '/home/userdefault',
    'parent': 'home',
    'children': ['userlist', 'usergroup']
  };
  // 管理员管理-所有管理员
  public readonly userlist: BcNav = {
    'name': '所有管理员',
    'url': '/home/userlist',
    'parent': 'userdefault',
    'children': ['edituser']
  };
  // 管理员管理-添加管理员
  public readonly adduser: BcNav = {
    'name': '添加管理员',
    'url': '/home/adduser',
    'parent': 'userlist',
    'children': []
  };
  // 管理员管理-管理员详情
  public readonly edituser: BcNav = {
    'name': '管理员详情',
    'url': '/home/edituser',
    'parent': 'userlist',
    'children': []
  };
  // 管理员管理-管理员权限组
  public readonly userpermgroup: BcNav = {
    'name': '管理员权限组',
    'url': '/home/userpermgroup',
    'parent': 'userdefault',
    'children': ['addpermgroup', 'editpermgroup']
  };
  // 管理员管理-添加管理员权限组
  public readonly addpermgroup: BcNav = {
    'name': '添加权限组',
    'url': '/home/addpermgroup',
    'parent': 'userpermgroup',
    'children': []
  };
  // 管理员管理-编辑管理员权限组
  public readonly editpermgroup: BcNav = {
    'name': '编辑权限组',
    'url': '/home/addpermgroup',
    'parent': 'userpermgroup',
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
    'children': ['addmodel', 'editmodel']
  };
  // 模特管理-模特列表-添加模特
  public readonly addmodel: BcNav = {
    'name': '添加模特',
    'url': '/home/addmodel',
    'parent': 'modellist',
    'children': []
  };
  // 模特管理-模特列表-编辑模特信息
  public readonly editmodel: BcNav = {
    'name': '编辑模特信息',
    'url': '/home/editmodel',
    'parent': 'modellist',
    'children': []
  };
  // 模特管理-模特列表-模特作品
  public readonly modelfile: BcNav = {
    'name': '模特作品',
    'url': '/home/modelfile',
    'parent': 'modellist',
    'children': ['modelvideo', 'modelfile']
  };
  // 模特管理-模特列表-模特作品-视频
  public readonly modelvideo: BcNav = {
    'name': '编辑视频',
    'url': '/home/modelvideo',
    'parent': 'modelfile',
    'children': []
  };
  // 模特管理-模特列表-模特作品-添加视频
  public readonly modelvideoadd: BcNav = {
    'name': '添加视频',
    'url': '/home/modelvideoadd',
    'parent': 'modelfile',
    'children': []
  };
  // 模特管理-模特列表-模特作品-作品集
  public readonly modelimggroup: BcNav = {
    'name': '编辑作品集',
    'url': '/home/modelimggroup',
    'parent': 'modelfile',
    'children': []
  };
  // 模特管理-模特列表-模特作品-添加作品集
  public readonly modelimggroupadd: BcNav = {
    'name': '添加作品集',
    'url': '/home/modelimggroupadd',
    'parent': 'modelfile',
    'children': []
  };
  // 模特管理-模特分组
  public readonly modelgroup: BcNav = {
    'name': '模特分组',
    'url': '/home/modelgroup',
    'parent': 'modeldefault',
    'children': ['addmodelgroup', 'editmodelgroup']
  };
  // 模特管理-模特分组-添加分组
  public readonly addmodelgroup: BcNav = {
    'name': '添加分组',
    'url': '/home/addmodelgroup',
    'parent': 'modelgroup',
    'children': []
  };
  // 模特管理-模特分组-编辑分组
  public readonly editmodelgroup: BcNav = {
    'name': '编辑分组',
    'url': '/home/editmodelgroup',
    'parent': 'modelgroup',
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
