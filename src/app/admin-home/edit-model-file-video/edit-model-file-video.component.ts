import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-model-file-video',
  templateUrl: './edit-model-file-video.component.html',
  styleUrls: ['./edit-model-file-video.component.scss']
})
export class EditModelFileVideoComponent implements OnInit {
  uid: string;
  cid: string;
  constructor(
    private actrouter: ActivatedRoute,
    @Inject('AjaxServer') private AjaxServer,
    @Inject('MsgSer') private MsgSer,
  ) {
    this.uid = this.actrouter.snapshot.paramMap.get('uid');
    this.cid = this.actrouter.snapshot.paramMap.get('cid');
    this.MsgSer.sendMessage('uid', this.uid);
  }

  ngOnInit() {
    console.log(`uid:${this.uid},cid:${this.cid}`);
  }

}
