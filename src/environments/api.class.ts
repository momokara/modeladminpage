export class Api {
  // 基础路径
  private readonly basicUrl: string;
  // 注册
  private readonly userReg: string = 'register';
  // 登录
  private readonly loginUp: string = 'login';
  // 用户列表
  private readonly userList: string = 'userlist';
  // 发送验证码
  private readonly sendCode: string = 'send_sms';

  // 获取权限组列表 isgetact=true 时反回当前激活的权限组
  private readonly getPermGroup: string = 'userpermlist';
  // 添加权限组
  private readonly addPermGroup: string = 'editpermlist';
  // 编辑权限组
  private readonly editPermGroup: string = 'editpermlist';
  // 获取权限组信息（单个）
  private readonly getdPermGroup: string = 'getperminfo';
  // 停用权限组 post 方式传送PID (权限组id)
  private readonly forbiddenPermG: string = 'forbiddenpermg';
  // 启用权限组
  private readonly openPermG: string = 'openpermg';

  // 添加用户 usertype = model(模特)/worker(工作人员)
  private readonly addUser: string = 'edituserinfo';
  // 编辑用户信息 usertype = model(模特)/worker(工作人员)
  private readonly editUserInfo: string = 'edituserinfo';
  // 获取用户信息
  private readonly getUserInfo: string = 'getuserinfo';
  // 获取模特作品
  private readonly getModelFiles: string = 'getmodelfile';

  // 停用用户 usertype = model(模特)/worker(工作人员)
  private readonly forbiddenUser: string = 'forbiddenuser';
  // 启用用户 usertype = model(模特)/worker(工作人员)
  private readonly openUser: string = 'openuser';
  // 验证用户重复
  private readonly checkUsername: string = 'checkuser';
  // 验证昵称重复
  private readonly checkNickname: string = 'checkuser';
  // 获取用户分组
  private readonly getUserGroup: string = 'getusergroup';
  // 上传图片
  private readonly upLoadImg: string = 'uploadimg';
  // 添加照片集/编辑
  private readonly editImgGroup: string = 'editimggroup';

  // 添加分类/分组
  private readonly addGroup: string = 'addgroup';
  // 编辑分类/分组
  private readonly editGroup: string = 'addgroup';
  // 获取模特分组
  private readonly getModelGroup: string = 'getmodelgroup';
  // 获取模特分组
  private readonly getModelGroupInfo: string = 'getmodelgroupinfo';
  // 停用模特分组
  private readonly forbiddenGroup: string = 'forbiddengroup';
  // 启用模特分组
  private readonly openGroup: string = 'opengroup';

  constructor(webroot: BasicUrl) {
    // 必须初始化
    this.basicUrl = webroot.baseherf;
  }

  // 登陆获取API地址
  // @param *apiname:string 接口名称
  // @param *istest:Boolean 是否测试
  // @return url:string     接口请求的具体地址
  public getUrl(apiname: string, istest: Boolean): string {
    let resUrl: string;
    resUrl = apiname ? this[apiname] : 'apierror';
    if (istest) {
      resUrl = resUrl + '.json';
    }
    resUrl = this.basicUrl + resUrl;
    return resUrl;
  }

}
interface BasicUrl {
  baseherf: string;
}
