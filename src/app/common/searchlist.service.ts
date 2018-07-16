import { filter } from 'rxjs/operators';
import { Injectable } from '@angular/core';
// 搜索过滤数组方法
@Injectable({
  providedIn: 'root'
})
export class SearchlistService {

  constructor() { }
  /**
   * 从数组中查询某条数据
   * @param keyword 关键词
   * @param key 需要检索的字段 支持3级
   * @param array 需要检索的数组
   */
  searchInArray(keyword: string, key: string[], array): any {
    // res保存结果
    const res = new ResArray();
    // 原始数组
    res.sourceArray = array;
    const resArray = res.sourceArray.filter((element, index, self) => {
      // 创建正则匹配
      const reg = keyword ? new RegExp(keyword) : '';
      const e = element;
      // 数组中需要对比的内容
      let filterbase;
      switch (key.length) {
        case 1:
          filterbase = e[key[0]];
          break;
        case 2:
          filterbase = e[key[0]][key[1]];
          break;
        case 3:
          filterbase = e[key[0]][key[1]][key[2]];
          break;
        default:
          break;
      }
      //  处理数字的对比 和 string 的比对
      if (typeof (filterbase) === 'number') {
        if (filterbase.toString() === keyword) {
          return true;
        } else {
          return false;
        }
      } else {
        if (filterbase.match(reg)) {
          return true;
        } else {
          return false;
        }
      }

    });
    // 结果写入result
    res.result = resArray;
    return res;
  }

}

class ResArray {
  sourceArray: object[];
  result: object[];
}
