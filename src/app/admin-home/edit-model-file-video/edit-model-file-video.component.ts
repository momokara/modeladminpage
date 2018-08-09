import { catchError } from 'rxjs/operators';
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-model-file-video',
  templateUrl: './edit-model-file-video.component.html',
  styleUrls: ['./edit-model-file-video.component.scss']
})
export class EditModelFileVideoComponent implements OnInit {
  uid: string;
  cid: string;
  // 表单验证
  validateForm: FormGroup;
  // 图片上传
  imgUploadUrl = 'https://jsonplaceholder.typicode.com/posts/';

  fileList = [
    // {
    //   uid: 0,
    //   name: '',
    //   status: '',
    //   url: ''
    // }
  ];

  previewImage = '';
  previewVisible = false;
  // 所有的风格
  userStyle = [];
  // 所有的标签
  userTag = [];
  // 上传加载
  loading = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private actrouter: ActivatedRoute,
    @Inject('AjaxServer') private AjaxServer,
    @Inject('MsgSer') private MsgSer,
    private msg: NzMessageService,
  ) {
    // 创建表单
    this.validateForm = this.fb.group({
      c_name: [null, [Validators.required]],
      desc: [null],
      videodata: [null],
      style: [null],
      tags: [null]
    });
    if (this.actrouter.snapshot.paramMap.get('cid')) {
      this.cid = this.actrouter.snapshot.paramMap.get('cid');
      this.validateForm.addControl('cid', new FormControl(this.cid, Validators.required));
    }
    this.uid = this.actrouter.snapshot.paramMap.get('uid');
    this.MsgSer.sendMessage('uid', this.uid);
  }

  ngOnInit() {
    this.imgUploadUrl = this.AjaxServer.getapirul('upLoadImg', 2);
    this.getModelGroup();
    if (this.cid) {
      this.getvideogroupinfo(this.cid);
    }
  }
  // 获取分组
  getModelGroup() {
    const urlParmas = {
      isgetact: true,
      tagtype: 'image'
    };
    this.AjaxServer.ajax('getModelGroup', urlParmas)
      .subscribe(res => {
        if (res.code === 200) {
          this.userStyle = res.data.userStyle;
          this.userTag = res.data.userTag;
        }
      });
  }
  // 获取基本信息
  getvideogroupinfo(id: string) {
    const urlParmas = {
      usertype: '2',
      usertypename: 'model',
      isedit: true,
      cid: this.cid,
      workstyle: 'images'
    };
    this.AjaxServer.ajax('getVideoInfo', urlParmas)
      .subscribe(res => {
        if (res.code === 200 && res.data) {
          console.log(res.data);
          this.fileList = res.data.video;
          this.validateForm.setControl('cid', this.fb.control(res.data.cid));
          this.validateForm.setControl('c_name', this.fb.control(res.data.c_name));
          this.validateForm.setControl('desc', this.fb.control(res.data.desc));
          this.validateForm.setControl('style', this.fb.control(res.data.style));
          this.validateForm.setControl('tags', this.fb.control(res.data.tags));
        }
      });
  }

  // 提交表单
  submitForm(): void {
    console.log(this.fileList);
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    const urlparmas = {
      usertype: '2',
      usertypename: 'model',
      isedit: this.cid ? true : false,
      workstyle: 'video',
      uid: this.uid,
      cid: this.cid ? this.cid : null,
    };
    this.validateForm.setControl('videodata', this.fb.control(this.fileList));
    console.log(this.validateForm.value, this.validateForm.valid);
    if (this.validateForm.valid) {
      this.AjaxServer.ajax('edigVideoInfo', urlparmas, this.validateForm.value)
        .subscribe(res => {
          if (res.code === 200) {
            this.msg.info('保存成功');
            this.router.navigate(['/home/modelfile/' + this.uid]);
          } else {
            this.msg.info(res.msg);
          }
        });
    }
  }
  // 上传之前的处理
  beforeUpload = (file: File) => {
    console.log(file.type);
    // let isJPG = false;
    // if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg') {
    //   isJPG = true;
    // }
    // if (!isJPG) {
    //   this.msg.error('只能上传jpeg/png/jpg格式的图片!');
    // }
    const isLt50M = file.size / 1024 / 1024 < 50;
    if (!isLt50M) {
      this.msg.error('图片大小不能大于 50MB!');
    }
    // return isJPG && isLt2M;
    return isLt50M;
  }
  // 上传文件改变时的状态
  handleChange(info: { file: UploadFile }): void {
    console.log(info);
    if (info.file.status === 'uploading') {
      this.loading = true;
      return;
    }
    if (info.file.status === 'done') {
      console.log(info.file.response);
      if (info.file.response.code === 200) {
        console.log(info.file.response);
        console.log('fileList', this.fileList);
        this.fileList[this.fileList.length - 1] = {
          uid: this.fileList.length,
          name: info.file.response.data.name,
          status: 'done',
          url: info.file.response.data.url
        };
      }
    }
    if (info.file.status === 'error') {
      this.msg.error(`上传错误: code:${info.file.error.message}`);
      const index = this.fileList.length - 1;
      this.fileList.splice(index, 1);
    }
  }
  // 控制预览
  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  }
}
