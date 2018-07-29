import { Component, OnInit, Inject } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { SearchInfo, ListData, SortInfo } from '../common/data/pagedata.class';

@Component({
  selector: 'app-edit-model-list',
  templateUrl: './edit-model-list.component.html',
  styleUrls: ['./edit-model-list.component.scss']
})
export class EditModelListComponent implements OnInit {
  // 页面信息
  pagedata = new ListData(false, 1, 10);
  // 排序信息
  SortInfo = new SortInfo();
  // 搜索 nickname/phone/email
  searchinfo = new SearchInfo('nickname');
  // 页码
  pageIndex = 1;
  // 每页大小
  pageSize = 10;
  // 总数
  total = 1;
  // 加载过度
  loading = true;

  sort(sort: { key: string, value: string }): void {
    console.log(sort);
    this.SortInfo = sort;
    this.getListData();
  }

  constructor(
    private message: NzMessageService,
    @Inject('AjaxServer') private AjaxServer,
    @Inject('filterArray') private filterArray, ) {
  }

  ngOnInit(): void {
    this.getListData();
  }

  /**
   * 获取列表信息
   * @param reset 是否重置
   */
  getListData(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    const urlParmas = {
      usertype: '2'
    };
    const postdata = {
      'page': this.pageIndex,
      'pagesize': this.pageSize,
      'sortKey': this.SortInfo.key,
      'sortValue': this.SortInfo.value,

    };
    this.AjaxServer.ajax('userList', urlParmas, postdata)
      .subscribe(res => {
        if (res.code === 200) {
          this.loading = false;
          this.total = res.total;
          this.pagedata.dataset = res.data;
        } else {
          alert(res.msg);
        }
      });
  }

  // 过滤列表信息
  filterlistdata(searchinfo: SearchInfo, isreset = false): void {
    if (!isreset) {
      const res = this.filterArray.searchInArray(searchinfo.value, [searchinfo.key], this.pagedata.dataset);
      if (res.result.length > 0) {
        this.pagedata.datares = res.result;
        this.message.info('搜索完成');
      } else {
        this.message.info('没有数据');
      }
    } else {
      this.pagedata.datares = [];
      this.searchinfo.value = null;
      this.message.info('搜索重置完成');
    }
  }

  /**
   * 停用用户
   * @param id 用户id
   * @param i  在数组中的序号
   * @param isforbid 是否停用
   */
  forbiddenuser(id: string, i, isforbid: boolean): void {
    const postdata = {
      uid: id
    };
    const APIurl = isforbid ? 'forbiddenUser' : 'openUser';
    const urlparmas = {
      usertype: '2'
    };
    this.AjaxServer.ajax(APIurl, urlparmas, postdata)
      .subscribe(res => {
        if (res.code === 200) {
          this.pagedata.dataset[i].station = this.pagedata.dataset[i].station === 1 ? 0 : 1;
          if (this.pagedata.datares.length > 0) {
            this.pagedata.datares[i].station = this.pagedata.datares[i].station === 1 ? 0 : 1;
          }
          this.message.info('操作成功');
        }
      });
  }
  //  页面变更方法
  pageChange() {
    console.log('pageChange');
  }
  // 单页条数变更方法
  PageSizeChange(isreset: boolean) {
    console.log('PageSizeChange-isrest', isreset);
  }

}
