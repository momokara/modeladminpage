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
  transform(value: any, args?: any): any {
    const res = value + 'filter';
    console.log(value, this.permGroup);

    return this.getPermlist();

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
