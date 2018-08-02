import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndexxedDBService {
  // 本地库默认名称
  private dbname = 'Xwmodel';
  // 数据库版本
  private version = 1;
  private db: any = null;
  constructor() { }

  // 打开并创建数据库
  public open(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      // 打开indexedDB
      const req = indexedDB.open(this.dbname, this.version);
      // 打开DB成功后的回调
      req.onsuccess = function (event) {
        this.db = event.target.result;
        resolve();
      }.bind(this);
      // 此处说明.bind(this)，是为了把当前类的属性和方法传入req.onsuccess的这个function里。即：.bind(this)的this是指本类WorkIndexedDBService
      // 打开DB失败后的回调
      req.onerror = reject;
      // 打开新的数据库时，会回调此函数，改变name和version均会建立新的DB，所以都会发生此回调。
      req.onupgradeneeded = function (event) {
        // 如果版本升级要记得删除旧的数据库表再建立新的。
        this.db = event.target.result;
        const storeNames = this.db.objectStoreNames;
        if (storeNames && storeNames.length > 0) {
          for (let i = 0; i < storeNames.length; i++) {
            this.db.deleteObjectStore(storeNames[i]);
            console.log('deleteObjectStore', storeNames[i]);
          }
        }
        // 创建数据库表
        this.createDB();
      }.bind(this);
    });
  }

  // 关闭数据库
  public close(): void {
    this.db.close();
  }
  // 删除数据库
  public deleteDB(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      // 先关闭连接再删
      this.close();
      const req = indexedDB.deleteDatabase(this.dbname);
      req.onsuccess = function (event) {
        this.db = null;
        resolve();
      }.bind(this);
      req.onerror = reject;
    });
  }


  /**
   * 添加数据 注意：使用事务来做操作比较快。
   * @param storeName 表名称
   * @param data 写入的数据
   */
  public insert(
    storeName: string,
    data: any
  ): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const transaction = this.db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const req = store.add(data);
      req.onsuccess = (event) => {
        resolve(req.result);
      };
      req.onerror = reject;
    });
  }

  /**
   * 批量添加数据
   * @param storeName 表名称
   * @param data 写入的数据
   */
  public batchInsert(
    storeName: string,
    data: any[]
  ): Promise<any> {
    if (!data || data.length === 0) {
      return Promise.resolve();
    }
    const transaction = this.db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    return new Promise<null>((resolve, reject) => {
      data.forEach(row => { store.add(row); }
      );
      transaction.oncomplete = resolve;
      transaction.onerror = reject;
    })
      .catch((error) => {
        console.error('添加' + storeName + '表数据失败', error);
        return Promise.reject(error);
      });
  }
  // 清楚全部数据
  public clearAllData(): Promise<any> {
    const storeNameList: Array<string> = new Array<string>();
    const storeNames = this.db.objectStoreNames;
    if (storeNames && storeNames.length > 0) {
      for (let i = 0; i < storeNames.length; i++) {
        storeNameList.push(storeNames[i]);
      }
    }
    return Promise.all(
      storeNameList.map((storeName) => {
        return this.clear(storeName);
      })
    );
  }

  /**
   * 清空数据
   * @param storeName 表名称
   */
  public clear(
    storeName: string
  ): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const transaction = this.db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const req = store.clear();
      req.onsuccess = resolve;
      req.onerror = reject;
    });
  }

  /**
   * 删除数据
   * @param storeName 表名称
   * @param keyValue 主键的值
   */
  public delete(
    storeName: string,
    keyValue: any
  ): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const transaction = this.db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const req = store.delete(keyValue);
      req.onsuccess = (event) => {
        console.log(`delete ${storeName}-${keyValue} Ok!`);
        resolve(req.result);
      };
      req.onerror = reject;
    });
  }

  /**
   * 更新数据
   * @param storeName 表名称
   * @param keyValue 主键的值
   */
  public update(
    storeName: string,
    data: any
  ): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const transaction = this.db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const req = store.put(data);
      req.onsuccess = resolve;
      req.onerror = reject;
    });
  }

  // 根据Key取得数据
  public selectByKey(
    storeName: string,
    keyValue: any
  ): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const transaction = this.db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const req = store.get(keyValue);
      req.onsuccess = function () {
        resolve(req.result);
      };
      req.onerror = reject;
    });
  }

  /**
   * 根据索引取得数据
   * @param storeName 表名称
   * @param indexName 索要名称
   * @param indexValue 限制条件
   * 只取得当前索引的值为 val 的数据
   * IDBKeyRange.only("val");
   * 只取得当前索引的值大于 val , 并且不包括val的数据
   * IDBKeyRange.lowerBound("val", true);
   * 只取得当前索引的值小于 val , 并且包括 val 的数据
   * IDBKeyRange.upperBound("val", false);
   * 取得当前索引的值介于 val1 和 val2 之间，并且包括 val1 ,但不包括 val2 的数据
   * IDBKeyRange.bound("val1", "val2", false, true);
  */
  public selectByIndex(
    storeName: string,
    indexName: string,
    indexValue: any
  ): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      const transaction = this.db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const index = store.index(indexName);
      const req = index.openCursor(indexValue);
      const result: any[] = new Array<any>();
      req.onsuccess = function (event) {
        const cursor = event.target.result;
        if (cursor) {
          result.push(cursor.value);
          cursor.continue();
        } else {
          resolve(result);
        }
      };
      req.onerror = reject;
    });
  }


  // 数据库初始化处理
  private createDB(): void {
    this.createConfigInfo();
    this.createStoreUserInfo();
    this.createStoreViewHistory();
    this.createErrorLog();
  }
  // 创建系统配置表及索引
  private createConfigInfo(): void {
    const store = this.db.createObjectStore(
      'ConfigInfo',
      { keyPath: 'key' }
    );
  }

  // 创建用户表及索引
  private createStoreUserInfo(): void {
    const store = this.db.createObjectStore(
      'UserInfo',
      { keyPath: 'userId' }
    );
  }
  // 创建浏览记录表
  private createStoreViewHistory(): void {
    const store = this.db.createObjectStore(
      'ViewHistory',
      { keyPath: 'logID' }
    );
    store.createIndex('uid', 'uid', { unique: false });
    store.createIndex('router', 'router', { unique: false });
  }
  // 创建错误记录表
  private createErrorLog(): void {
    const store = this.db.createObjectStore(
      'ErrorLog',
      { keyPath: 'errID', autoIncrement: true }
    );
    store.createIndex('msg', 'msg', { unique: false });
    store.createIndex('router', 'router', { unique: false });
  }

  // 清除30天前的数据
  cleanHisDB() {
    this.open().then(() => {
      // 通过IDBDatabase得到IDBTransaction
      const transaction = this.db.transaction('ViewHistory', 'readonly');
      // 通过IDBTransaction得到IDBObjectStore
      const objectStore = transaction.objectStore('ViewHistory');
      // 打开游标，遍历customers中所有数据
      objectStore.openCursor().onsuccess = function (event) {
        const cursor = event.target.result;
        if (cursor) {
          const key = cursor.key;
          const rowData = cursor.value;
          console.log(key);
          const time1 = new Date(rowData.lastViewTime);
          const time2 = new Date();
          // 清除三十天前的数据
          if (Math.abs(time2.getTime() - time1.getTime()) > 30) {
            this.workdelete('ViewHistory', cursor.key);
          }
          cursor.continue();
        }
      }.bind(this);
    });
  }


  // 批量合并数据复制的 没研究
  public batchMerge(
    storeName: string,
    data: any[],
    delFlagColName?: string,
    delFlagColName2?: string
  ): Promise<any> {
    if (!data || data.length === 0) {
      return Promise.resolve();
    }
    const transaction = this.db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    return new Promise<null>((resolve, reject) => {
      data.forEach(row => {
        if (store) {
          const keyPath = store.keyPath;
          let keyValue;
          if (typeof keyPath === 'string') {
            keyValue = row[keyPath];
          } else {
            keyValue = new Array();
            keyPath.forEach(key => {
              keyValue.push(row[key]);
            });
          }
          store.delete(keyValue);
        } else {
          store.put(row);
        }
      });

      transaction.oncomplete = resolve;
      transaction.onerror = reject;
    })
      .catch((error) => {
        console.error('更新' + storeName + '表数据失败', error);
        return Promise.reject(error);
      });
  }
}
