import { EditSingleUserInfoComponent } from './edit-single-user-info/edit-single-user-info.component';
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
      // 编辑单个用户
      { path: 'edituser/:id', component: EditSingleUserInfoComponent },
      // 用户分组
      { path: 'usergroup', component: EditUserGroupComponent },
      // 模特默认页面
      { path: 'modeldefault', component: EditModelDefaultComponent },
      // 模特列表
      { path: 'modellist', component: EditModelListComponent },
      // 模特分组
      { path: 'modelgroup', component: EditModelGroupComponent },
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
