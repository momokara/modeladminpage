import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Injectable, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class RandomUserService {
  randomUserUrl = 'https://api.randomuser.me/';

  getUsers(pageIndex: number = 1, pageSize: number = 10, sortField: string, sortOrder: string, genders: string[]): Observable<{}> {
    let params = new HttpParams()
      .append('page', `${pageIndex}`)
      .append('results', `${pageSize}`)
      .append('sortField', sortField)
      .append('sortOrder', sortOrder);
    console.log(params);

    genders.forEach(gender => {
      params = params.append('gender', gender);
    });
    return this.http.get(`${this.randomUserUrl}`, {
      params
    });
  }

  constructor(private http: HttpClient) {
  }
}


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  providers: [RandomUserService],
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
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
  filterGender = [
    { text: 'male', value: 'male' },
    { text: 'female', value: 'female' }
  ];
  searchGenderList: string[] = [];

  sort(sort: { key: string, value: string }): void {
    console.log(sort);
    this.sortKey = sort.key;
    this.sortValue = sort.value;
    this.searchData();
  }

  constructor(
    private randomUserService: RandomUserService,
    @Inject('AjaxServer') private AjaxServer) {
  }
  /**
   * 搜索信息
   * @param reset 是否重置
   */
  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;

    // this.randomUserService
    //   .getUsers(this.pageIndex, this.pageSize, this.sortKey, this.sortValue, this.searchGenderList)
    //   .subscribe((data: any) => {
    //     this.loading = false;
    //     this.total = 200;
    //     this.dataSet = data.results;
    //   });
    this.AjaxServer.ajax('test', {
      'page': this.pageIndex,
      'results': this.pageSize,
      'sortKey': this.sortKey,
      'sortValue': this.sortValue
    })
      .subscribe(res => {
        console.log(res);

      });
  }

  updateFilter(value: string[]): void {
    this.searchGenderList = value;
    this.searchData(true);
  }

  ngOnInit(): void {
    this.searchData();
  }

}
