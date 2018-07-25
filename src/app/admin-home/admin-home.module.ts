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
import { EditUserSingleInfoComponent } from './edit-user-single-info/edit-user-single-info.component';
import { EditModelListComponent } from './edit-model-list/edit-model-list.component';
import { EditUserListComponent } from './edit-user-list/edit-user-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditUserAdduserComponent } from './edit-user-adduser/edit-user-adduser.component';
import { EditUserGroupAddComponent } from './edit-user-group-add/edit-user-group-add.component';
import { EditUserGroupEditComponent } from './edit-user-group-edit/edit-user-group-edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
    EditUserSingleInfoComponent,
    EditModelListComponent,
    EditUserListComponent,
    EditUserAdduserComponent,
    EditUserGroupAddComponent,
    EditUserGroupEditComponent
  ]
})
export class AdminHomeModule { }
