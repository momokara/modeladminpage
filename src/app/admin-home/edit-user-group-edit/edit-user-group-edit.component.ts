import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-edit-user-group-edit',
  templateUrl: './edit-user-group-edit.component.html',
  styleUrls: ['./edit-user-group-edit.component.scss']
})
export class EditUserGroupEditComponent implements OnInit {
  // 提交系信息
  validateForm: FormGroup;
  // 权限复选
  Checkedbox: FormGroup;
  // 选中的权限
  checkedPerm = [];
  // 权限组id
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private actrouter: ActivatedRoute,
    private message: NzMessageService,
    @Inject('AjaxServer') private AjaxServer
  ) {
    // 创建表单
    this.validateForm = this.fb.group({
      pid: [null, [Validators.required]],
      group_name: [null, [Validators.required]],
      group_perm: [null],
    });
    this.Checkedbox = this.fb.group({
      perm1: [],
      perm2: [],
      perm3: [],
      perm4: [],
      perm5: []
    });
    // 获取路由中id
    console.log(this.actrouter.snapshot.paramMap.get('id'));

  }

  ngOnInit() {
    this.getperminfo(this.actrouter.snapshot.paramMap.get('id'));
  }

  // 提交表单
  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.validateForm.value, this.validateForm.valid);
    const urlParamas = {
      isedit: true
    };
    if (this.validateForm.valid) {
      this.AjaxServer.ajax('editPermGroup', urlParamas, this.validateForm.value)
        .subscribe(res => {
          if (res.code === 200) {
            this.message.info('权限组修改成功');
            this.router.navigate(['/home/userpermgroup']);
          }
        });
    }

  }
  /**
   * 获取权限组信息
   */
  getperminfo(id) {
    const urlParamas = {
      pid: id
    };
    this.AjaxServer.ajax('getdPermGroup', urlParamas)
      .subscribe(res => {
        if (res.code === 200) {
          this.validateForm.setControl('pid', this.fb.control(res.data.pid));
          this.validateForm.setControl('group_name', this.fb.control(res.data.group_name));
          this.validateForm.setControl('group_perm', this.fb.control(res.data.group_perm));
          this.selectchecked(res.data.group_perm);
        }
      });
  }
  /**
   * 标记选中的checkbox
   * @param checkedlist 选中权限的列表
   */
  private selectchecked(checkedlist: string[]) {
    checkedlist.forEach((e, i, arr) => {
      this.Checkedbox.setControl(e, this.fb.control(true));
    });
  }
  /**
   * 改变之后选中的值
   */
  log(value: string[]): void {
    this.checkedPerm = value;
    console.log(value, this.Checkedbox.value);
  }



}
