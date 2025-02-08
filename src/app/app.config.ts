import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import {Router} from '@angular/router';

import { OKTA_AUTH, OKTA_CONFIG, OktaAuthStateService } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';
import myAppConfig from './config/my-app-config';
import { routes } from './app.routes';
import { AuthInterceptorService } from './services/auth-interceptor.service';

// const oktaConfig = myAppConfig.oidc;
const oktaConfig = Object.assign({
  onAuthRequired: (oktaAuth: any, injector:any) => {
    const router = injector.get(Router);
    // Redirect the user to your custom login page
    router.navigate(['/login']);
  }
}, myAppConfig.oidc);

const oktaAuth = new OktaAuth(oktaConfig);


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([]), // Your routes here
    provideHttpClient(),
    provideRouter(routes),
    { provide: OKTA_CONFIG, useValue: {oktaConfig}},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
    { provide: OKTA_AUTH, useValue: oktaAuth },
    // { provide: OktaConfigService, useFactory: configFactory },
    OktaAuthStateService
  ],
}

