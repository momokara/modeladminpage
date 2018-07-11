import { FindpswComponent } from './findpsw/findpsw.component';
import { RegpageComponent } from './regpage/regpage.component';
import { MemberbaseComponent } from './memberbase/memberbase.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginpageComponent } from './loginpage/loginpage.component';

const routes: Routes = [
  {
    path: '', component: MemberbaseComponent, children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginpageComponent },
      { path: 'reg', component: RegpageComponent },
      { path: 'findpwd', component: FindpswComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
