import { Injectable } from '@angular/core';
// 消息发送服务 全局使用
@Injectable({
  providedIn: 'root'
})
export class MsgService {
  private msg: Object = {};
  constructor() { }
  /**
   * @param key 键
   * @param msg 值
   */
  sendMessage(key: string, msg: string) {
    this.msg[key] = msg;
  }

  /**
  * 清理消息
  */
  clearMessage() {
    this.msg = {};
  }
  /**
  * @param key 键
  * @returns  返回消息
  */
  getMessage(key) {
    return this.msg[key];
  }
}
