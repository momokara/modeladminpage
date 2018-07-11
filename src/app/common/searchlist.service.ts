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
  searchInArray(keyword: string, key: string[], array) {
    const res = new ResArray();
    res.sourceArray = array;
    const resArray = res.sourceArray.filter((element, index, self) => {
      const reg = keyword ? new RegExp(keyword) : '';
      const e = element;
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
    res.result = resArray;
    return res;
  }
}

class ResArray {
  sourceArray: object[];
  result: object[];
}
