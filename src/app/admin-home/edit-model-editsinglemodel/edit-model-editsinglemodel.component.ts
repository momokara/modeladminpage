import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
@Component({
  selector: 'app-edit-model-editsinglemodel',
  templateUrl: './edit-model-editsinglemodel.component.html',
  styleUrls: ['./edit-model-editsinglemodel.component.scss']
})
export class EditModelEditsinglemodelComponent implements OnInit {
  // 表单验证
  validateForm: FormGroup;
  // 图片上传
  imgUploadUrl = 'https://jsonplaceholder.typicode.com/posts/';
  // 所有的用户分组
  userGroup = [];
  // 所有的风格
  userStyle = [];
  // 所有的标签
  userTag = [];
  // 上传加载
  loading = false;
  // avatarUrl: string;
  // 上传图片信息
  headimg = {
    imgid: '',
    imgurl: ''
  };
  fileList = [
    {
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    }
  ];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private actrouter: ActivatedRoute,
    private message: NzMessageService,
    @Inject('AjaxServer') private AjaxServer
  ) {
    // 创建表单
    this.validateForm = this.fb.group({
      uid: [null, [Validators.required]],
      nickname: [null, [Validators.required]],
      realname: [null],
      headimg: [null],
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
    this.imgUploadUrl = this.AjaxServer.getapirul('upLoadImg', 2);
    this.getModelInfo(this.actrouter.snapshot.paramMap.get('id'));
  }

  // 获取模特信息
  getModelInfo(id: string) {
    const urlParmas = {
      uid: id,
      usertype: '2'
    };
    console.log(urlParmas);
    this.AjaxServer.ajax('getUserInfo', urlParmas)
      .subscribe(res => {
        if (res.code === 200) {
          console.log(res.data);
          this.validateForm.setControl('uid', this.fb.control(res.data.uid));
          this.validateForm.setControl('nickname', this.fb.control(res.data.nickname));
          this.validateForm.setControl('realname', this.fb.control(res.data.realname));
          this.validateForm.setControl('headimg', this.fb.control(res.data.headimg));
          this.validateForm.setControl('height', this.fb.control(res.data.height));
          this.validateForm.setControl('weight', this.fb.control(res.data.weight));
          this.validateForm.setControl('bust', this.fb.control(res.data.bust));
          this.validateForm.setControl('waist', this.fb.control(res.data.waist));
          this.validateForm.setControl('hips', this.fb.control(res.data.hips));
          this.validateForm.setControl('clothsize', this.fb.control(res.data.clothsize));
          this.validateForm.setControl('shoessize', this.fb.control(res.data.shoessize));
          this.validateForm.setControl('phoneNumber', this.fb.control(res.data.phone));
          this.validateForm.setControl('group', this.fb.control(res.data.u_group + ''));
          this.validateForm.setControl('modelstyle', this.fb.control(res.data.modelstyle));
          this.validateForm.setControl('tags', this.fb.control(res.data.tags));
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
    const urlparmas = {
      usertype: '2',
      usertypename: 'model',
      isedit: false
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
  // 上传之前的处理
  beforeUpload = (file: File) => {
    console.log(file.type);
    let isJPG = false;
    if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg') {
      isJPG = true;
    }
    if (!isJPG) {
      this.message.error('只能上传jpeg/png/jpg格式的图片!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      this.message.error('图片大小不能大于 2MB!');
    }
    return isJPG && isLt2M;
  }
  // 获取图片路径
  private getBase64(img: File, callback: (img: {}) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  // 上传文件改变时的状态
  handleChange(info: { file: UploadFile }): void {
    if (info.file.status === 'uploading') {
      this.loading = true;
      return;
    }
    if (info.file.status === 'done') {
      console.log(info.file.response);
      if (info.file.response.code === 200) {
        this.headimg.imgid = info.file.response.data.id;
        this.validateForm.setControl('headimg', this.fb.control(info.file.response.data.imgurl));
      }
      // Get this url from response in real world.
      // this.getBase64(info.file.originFileObj, (img: string) => {
      //   this.loading = false;
      //   // this.avatarUrl = img;
      //   this.validateForm.setControl('headimg', this.fb.control(img));
      // });
    }
  }


}

