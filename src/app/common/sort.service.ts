import { Injectable } from '@angular/core';
// 排序方法
@Injectable({
  providedIn: 'root'
})
export class SortService {

  constructor() { }

  /**
  * 排序数组
  * @param sortName 需要排序的字段
  * @param sortType 排序方式
  * @param array 需要排序的数组
  * @param isnumberbefore 是否数字在前
  */
  sortlist(array: object[], sortName: string, sortType: string, isnumberbefore: boolean = true) {
    const res = [];
    // 数字数组
    let arrNum = [];
    // 字母数组
    let arrString = [];
    // 正则-非负浮点数
    const regPos = /^\d+(\.\d+)?$/;
    // 正则-负浮点数
    const regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;
    array.forEach(element => {
      if (element) {
        if (regPos.test(element[sortName]) || regNeg.test(element[sortName])) {
          arrNum.push(element);
        } else {
          arrString.push(element);
        }
      }
    });
    arrNum = this.sort(arrNum, sortName, sortType);
    arrString = this.sort(arrString, sortName, sortType, false);
    if (isnumberbefore) {
      res.push(...arrNum);
      res.push(...arrString);
    } else {
      res.push(...arrString);
      res.push(...arrNum);
    }
    return res;
  }

  /**
  * 排序方法
  * @param array    需要排序的数组
  * @param sortName 需要排序的字段
  * @param sortType 排序方式 ascend?
  * @param sotrnumber 是否排序数字
  */
  private sort(array: object[], sortName: string, sortType: string, sotrnumber = true) {
    let res;
    if (sortName) {
      res = array.sort((a, b) => {
        if (sotrnumber) {
          return (sortType === 'ascend') ? (a[sortName] - b[sortName]) : (b[sortName] - a[sortName]);
        } else {
          return (sortType === 'ascend') ? (a[sortName] > b[sortName] ? 1 : -1) : (b[sortName] > a[sortName] ? 1 : -1);
        }
      });
    } else {
      res = array;
    }
    return res;
  }
}
