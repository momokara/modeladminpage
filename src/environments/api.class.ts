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
