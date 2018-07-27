import { Pipe, PipeTransform, OnInit, Inject } from '@angular/core';

@Pipe({
  name: 'getpermname'
})
export class GetpermnamePipe implements PipeTransform, OnInit {
  permGroup = [];
  constructor(
    @Inject('AjaxServer') private AjaxServer,
    @Inject('filterArray') private filterArray
  ) {
    this.getPermlist();
  }
  ngOnInit(): void {

  }
  transform(value: number, args?: any): any {
    const reslist = this.filterArray.searchInArray(value, ['pid'], this.permGroup);
    const permname = reslist.result[0].group_name;
    return permname;

  }

  private getPermlist(): void {
    const urlParmas2 = {
      isgetact: true
    };
    // 获取权限列表
    this.AjaxServer.ajax('getPermGroup', urlParmas2)
      .subscribe(res => {
        if (res.code === 200) {
          this.permGroup = res.data;
        }
      });

  }

}
