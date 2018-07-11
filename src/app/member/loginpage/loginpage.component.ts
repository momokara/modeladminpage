import { Component, OnInit, Inject } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss']
})
export class LoginpageComponent implements OnInit {
  validateForm: FormGroup;
  private logininfo = new LoginInfo();
  constructor(
    private fb: FormBuilder,
    private router: Router,
    @Inject('AjaxServer') private AjaxServer,
  ) {
    if (localStorage.getItem('userinfo')) {
      this.logininfo = JSON.parse(localStorage.getItem('userinfo'));

    }
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: [this.logininfo.userName ? this.logininfo.userName : null, [Validators.required]],
      password: [this.logininfo.password ? this.logininfo.password : null, [Validators.required]],
      remember: [this.logininfo ? this.logininfo.remember : false]
    });

  }
  submitForm(): void {
    if (this.validateForm.value.remember) {
      this.logininfo.userName = this.validateForm.value.userName;
      this.logininfo.password = this.validateForm.value.password;
      this.logininfo.remember = this.validateForm.value.remember;
      localStorage.setItem('userinfo', JSON.stringify(this.logininfo));
    }
    this.AjaxServer.ajax('loginUp', null, this.logininfo)
      .subscribe(res => {
        if (res && res.code === 200) {
          this.router.navigate(['/home']);
        }
      });
  }
}

class LoginInfo {
  userName: string;
  password: string;
  remember: boolean;
}
