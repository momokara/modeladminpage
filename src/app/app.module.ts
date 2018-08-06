import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { MsgService } from './common/msg.service';
import { AjaxService } from './common/ajax.service';
import { IsloginService } from './common/islogin.service';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { IndexxedDBService } from './common/indexxed-db.service';
import { SearchlistService } from './common/searchlist.service';
import { CanLoadService } from './common/can-load.service';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    NgZorroAntdModule,
    HttpClientModule,
  ],
  providers: [
    { provide: 'AjaxServer', useClass: AjaxService },
    { provide: 'MsgSer', useClass: MsgService },
    { provide: 'IndexxedDB', useClass: IndexxedDBService },
    { provide: 'filterArray', useClass: SearchlistService },
    IsloginService,
    CanLoadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
