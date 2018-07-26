import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-edit-model-group-add',
  templateUrl: './edit-model-group-add.component.html',
  styleUrls: ['./edit-model-group-add.component.scss']
})
export class EditModelGroupAddComponent implements OnInit {
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
      g_type: ['group', [Validators.required]],
      group_name: [null, [Validators.required]],
      group_info: [null]
    });
  }

  ngOnInit() {
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
      this.AjaxServer.ajax('addGroup', null, this.validateForm.value)
        .subscribe(res => {
          if (res.code === 200) {
            this.message.info('分类创建成功');
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
