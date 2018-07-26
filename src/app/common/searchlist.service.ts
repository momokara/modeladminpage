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
   * @param value 关键词
   * @param key 需要检索的字段 支持3级
   * @param array 需要检索的数组
   */
  searchInArray(value: string, key: string[], array): any {
    // res保存结果
    const res = new ResArray();
    // 原始数组
    res.sourceArray = array;
    const resArray = res.sourceArray.filter((element, index, self) => {
      // 创建正则匹配
      const reg = value ? new RegExp(value) : '';
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
        if (filterbase.toString() === value) {
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

  /**
  * 从数组中查询某条数据
  * @param value 关键词数组
  * @param key 需要检索的字段 支持3级
  * @param array 需要检索的数组
  */
  searchKeywordsInArray(value: string[], key: string[], array): any {
    // res保存结果
    const res = new ResArray();
    // 原始数组
    res.sourceArray = array;
    const resArray = res.sourceArray.filter((element, index, self) => {
      // 创建正则匹配
      const reg = [];
      if (value.length > 0) {
        value.forEach((ele, i, arr) => {
          reg[i] = new RegExp(ele);
        });
      }

      // const reg = value ? new RegExp(value) : '';

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
        if (this.checkhas(reg, filterbase)) {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.checkhas(reg, filterbase, true)) {
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

  private checkhas(searchValue: any[], basevalue: any, isnumber = false) {
    let res = false;
    if (isnumber) {
      searchValue.forEach((ele, i) => {
        if (basevalue.match(ele)) {
          res = true;
        }
      });
    } else {
      searchValue.forEach((ele, i) => {
        if (basevalue.toString() === ele) {
          res = true;
        }
      });
    }
    return res;
  }
}

class ResArray {
  sourceArray: object[];
  result: object[];
}
