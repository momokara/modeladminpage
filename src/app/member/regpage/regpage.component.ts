import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-regpage',
  templateUrl: './regpage.component.html',
  styleUrls: ['./regpage.component.scss']
})
export class RegpageComponent implements OnInit {

  validateForm: FormGroup;



  constructor(
    private fb: FormBuilder,
    @Inject('AjaxServer') private AjaxServer
  ) {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      nickname: [null, [Validators.required]],
      phoneNumberPrefix: ['+86'],
      phoneNumber: [null, [Validators.required]],
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
    console.log(this.validateForm.value);
    this.AjaxServer.ajax('userReg', null, this.validateForm.value)
      .subscribe(res => {

      });
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
  // 获取验证码
  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
    console.log(this.validateForm.value.phoneNumber);

  }
}
