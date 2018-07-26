export class Api {
  // 基础路径
  private readonly basicUrl: string;
  // 注册
  private readonly userReg: string = 'index/index/register';
  // 登录
  private readonly loginUp: string = 'index/index/login';
  // 用户列表
  private readonly userList: string = 'index/index/userlist';
  // 发送验证码
  private readonly sendCode: string = 'index/index/send_sms';
  // 获取权限组列表 isgetact=true 时反回当前激活的权限组
  private readonly getPermGroup: string = 'index/index/userpermlist';
  // 添加权限组
  private readonly addPermGroup: string = 'index/index/addpermlist';
  // 获取权限组信息（单个）
  private readonly getdPermGroup: string = 'index/index/getperminfo';
  // 停用权限组 post 方式传送PID (权限组id)
  private readonly forbiddenPermG: string = 'index/index/forbiddenpermg';
  // 启用权限组
  private readonly openPermG: string = 'index/index/openpermg';
  // 获取用户分组
  private readonly getUserGroup: string = 'index/index/getusergroup';
  // 添加用户 usertype = model(模特)/worker(工作人员)
  private readonly addUser: string = 'index/index/adduser';
  // 停用用户 usertype = model(模特)/worker(工作人员)
  private readonly forbiddenUser: string = 'index/index/forbiddenuser';
  // 启用用户 usertype = model(模特)/worker(工作人员)
  private readonly openUser: string = 'index/index/openuser';
  // 获取用户信息
  private readonly getUserInfo: string = 'index/index/getuserinfo';
  // 编辑用户信息 usertype = model(模特)/worker(工作人员)
  private readonly editUserInfo: string = 'index/index/edituserinfo';
  // 验证用户重复
  private readonly checkUsername: string = 'index/index/checkuser';
  // 验证昵称重复
  private readonly checkNickname: string = 'index/index/checkuser';

  private readonly test: string = '/';

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
