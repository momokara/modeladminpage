import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editmodelpage',
  templateUrl: './editmodelpage.component.html',
  styleUrls: ['./editmodelpage.component.scss']
})
export class EditmodelpageComponent implements OnInit {
  searchNameList = [];
  searchAddressList = [];
  filterNameList = [
    { text: 'Joe', value: 'Joe' },
    { text: 'Jim', value: 'Jim' }
  ];
  filterAddressList = [
    { text: 'London', value: 'London' },
    { text: 'Sidney', value: 'Sidney' }
  ];
  sortMap = {
    name: null,
    age: null,
    address: null
  };
  sortName = null;
  sortValue = null;

  data = [
    {
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    },
    {
      name: 'Jim Red',
      age: 32,
      address: 'London No. 2 Lake Park'
    }
  ];
  displayData = [...this.data];

  sort(sortName: string, value: string): void {
    this.sortName = sortName;
    this.sortValue = value;
    // tslint:disable-next-line:forin
    for (const key in this.sortMap) {
      this.sortMap[key] = (key === sortName ? value : null);
    }
    this.search(this.searchNameList, this.searchAddressList);
  }

  search(searchNameList: string[], searchAddressList: string[]): void {
    this.searchNameList = searchNameList;
    this.searchAddressList = searchAddressList;
    const filterFunc = item => (this.searchAddressList.length ?
      this.searchAddressList.some(address => item.address.indexOf(address) !== -1) : true) && (this.searchNameList.length ?
        this.searchNameList.some(name => item.name.indexOf(name) !== -1) : true);
    const data = this.data.filter(item => filterFunc(item));
    if (this.sortName) {
      this.displayData = data.sort((a, b) => (this.sortValue === 'ascend') ?
        (a[this.sortName] > b[this.sortName] ? 1 : -1) : (b[this.sortName] > a[this.sortName] ? 1 : -1));
    } else {
      this.displayData = data;
    }
  }

  resetFilters(): void {
    this.filterNameList = [
      { text: 'Joe', value: 'Joe' },
      { text: 'Jim', value: 'Jim' }
    ];
    this.filterAddressList = [
      { text: 'London', value: 'London' },
      { text: 'Sidney', value: 'Sidney' }
    ];
    this.searchNameList = [];
    this.searchAddressList = [];
    this.search(this.searchNameList, this.searchAddressList);
  }

  resetSortAndFilters(): void {
    this.sortName = null;
    this.sortValue = null;
    this.sortMap = {
      name: null,
      age: null,
      address: null
    };
    this.resetFilters();
    this.search(this.searchNameList, this.searchAddressList);
  }
  constructor() { }

  ngOnInit() {
  }

}
