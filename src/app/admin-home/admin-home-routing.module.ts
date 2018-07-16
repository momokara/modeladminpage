import { EditModelDefaultComponent } from './edit-model-default/edit-model-default.component';
import { EditUserDefaultComponent } from './edit-user-default/edit-user-default.component';
import { EditfieldComponent } from './editfield/editfield.component';
import { EditUserGroupComponent } from './edit-user-group/edit-user-group.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditVideoListComponent } from './edit-video-list/edit-video-list.component';
import { EditImgListComponent } from './edit-img-list/edit-img-list.component';
import { EditModelGroupComponent } from './edit-model-group/edit-model-group.component';
import { EditPhotographerComponent } from './edit-photographer/edit-photographer.component';
import { EditmodelpageComponent } from './editmodelpage/editmodelpage.component';
import { DefaultpageComponent } from './defaultpage/defaultpage.component';
import { AdminHomeComponent } from './admin-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: AdminHomeComponent, children: [
      { path: '', redirectTo: 'default/1234', pathMatch: 'full' },
      { path: 'default/:id', component: DefaultpageComponent },
      { path: 'userdefault', component: EditUserDefaultComponent },
      { path: 'userlist', component: EditUserComponent },
      { path: 'usergroup', component: EditUserGroupComponent },
      { path: 'modeldefault', component: EditModelDefaultComponent },
      { path: 'modellist', component: EditmodelpageComponent },
      { path: 'modelgroup', component: EditModelGroupComponent },
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
