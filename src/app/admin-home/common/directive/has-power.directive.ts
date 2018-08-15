import { Directive, ElementRef, Input, OnInit, Inject } from '@angular/core';

@Directive({
  selector: '[appHasPower]'
})
export class HasPowerDirective implements OnInit {
  prIdlis = new PrID;
  el: ElementRef;
  @Input()
  prName: string;
  @Input()
  routerLink: string;
  constructor(
    el: ElementRef,
    @Inject('AjaxServer') private AjaxServer,
  ) {
    this.el = el;
  }
  ngOnInit() {
    this.getPrList();
  }
  getPrList() {
    const prid = this.prIdlis.getidbyname(this.routerLink.split('/')[1]);
    if (sessionStorage.getItem('prlist')) {
      this.haspr(prid);
    } else {
      this.AjaxServer.ajax('hasPerm')
        .subscribe(res => {
          if (res.code === 200) {
            sessionStorage.setItem('prlist', res.data.prList);
            this.haspr(prid);
          }
        });
    }
  }
  haspr(prid) {
    const prlist = sessionStorage.getItem('prlist').split(',');
    if (prlist) {
      const prindex = prlist.indexOf(prid);
      if (prindex < 0) {
        // this.el.nativeElement.style.display = 'none';
        this.el.nativeElement.remove(0)
      }
    } else {
      this.el.nativeElement.style.display = 'none';
    }
  }
}
class PrID {
  private readonly default: string = '1';
  private readonly userlist: string = '2';
  private readonly userpermgroup: string = '3';
  private readonly modellist: string = '4';
  private readonly modelgroup: string = '5';
  constructor() {
  }
  public getidbyname(name: string) {
    return this[name] ? this[name] : 'error';
  }
}
