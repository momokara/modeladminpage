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
    // console.log(route, state);
    return true;

  }

}
