import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeRoutingModule } from './admin-home-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { DefaultpageComponent } from './defaultpage/defaultpage.component';
import { EditPhotographerComponent } from './edit-photographer/edit-photographer.component';
import { EditfieldComponent } from './editfield/editfield.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { EditModelGroupComponent } from './model/edit-model-group/edit-model-group.component';
import { EditUserGroupComponent } from './user/edit-user-group/edit-user-group.component';
import { EditImgListComponent } from './edit-img-list/edit-img-list.component';
import { EditVideoListComponent } from './edit-video-list/edit-video-list.component';

import { EditFileDefaultComponent } from './edit-file-default/edit-file-default.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GetpermnamePipe } from './common/getpermname.pipe';
import { HasPowerDirective } from './common/directive/has-power.directive';
import { EditUserDefaultComponent } from './user/edit-user-default/edit-user-default.component';
import { EditModelDefaultComponent } from './model/edit-model-default/edit-model-default.component';
import { EditUserSingleInfoComponent } from './user/edit-user-single-info/edit-user-single-info.component';
import { EditModelAddmodelComponent } from './model/edit-model-addmodel/edit-model-addmodel.component';
import { EditModelListComponent } from './model/edit-model-list/edit-model-list.component';
import { EditUserListComponent } from './user/edit-user-list/edit-user-list.component';
import { EditUserAdduserComponent } from './user/edit-user-adduser/edit-user-adduser.component';
import { EditUserGroupAddComponent } from './user/edit-user-group-add/edit-user-group-add.component';
import { EditUserGroupEditComponent } from './user/edit-user-group-edit/edit-user-group-edit.component';
import { EditModelEditsinglemodelComponent } from './model/edit-model-editsinglemodel/edit-model-editsinglemodel.component';
import { EditModelGroupAddComponent } from './model/edit-model-group-add/edit-model-group-add.component';
import { EditModelGroupEditComponent } from './model/edit-model-group-edit/edit-model-group-edit.component';
import { EditModelFilehomeComponent } from './model/edit-model-filehome/edit-model-filehome.component';
import { EditModelFileVideoComponent } from './model/edit-model-file-video/edit-model-file-video.component';
import { EditModelFileImggroupComponent } from './model/edit-model-file-imggroup/edit-model-file-imggroup.component';

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
    EditUserGroupEditComponent,
    EditModelAddmodelComponent,
    EditModelEditsinglemodelComponent,
    EditModelGroupAddComponent,
    EditModelGroupEditComponent,
    GetpermnamePipe,
    EditModelFilehomeComponent,
    EditModelFileImggroupComponent,
    EditModelFileVideoComponent,
    HasPowerDirective
  ],
  providers: [
  ]
})
export class AdminHomeModule { }
