import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
@Component({
  selector: 'app-findpsw',
  templateUrl: './findpsw.component.html',
  styleUrls: ['./findpsw.component.scss']
})
export class FindpswComponent implements OnInit {
  current = 0;

  index = 'First-content';
  validateForm: FormGroup;
  PasswordForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.validateForm = this.fb.group({
      phoneNumberPrefix: ['+86'],
      phoneNumber: [null, [Validators.required]],
      captcha: [null, [Validators.required]]
    });
    this.PasswordForm = this.fb.group({
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
    });
  }

  ngOnInit() {
  }
  // 上一部
  pre(): void {
    this.current -= 1;
    this.changeContent();
  }
  // 下一步
  next(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      this.current += 1;
      this.changeContent();
    }

  }
  // 完成
  done(): void {
    // tslint:disable-next-line:forin
    for (const i in this.PasswordForm.controls) {
      this.PasswordForm.controls[i].markAsDirty();
      this.PasswordForm.controls[i].updateValueAndValidity();
    }
    if (this.PasswordForm.valid) {
      console.log('done');
    } else {
      console.log('err');
    }

  }

  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.index = 'First-content';
        break;
      }
      case 1: {
        this.index = 'Second-content';
        break;
      }
      // case 2: {
      //   this.index = 'third-content';
      //   break;
      // }
      default: {
        this.index = 'error';
      }
    }
  }

  // 验证密码一致 实时
  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.PasswordForm.controls.checkPassword.updateValueAndValidity());
  }
  // 验证密码一致
  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.PasswordForm.controls.password.value) {
      return { confirm: true, error: true };
    }
  }
  // 获取验证码
  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
    console.log(this.validateForm.value.phoneNumber);
  }

}
