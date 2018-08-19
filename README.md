# XwmodelAdmin

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## File 

base 文件夹放的是测试用的数据,同时是后台输出数据的格式参考, 
在 src/environment/api.class 统一存放接口请求地址,可以根据情况 打包生产环境和开发环境;
需要添加 src/environment/environment.ts 内容复制 environment.prod.ts 
修改： baseurl: { baseherf: 'base/index/index/' }

## About HMR 
###1. 在src/tsconfig.app.json  中添加 "types": ["node"]
```
{
  ...
  "compilerOptions": {
    ...
    "types": ["node"]
  },
  ...
}
```
###2. 修改angular.json 
serve-> configurations 加 "hmr" 服务启动项，
然后 
build-> configurations 下加入 "hmr" 默认就能用了如果需要可以加个独立配置文件
```
"hmr": {
    "fileReplacements": [
        {
            "replace": "src/environments/environment.ts",
            "with": "src/environments/environment.hmr.ts"
        }
    ],
}
```
然后 新建一个src/environments/environment.hmr.ts 去写入配置
```
{
...
  "projects": {
    "xwmodel-admin": {
      ...
      "architect": {
        "build": {
          ...
          "configurations": {
            ...
            "hmr": {}
          }
        },
        "serve": {
            ...
          "configurations": {
            ...
            "hmr": {
              "hmr": true,
              "browserTarget": <项目名称>:build:hmr"
            }
          }
        }
      }
    },
    ...
}
```
###3. 在src下添加 src/hmr.ts 
```
// src/hmr.ts 
import { NgModuleRef, ApplicationRef } from '@angular/core';
import { createNewHosts } from '@angularclass/hmr';

export const hmrBootstrap = (module: any, bootstrap: () => Promise<NgModuleRef<any>>) => {
    let ngModule: NgModuleRef<any>;
    module.hot.accept();
    bootstrap().then(mod => ngModule = mod);
    module.hot.dispose(() => {
        const appRef: ApplicationRef = ngModule.injector.get(ApplicationRef);
        const elements = appRef.components.map(c => c.location.nativeElement);
        const makeVisible = createNewHosts(elements);
        ngModule.destroy();
        makeVisible();
    });
};
```
###4. 修改启动项 
```
// src/main.ts
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
```
###5. 定义一个环境变量控制 hmr启动
```
// src/environments/environment.ts
export const environment = {
  production: false,
  istest: false,
  hmr: true,
  baseurl: { baseherf: 'base/index/index/' }
};
```
###6. 启动 
用以下命令启动项目
`ng serve --configuration hmr`
当然也可以写到 package.json 中方便启动
看到  
`NOTICE: Hot Module Replacement (HMR) is enabled for the dev server. `
就是启动成功了


## 插件 
#MD5 加密
npm install ts-md5 --save