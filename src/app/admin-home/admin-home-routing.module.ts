import { EditModelGroupEditComponent } from './edit-model-group-edit/edit-model-group-edit.component';
import { EditModelGroupAddComponent } from './edit-model-group-add/edit-model-group-add.component';
import { EditModelEditsinglemodelComponent } from './edit-model-editsinglemodel/edit-model-editsinglemodel.component';
import { EditModelAddmodelComponent } from './edit-model-addmodel/edit-model-addmodel.component';
import { EditUserGroupAddComponent } from './edit-user-group-add/edit-user-group-add.component';
import { EditUserGroupEditComponent } from './edit-user-group-edit/edit-user-group-edit.component';
import { EditUserAdduserComponent } from './edit-user-adduser/edit-user-adduser.component';
import { EditUserSingleInfoComponent } from './edit-user-single-info/edit-user-single-info.component';
import { EditModelDefaultComponent } from './edit-model-default/edit-model-default.component';
import { EditUserDefaultComponent } from './edit-user-default/edit-user-default.component';
import { EditfieldComponent } from './editfield/editfield.component';
import { EditUserGroupComponent } from './edit-user-group/edit-user-group.component';
import { EditVideoListComponent } from './edit-video-list/edit-video-list.component';
import { EditImgListComponent } from './edit-img-list/edit-img-list.component';
import { EditModelGroupComponent } from './edit-model-group/edit-model-group.component';
import { EditPhotographerComponent } from './edit-photographer/edit-photographer.component';
import { DefaultpageComponent } from './defaultpage/defaultpage.component';
import { AdminHomeComponent } from './admin-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditUserListComponent } from './edit-user-list/edit-user-list.component';
import { EditModelListComponent } from './edit-model-list/edit-model-list.component';

const routes: Routes = [
  {
    path: '', component: AdminHomeComponent, children: [
      { path: '', redirectTo: 'default', pathMatch: 'full' },
      // 默认页面
      { path: 'default', component: DefaultpageComponent },
      // 用户默认页面
      { path: 'userdefault', component: EditUserDefaultComponent },
      // 用户列表
      { path: 'userlist', component: EditUserListComponent },
      // 添加单个用户
      { path: 'adduser', component: EditUserAdduserComponent },
      // 编辑单个用户
      { path: 'edituser/:id', component: EditUserSingleInfoComponent },
      // 用户权限分组
      { path: 'userpermgroup', component: EditUserGroupComponent },
      // 添加权限分组
      { path: 'addpermgroup', component: EditUserGroupAddComponent },
      // 编辑权限分组
      { path: 'editpermgroup/:id', component: EditUserGroupEditComponent },
      // 模特默认页面
      { path: 'modeldefault', component: EditModelDefaultComponent },
      // 模特列表
      { path: 'modellist', component: EditModelListComponent },
      // 添加模特
      { path: 'addmodel', component: EditModelAddmodelComponent },
      // 编辑模特信息
      { path: 'editmodel/:id', component: EditModelEditsinglemodelComponent },
      // 模特分组列表
      { path: 'modelgroup', component: EditModelGroupComponent },
      // 添加模特分组
      { path: 'addmodelgroup', component: EditModelGroupAddComponent },
      // 编辑模特分组
      { path: 'editmodelgroup/:id', component: EditModelGroupEditComponent },
      // 摄影师
      { path: 'photographer', component: EditPhotographerComponent },
      { path: 'uploaddefault', component: EditfieldComponent },
      { path: 'uploadimglist', component: EditImgListComponent },
      { path: 'upvideolist', component: EditVideoListComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminHomeRoutingModule { }
