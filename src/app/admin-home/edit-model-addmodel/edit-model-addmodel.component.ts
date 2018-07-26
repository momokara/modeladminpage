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
  selector: 'app-edit-model-addmodel',
  templateUrl: './edit-model-addmodel.component.html',
  styleUrls: ['./edit-model-addmodel.component.scss']
})
export class EditModelAddmodelComponent implements OnInit {
  validateForm: FormGroup;

  checkHas = {
    username: false,
    nickname: false
  };

  userGroup = [];
  userStyle = [];
  userTag = [];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private message: NzMessageService,
    @Inject('AjaxServer') private AjaxServer
  ) {
    // 创建表单
    this.validateForm = this.fb.group({
      modelname: [null, [Validators.required]],
      realname: [null],
      height: [null],
      weight: [null],
      bust: [null],
      waist: [null],
      hips: [null],
      clothsize: [null],
      shoessize: [null],
      phoneNumber: [null, Validators.required],
      // captcha: [null, Validators.required],
      phoneNumberPrefix: ['+86'],
      group: [null],
      modelstyle: [null],
      tags: [null]
    });
  }

  ngOnInit(): void {
    this.getModelGroup();
  }

  // 提交表单
  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    const urlparmas = {
      usertype: '2'
    };
    console.log(this.validateForm.value, this.validateForm.valid);
    if (this.validateForm.valid) {
      this.AjaxServer.ajax('addUser', urlparmas, this.validateForm.value)
        .subscribe(res => {
          if (res.code === 200) {
            this.message.info('用户创建成功');
            this.router.navigate(['/home/modellist']);
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
  getModelGroup() {
    const urlParmas = {
      isgetact: true
    };
    this.AjaxServer.ajax('getModelGroup', urlParmas)
      .subscribe(res => {
        if (res.code === 200) {
          this.userGroup = res.data.userGroup;
          this.userStyle = res.data.userStyle;
          this.userTag = res.data.userTag;
        }
      });
  }


}

