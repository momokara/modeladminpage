import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-findpsw',
  templateUrl: './findpsw.component.html',
  styleUrls: ['./findpsw.component.scss']
})
export class FindpswComponent implements OnInit {
  current = 0;

  index = 'First-content';

  constructor() { }

  ngOnInit() {
  }

  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {
    this.current += 1;
    this.changeContent();
  }

  done(): void {
    console.log('done');
  }

  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.index = 'First-content';
        break;
      }
      case 1: {
        this.index = 'Second-content';
        break;
      }
      case 2: {
        this.index = 'third-content';
        break;
      }
      default: {
        this.index = 'error';
      }
    }
  }

}
