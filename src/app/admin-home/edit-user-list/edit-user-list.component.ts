import { Component, OnInit, Inject } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-edit-user-list',
  templateUrl: './edit-user-list.component.html',
  styleUrls: ['./edit-user-list.component.scss']
})
export class EditUserListComponent implements OnInit {
  // 页码
  pageIndex = 1;
  // 每页大小
  pageSize = 10;
  // 总数
  total = 1;
  // 显示的列表数据
  dataSet = [];
  loading = true;
  // 排序值
  sortValue = null;
  // 排序key
  sortKey = null;

  sort(sort: { key: string, value: string }): void {
    console.log(sort);
    this.sortKey = sort.key;
    this.sortValue = sort.value;
    this.getListData();
  }

  constructor(
    private message: NzMessageService,
    @Inject('AjaxServer') private AjaxServer) {
  }
  /**
   * 搜索信息
   * @param reset 是否重置
   */
  getListData(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    const urlParama = {
      'page': this.pageIndex,
      'pagesize': this.pageSize,
      'sortKey': this.sortKey,
      'sortValue': this.sortValue
    };
    this.AjaxServer.ajax('userList', urlParama)
      .subscribe(res => {
        if (res.code === 200) {
          this.loading = false;
          this.total = res.total;
          this.dataSet = res.data;
        } else {
          alert(res.msg);
        }
      });
  }
  /**
   * 停用用户
   * @param id 用户id
   * @param i  在数组中的序号
   * @param isforbid 是否停用
   */
  forbiddenuser(id: string, i, isforbid: boolean) {
    const postdata = {
      uid: id
    };
    const APIurl = isforbid ? 'forbiddenUser' : 'openUser';
    this.AjaxServer.ajax(APIurl, null, postdata)
      .subscribe(res => {
        if (res.code = 200) {
          this.dataSet[i].station = !this.dataSet[i].station;
          this.message.info('操作成功');
        }
      });
  }
  //  页面变更方法
  pageChange() {
    console.log('pageChange');
  }
  // 单页条数变更方法
  PageSizeChange() {
    console.log('PageSizeChange');
  }

  ngOnInit(): void {
    this.getListData();
  }

}
