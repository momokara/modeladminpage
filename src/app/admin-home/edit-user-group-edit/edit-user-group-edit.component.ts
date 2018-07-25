import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { extend } from 'webdriver-js-extender';


@Component({
  selector: 'app-edit-user-group-edit',
  templateUrl: './edit-user-group-edit.component.html',
  styleUrls: ['./edit-user-group-edit.component.scss']
})
export class EditUserGroupEditComponent implements OnInit {
  validateForm: FormGroup;
  Checkedbox: FormGroup;
  checkedPerm = [];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private message: NzMessageService,
    @Inject('AjaxServer') private AjaxServer
  ) {
    // 创建表单
    this.validateForm = this.fb.group({
      group_name: [null, [Validators.required]],
      group_perm: [null, [Validators.required]],
    });
    this.Checkedbox = this.fb.group({
      perm1: [],
      perm2: [],
      perm3: [],
      perm4: [],
      perm5: []
    });
  }

  ngOnInit() {
    this.Checkedbox.setControl('perm1', this.fb.control(true));
  }

  // 提交表单
  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.validateForm.value, this.validateForm.valid);
    // tslint:disable-next-line:no-eval
    // const concatjson = '(' + (JSON.stringify(this.validateForm.value) + JSON.stringify(this.Checkedbox.value)).replace(/}{/, ',') + ')';
    // eval
    // console.log(jsonstr);

    // const postdata = JSON.parse(jsonstr);

    if (this.validateForm.valid) {
      this.AjaxServer.ajax('addPermGroup', null, this.validateForm.value)
        .subscribe(res => {
          if (res.code === 200) {
            this.message.info('权限组创建成功');
            this.router.navigate(['/home/userlist']);
          } else {
            this.message.info(res.msg);
          }
        });
    }

  }

  log(value: string[]): void {
    this.checkedPerm = value;
    console.log(value, this.Checkedbox.value);

  }

  haschecked(tagname: string) {

    return true;
  }

}
