import { Injectable } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Observable } from 'rxjs';
import { CanLoad } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CanLoadService implements CanLoad {

  constructor() { }
  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
