import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-model-filehome',
  templateUrl: './edit-model-filehome.component.html',
  styleUrls: ['./edit-model-filehome.component.scss']
})
export class EditModelFilehomeComponent implements OnInit {
  uid: string;
  pagedata = {};
  constructor(
    private actrouter: ActivatedRoute,
    @Inject('AjaxServer') private AjaxServer
  ) {
    this.uid = this.actrouter.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getModelFile(this.uid);
  }

  getModelFile(uid: string) {
    const urlParamas = {
      usertype: 2,
      uid: uid,
    };
    this.AjaxServer.ajax('getModelFiles', urlParamas)
      .subscribe(res => {
        if (res.code === 200) {
          this.pagedata = res.data;
        }
      });
  }
}
