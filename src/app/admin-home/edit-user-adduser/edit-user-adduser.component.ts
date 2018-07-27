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
  selector: 'app-edit-user-adduser',
  templateUrl: './edit-user-adduser.component.html',
  styleUrls: ['./edit-user-adduser.component.scss']
})
export class EditUserAdduserComponent implements OnInit {
  validateForm: FormGroup;

  checkHas = {
    username: false,
    nickname: false
  };

  userPermGroup = [];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private message: NzMessageService,
    @Inject('AjaxServer') private AjaxServer
  ) {
    // 创建表单
    this.validateForm = this.fb.group({
      username: [null, [Validators.required, this.hasUsername]],
      nickname: [null, [Validators.required, this.hasNickname]],
      password: [null, Validators.required],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      phoneNumber: [null, Validators.required],
      // captcha: [null, Validators.required],
      phoneNumberPrefix: ['+86'],
      permgroup: [null],
    });
  }

  ngOnInit(): void {
    this.getPermGroup();
  }

  // 提交表单
  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    const urlparmas = {
      usertype: '1',
      usertypename: 'worker',
      isedit: false
    };
    console.log(this.validateForm.value, this.validateForm.valid);
    if (this.validateForm.valid) {
      this.AjaxServer.ajax('addUser', urlparmas, this.validateForm.value)
        .subscribe(res => {
          if (res.code === 200) {
            this.message.info('用户创建成功');
            this.router.navigate(['/home/userlist']);
          } else {
            this.message.info(res.msg);
          }
        });
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

  // 获取权限分组
  getPermGroup() {
    const urlParmas = {
      isgetact: true
    };
    this.AjaxServer.ajax('getPermGroup', urlParmas)
      .subscribe(res => {
        if (res.code === 200) {
          this.userPermGroup = res.data;
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
            console.log(res);
            this.checkHas.username = res.hasuser ? true : false;
          } else {
            this.checkHas.nickname = res.hasuser ? true : false;
          }
          // 加载完成之后重新验证
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
  // 验证昵称是否已经注册
  hasNickname = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (this.checkHas.nickname) {
      console.log(this.checkHas.nickname);
      return { hased: true, error: true };
    }
  }

}

