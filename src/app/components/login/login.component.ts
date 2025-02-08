import {Component, OnInit} from '@angular/core';
import {OktaAuth} from '@okta/okta-auth-js';
import OktaSignIn from '@okta/okta-signin-widget';
import myAppConfig from '../../config/my-app-config';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone : true
})
export class LoginComponent implements OnInit {

  oktaSignin: any;

  constructor(private oktaAuthService: OktaAuth) {

    this.oktaSignin = new OktaSignIn({
      logo: 'assets/images/logo.png',
      features: {
        registration: true
      },
      baseUrl: myAppConfig.oidc.issuer.split('/oauth2')[0],
      clientId: myAppConfig.oidc.clientId,
      redirectUri: myAppConfig.oidc.redirectUri,
      authParams: {
        pkce: true,
        issuer: myAppConfig.oidc.issuer,
        scopes: myAppConfig.oidc.scopes
      }
    });

  }

  ngOnInit(): void {
    this.oktaSignin.remove();

    this.oktaSignin.renderEl({
      el: '#okta-sign-in-widget'}, // this name should be same as div tag id in login.component.html
      (response : any) => {
        if (response.status === 'SUCCESS') {
          this.oktaAuthService.signInWithRedirect();
        }
      },
      (error : any) => {
        throw error;
      }
    );
  }

}

