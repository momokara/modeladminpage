import { IsloginService } from './common/islogin.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'member', pathMatch: 'full' },
  {
    path: 'member',
    loadChildren: './member/member.module#MemberModule'
  },
  {
    path: 'home',
    canActivate: [IsloginService],
    loadChildren: './admin-home/admin-home.module#AdminHomeModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
