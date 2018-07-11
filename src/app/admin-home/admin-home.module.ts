import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeRoutingModule } from './admin-home-routing.module';
import { AdminHomeComponent } from './admin-home.component';
import { DefaultpageComponent } from './defaultpage/defaultpage.component';
import { EditmodelpageComponent } from './editmodelpage/editmodelpage.component';
import { EditPhotographerComponent } from './edit-photographer/edit-photographer.component';
import { EditfieldComponent } from './editfield/editfield.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { EditModelGroupComponent } from './edit-model-group/edit-model-group.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditUserGroupComponent } from './edit-user-group/edit-user-group.component';
import { EditImgListComponent } from './edit-img-list/edit-img-list.component';
import { EditVideoListComponent } from './edit-video-list/edit-video-list.component';

@NgModule({
  imports: [
    CommonModule,
    AdminHomeRoutingModule,
    NgZorroAntdModule
  ],
  declarations: [
    AdminHomeComponent,
    DefaultpageComponent,
    EditmodelpageComponent,
    EditPhotographerComponent,
    EditfieldComponent,
    EditModelGroupComponent,
    EditUserComponent,
    EditUserGroupComponent,
    EditImgListComponent,
    EditVideoListComponent
  ]
})
export class AdminHomeModule { }
