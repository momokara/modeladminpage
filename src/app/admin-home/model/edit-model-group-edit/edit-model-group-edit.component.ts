import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-edit-model-group-edit',
  templateUrl: './edit-model-group-edit.component.html',
  styleUrls: ['./edit-model-group-edit.component.scss']
})
export class EditModelGroupEditComponent implements OnInit {
  validateForm: FormGroup;
  Checkedbox: FormGroup;
  checkedPerm = [];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private actrouter: ActivatedRoute,
    private message: NzMessageService,
    @Inject('AjaxServer') private AjaxServer
  ) {
    // 创建表单
    this.validateForm = this.fb.group({
      gid: [null, [Validators.required]],
      g_type: ['group', [Validators.required]],
      group_name: [null, [Validators.required]],
      group_info: [null]
    });
  }

  ngOnInit() {
    this.getGroupInfo(this.actrouter.snapshot.paramMap.get('id'));
  }

  // 获取分类信息
  getGroupInfo(id: string) {
    const urlParmas = {
      gid: id,
      usertype: '2',
    };
    console.log(urlParmas);
    this.AjaxServer.ajax('getModelGroupInfo', urlParmas)
      .subscribe(res => {
        if (res.code === 200) {
          console.log(res.data);
          this.validateForm.setControl('gid', this.fb.control(res.data.gid));
          this.validateForm.setControl('g_type', this.fb.control(res.data.g_type));
          this.validateForm.setControl('group_name', this.fb.control(res.data.group_name));
          this.validateForm.setControl('group_info', this.fb.control(res.data.group_info));
        }
      });
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
      usertype: '2',
      usertypename: 'model',
      isedit: true
    };
    if (this.validateForm.valid) {
      this.AjaxServer.ajax('editGroup', urlParamas, this.validateForm.value)
        .subscribe(res => {
          if (res.code === 200) {
            this.message.info('修改成功');
            this.router.navigate(['/home/modelgroup']);
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

}
