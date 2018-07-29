import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-memberbase',
  templateUrl: './memberbase.component.html',
  styleUrls: ['./memberbase.component.scss']
})
export class MemberbaseComponent implements OnInit {

  constructor(
    private titleService: Title,
  ) {
    this.titleService.setTitle(`星网模特卡`);
  }

  ngOnInit() {

  }

}
