import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-edit-user-single-info',
  templateUrl: './edit-user-single-info.component.html',
  styleUrls: ['./edit-user-single-info.component.scss']
})
export class EditUserSingleInfoComponent implements OnInit {
  pagedata = new UserInfo;
  validateForm: FormGroup;
  checkHasnickname = false;
  sendCode = {
    issend: false,
    btntext: '获取验证码'
  };
  editpage = {
    isShowPwd: false,
    iseditNickname: false,
    iseditPwd: false,
    iseditPhone: false,
    iseditPermGroup: false,
  };
  userPermGroup = [];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private actrouter: ActivatedRoute,
    private message: NzMessageService,
    @Inject('AjaxServer') private AjaxServer
  ) {
    // 创建表单
    this.validateForm = this.fb.group({
      phoneNumberPrefix: ['+86'],
      // permgroup: [null],
    });
  }

  ngOnInit(): void {
    this.getuserinfobyId(this.actrouter.snapshot.paramMap.get('id'));
  }
  /**
   * 修改昵称
   * @param isedit 是否添加 false 的时候 是移除
   */
  editNickname(isedit = true) {
    this.editpage.iseditNickname = isedit;
    if (isedit) {
      this.validateForm.addControl('nickname', new FormControl(this.pagedata.nickname, [Validators.required, this.hasNickname]));
    } else {
      this.validateForm.removeControl('nickname');
    }
  }
  /**
   * 修改密码
   * @param isedit 是否添加 false 的时候 是移除
   */
  editPwd(isedit = true) {
    this.editpage.iseditPwd = isedit;
    if (isedit) {
      this.validateForm.addControl('password', new FormControl(null, Validators.required));
      this.validateForm.addControl('checkPassword', new FormControl(null, [Validators.required, this.confirmationValidator]));
    } else {
      this.validateForm.removeControl('password');
      this.validateForm.removeControl('checkPassword');
    }
  }
  /**
   * 修改手机号
   * @param isedit 是否添加 false 的时候 是移除
   */
  editPhone(isedit = true) {
    this.editpage.iseditPhone = isedit;
    if (isedit) {
      this.validateForm.addControl('phoneNumber', new FormControl(this.pagedata.phone, Validators.required));
      this.validateForm.addControl('captcha', new FormControl(null, Validators.required));
    } else {
      this.validateForm.removeControl('phoneNumber');
      this.validateForm.removeControl('captcha');
    }
  }
  /**
 * 修改权限组
 * @param isedit 是否添加 false 的时候 是移除
 */
  editPermGroup(isedit = true) {
    this.editpage.iseditPermGroup = isedit;
    if (isedit) {
      this.validateForm.addControl('permgroup', new FormControl(this.pagedata.u_perm_group));
    } else {
      this.validateForm.removeControl('permgroup');
    }
  }
  // 提交表单
  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.validateForm.value, this.validateForm.valid);
    if (this.validateForm.valid) {
      this.AjaxServer.ajax('editUserInfo', null, this.validateForm.value)
        .subscribe(res => {
          if (res.code === 200) {
            this.message.info(res.msg);
            this.router.navigate(['/home/userlist']);
          }
        });
    }

  }

  /**
  * 检测重复
  * @param type 1 用户名 2 昵称
  */
  checkhased(): void {
    let urlparmas;
    const apiname = 'checkNickname';
    urlparmas = { nickname: this.validateForm.controls.nickname.value };
    this.AjaxServer.ajax(apiname, urlparmas)
      .subscribe(res => {
        if (res.code === 200) {
          this.checkHasnickname = res.hasuser ? true : false;
        }
      });
  }

  // 验证昵称是否重复
  hasNickname = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (this.checkHasnickname) {
      console.log(this.checkHasnickname);
      return { hased: true, error: true };
    }
  }
  // 验证密码一致 实时
  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }
  // 验证密码一致
  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
  }

  // 验证手机号有效
  isPhone = (control: FormControl): { [s: string]: boolean } => {
    const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!control.value) {
      return { required: true };
    } else if (!myreg.test(control.value)) {
      return { isphone: true, error: true };
    }
  }
  // 获取验证码
  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
    const urlParmas = {
      phone: this.validateForm.value.phoneNumber
    };
    if (this.validateForm.get('phoneNumber').valid) {
      this.AjaxServer.ajax('sendCode', urlParmas)
        .subscribe(res => {
          if (res.code === 200) {
            this.sendCode.issend = true;
            this.sendCode.btntext = '已发送';
            this.autocount(60, 1000);
            setTimeout(() => {
              console.log('倒计时结速');
              this.sendCode.issend = false;
            }, 1);
          } else {
            alert(res.msg);
            this.sendCode.issend = false;
            this.sendCode.btntext = '重新发送';
          }
        });
    } else {
      alert('请输入正确的手机号');
    }
  }
  // 自动计数
  // *dom 显示内容的dom
  // *time 开始倒计时的时间
  // *delay 间隔延迟
  autocount(time, delay) {
    let i = time;
    console.log('btntext:', this.sendCode.btntext);
    const setwork = setInterval(function () {
      if (i > 0) {
        i--;
        console.log(i);
      } else {
        clearInterval(setwork);
      }
    }, delay);
  }

  // 获取用户信息
  getuserinfobyId(id: string) {
    const urlParmas = {
      uid: id
    };
    this.AjaxServer.ajax('getUserInfo', urlParmas)
      .subscribe(res => {
        if (res.code === 200) {
          this.pagedata = res.data;
        }
      });
    this.AjaxServer.ajax('getPermGroup')
      .subscribe(res => {
        if (res.code === 200) {
          this.userPermGroup = res.data;
        }
      });
  }
}

class UserInfo {
  id: number;
  nickname: string;
  phone: number;
  email: string;
  u_perm_group: string;
}
