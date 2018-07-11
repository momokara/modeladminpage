// 登录验证
import { Injectable, Inject } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { map } from 'rxjs/operators';
@Injectable()
export class IsloginService implements CanActivate {

  constructor(
    @Inject('AjaxServer') private AjaxServer,
    private router: Router
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (sessionStorage.getItem('user-id') && sessionStorage.getItem('user-token')) {
      return true;
    } else if (sessionStorage.getItem('logininfo')) {
      // 异步验证
      return this.AjaxServer.ajax('isLogin')
        .pipe(
          map((res: any, e) => {
            if (res.code === 200) {
              sessionStorage.setItem('user-id', res.data.uid);
              sessionStorage.setItem('user-token', res.data.token);
              return true;
            } else {
              this.router.navigate(['/login']);
              return false;
            }
          })
        );
    } else {
      this.router.navigate(['/login']);
      return false;
    }

  }

}
