import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeRoutingModule } from './admin-home-routing.module';
import { AdminHomeComponent } from './admin-home.component';
import { DefaultpageComponent } from './defaultpage/defaultpage.component';
import { EditPhotographerComponent } from './edit-photographer/edit-photographer.component';
import { EditfieldComponent } from './editfield/editfield.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { EditModelGroupComponent } from './edit-model-group/edit-model-group.component';
import { EditUserGroupComponent } from './edit-user-group/edit-user-group.component';
import { EditImgListComponent } from './edit-img-list/edit-img-list.component';
import { EditVideoListComponent } from './edit-video-list/edit-video-list.component';
import { EditUserDefaultComponent } from './edit-user-default/edit-user-default.component';
import { EditModelDefaultComponent } from './edit-model-default/edit-model-default.component';
import { EditFileDefaultComponent } from './edit-file-default/edit-file-default.component';
import { NgxEchartsModule  } from 'ngx-echarts';
import { EditSingleUserInfoComponent } from './edit-single-user-info/edit-single-user-info.component';
import { EditUserSingleInfoComponent } from './edit-user-single-info/edit-user-single-info.component';
import { EditModelListComponent } from './edit-model-list/edit-model-list.component';
import { EditUserListComponent } from './edit-user-list/edit-user-list.component';

@NgModule({
  imports: [
    CommonModule,
    AdminHomeRoutingModule,
    NgZorroAntdModule,
    NgxEchartsModule
  ],
  declarations: [
    AdminHomeComponent,
    DefaultpageComponent,
    EditPhotographerComponent,
    EditfieldComponent,
    EditModelGroupComponent,
    EditUserGroupComponent,
    EditImgListComponent,
    EditVideoListComponent,
    EditUserDefaultComponent,
    EditModelDefaultComponent,
    EditFileDefaultComponent,
    EditSingleUserInfoComponent,
    EditUserSingleInfoComponent,
    EditModelListComponent,
    EditUserListComponent
  ]
})
export class AdminHomeModule { }
