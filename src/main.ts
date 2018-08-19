import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
// 引入 hmr 启动项
import { hmrBootstrap } from './hmr';

if (environment.production) {
  enableProdMode();
}
// 基本启动项
const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule);
// 如果环境变量中有 hmr
if (environment.hmr) {
  if (module['hot']) {
    hmrBootstrap(module, bootstrap);
  } else {
    console.error('HMR is not enabled for webpack-dev-server!');
    console.log('Are you using the --hmr flag for ng serve?');
  }
} else {
  // 不使用HMR 时候的启动
  bootstrap().catch(err => console.log(err));
}
