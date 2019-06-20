import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/app.module';
// import { ProfilefacebookModule } from './app/application/profilefacebook/profilefacebook.module';
// import { CybercontactModule } from './app/application/cybercontact/cybercontact.module';
// import { AdvanceSearchModule } from './app/application/advancesearch/advancesearch.module';
// import { AuthenticateModule } from './app/application/authenticate/authenticate.module';
// import { AdminModule } from './app/application/admin/admin.module';

import { hmrBootstrap } from './hmr';

if (environment.production) {
  enableProdMode();
}

const bootstrap = () => {
  return platformBrowserDynamic().bootstrapModule(AppModule);
};

if (environment.hmr) {
  if (module['hot']) {
    hmrBootstrap(module, bootstrap);
  } else {
    console.error('HMR is not enabled for webpack-dev-server!');
    console.log('Are you using the --hmr flag for ng serve?');
  }
} else {
  bootstrap();
}