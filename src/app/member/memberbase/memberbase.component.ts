import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-memberbase',
  templateUrl: './memberbase.component.html',
  styleUrls: ['./memberbase.component.scss']
})
export class MemberbaseComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    indexedDB.open('testdb1', 1);
    // let db = openDatabase("noteDB", "1.0", "noteDB", 1024 * 1024 * 10, function (result) {
    //   console.log(result);
    //   // 只有创建数据库成功 才会调用这个回调
    //   db = result;
    // });
  }

}
