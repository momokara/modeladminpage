import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl
} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-regpage',
  templateUrl: './regpage.component.html',
  styleUrls: ['./regpage.component.scss']
})
export class RegpageComponent implements OnInit {
  validateForm: FormGroup;
  checkHas = {
    username: false,
    nickname: false
  };

  sendCode = {
    issend: false,
    btntext: '获取验证码'
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    @Inject('AjaxServer') private AjaxServer
  ) {
    // 创建表单
    this.validateForm = this.fb.group({
      username: [null, [Validators.required, this.hasUsername]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      nickname: [null, [Validators.required, this.hasNickname]],
      phoneNumberPrefix: ['+86'],
      phoneNumber: [null, [Validators.required, this.isPhone]],
      captcha: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {

  }
  // 提交表单
  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.validateForm.value, this.validateForm.valid);
    this.AjaxServer.ajax('userReg', null, this.validateForm.value)
      .subscribe(res => {
        if (res.code === 200) {
          this.router.navigate(['/home']);
          sessionStorage.setItem('user-id', res.uid);
          sessionStorage.setItem('user-token', res.token);
        }
      });
  }

  /**
   * 检测重复
   * @param type 1 用户名 2 昵称
   */
  checkhased(type: number): void {
    let urlparmas;
    let apiname = '';
    if (type === 1) {
      apiname = 'checkUsername';
      urlparmas = { username: this.validateForm.controls.username.value };
    } else {
      apiname = 'checkNickname';
      urlparmas = { nickname: this.validateForm.controls.nickname.value };
    }
    this.AjaxServer.ajax(apiname, urlparmas)
      .subscribe(res => {
        if (res.code === 200) {
          if (type === 1) {
            this.checkHas.username = res.hasuser ? true : false;
          } else {
            this.checkHas.nickname = res.hasuser ? true : false;
          }
          this.validateForm.controls.username.updateValueAndValidity();
          this.validateForm.controls.nickname.updateValueAndValidity();
        }
      });
  }
  // 验证用户名是否已经注册
  hasUsername = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (this.checkHas.username) {
      return { hased: true, error: true };
    }
  }
  // 验证用户名是否已经注册
  hasNickname = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (this.checkHas.nickname) {
      // console.log(this.checkHas.nickname);
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
            }, 6000);
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

}
