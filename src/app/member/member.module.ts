
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberRoutingModule } from './member-routing.module';
import { MemberbaseComponent } from './memberbase/memberbase.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { RegpageComponent } from './regpage/regpage.component';
import { FindpswComponent } from './findpsw/findpsw.component';
import { DefalutpageComponent } from './defalutpage/defalutpage.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MemberRoutingModule,
    NgZorroAntdModule
  ],
  declarations: [
    MemberbaseComponent,
    LoginpageComponent,
    RegpageComponent,
    FindpswComponent,
    DefalutpageComponent
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN }
  ],
})
export class MemberModule { }
