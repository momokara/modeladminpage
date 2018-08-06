import { element } from 'protractor';
import { ListData } from '../../admin-home/common/data/pagedata.class';
import { Component, OnInit, Inject } from '@angular/core';
import { Md5 } from 'ts-md5';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss']
})
export class LoginpageComponent implements OnInit {
  // 验证表单
  validateForm: FormGroup;
  // 登录信息
  private logininfo = new LoginInfo();
  // 是否显示userlist
  isShowUserList = false;
  // 保存的用户列表
  userList = {
    socure: [],
    data: []
  };
  constructor(
    private fb: FormBuilder,
    private router: Router,
    @Inject('AjaxServer') private AjaxServer,
    @Inject('IndexxedDB') private IndexxedDB,
    @Inject('filterArray') private filterArray
  ) {
    if (localStorage.getItem('userinfo')) {
      this.logininfo = JSON.parse(localStorage.getItem('userinfo'));
    }
    this.validateForm = this.fb.group({
      userName: [this.logininfo.username ? this.logininfo.username : null, [Validators.required]],
      password: [this.logininfo.password ? this.logininfo.password : null, [Validators.required]],
      remember: [this.logininfo ? this.logininfo.remember : false]
    });
    this.gethisUserInfo();
  }


  ngOnInit() {
  }
  gethisUserInfo(): void {
    this.IndexxedDB.open().then((res) => {
      this.IndexxedDB.selectByIndex('UserInfo', 'username', null)
        .then(result => {
          if (result.length > 0) {
            this.userList.socure = result;
          }
        }).catch((e) => {
          console.error('读取错误', e);
        });
    });
  }

  submitForm(): void {
    this.logininfo.username = this.validateForm.value.userName;
    this.logininfo.password = this.validateForm.value.password;
    this.logininfo.remember = this.validateForm.value.remember;
    if (this.validateForm.value.remember) {
      localStorage.setItem('userinfo', JSON.stringify(this.logininfo));
    }
    console.log(this.validateForm.get('userName'));
    this.AjaxServer.ajax('loginUp', null, this.logininfo)
      .subscribe((res, error) => {
        console.log(res, error);
        if (res && res.code === 200) {
          if (res.data.uid) {
            this.router.navigate(['/home']);
            sessionStorage.setItem('user-id', res.data.uid);
            sessionStorage.setItem('user-token', res.data.token);
            if (this.validateForm.value.remember) {
              this.saveUserInfoinlcdb({
                uid: res.data.uid,
                username: this.validateForm.value.userName,
                password: this.validateForm.value.password
              });
            }
          }
        }
      });
  }
  /**
   * 记录用户信息到本地数据库
   * @param userdata: Userinfo 需要记录的用户信息
   */
  saveUserInfoinlcdb(userdata: Userinfo): void {
    // 查询记录
    this.IndexxedDB.open().then((res) => {
      this.IndexxedDB.selectByKey('UserInfo', userdata.uid)
        .then(result => {
          // 删除旧记录
          if (result) {
            this.IndexxedDB.delete('UserInfo', userdata.uid)
              .then(() => {
                // 写入新记录
                this.IndexxedDB.insert('UserInfo', userdata)
                  .then(() => {
                  }).catch((e) => {
                    console.error('写入错误', e);
                  });
              }).catch((e) => {
                console.error('删除出错', e);
              });
          } else {
            // 写入新记录
            this.IndexxedDB.insert('UserInfo', userdata)
              .then(() => {
              }).catch((e) => {
                console.error('写入错误', e);
              });
          }
        }).catch((e) => {
          console.error('读取错误', e);
        });

    });
  }
  deleteUserHis(uid: any) {
    console.log(uid);
    // 查询记录
    this.IndexxedDB.open().then((res) => {
      this.IndexxedDB.selectByKey('UserInfo', uid)
        .then(result => {
          // 删除旧记录
          if (result) {
            this.IndexxedDB.delete('UserInfo', uid)
              .then(() => {
              }).catch((e) => {
                console.error('删除出错', e);
              });
          }
        }).catch((e) => {
          console.error('读取错误', e);
        });
    });
  }
  /**
   * 清除表单对应字段内容
   * @param inputname 需要清空的 表单字段
   */
  clean(inputname: string[]): void {
    const cleanNames: string[] = [];
    if (inputname.length > 0) {
      // tslint:disable-next-line:no-shadowed-variable
      inputname.forEach(element => {
        this.validateForm.setControl(element, this.fb.control(null));
      });
    }
  }
  /**
   * 响应输入事件
   * @param e 输入的值
   */
  changeusername(e): void {
    if (e && this.userList.socure.length > 0) {
      this.userList.data = this.filterArray.searchInArray(e, ['username'], this.userList.socure).result;
      if (this.userList.data.length > 0) {
        this.isShowUserList = true;
      }
    } else {
      this.isShowUserList = false;
    }
  }
  /**
   * 根据选中写入用户名
   * @param username 写入的用户名
   */
  setUserName(username: string, password: string): void {
    console.log(username, password);
    this.validateForm.setControl('userName', this.fb.control(username));
    this.validateForm.setControl('password', this.fb.control(password));
    this.isShowUserList = false;
  }
}
interface Userinfo {
  uid: string;
  username: string;
  password: string;
}
class LoginInfo {
  username: string;
  password: string;
  remember: boolean;
}
