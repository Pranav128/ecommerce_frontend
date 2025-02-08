import { NgIf } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OKTA_AUTH, OktaAuthStateService,OktaAuthModule } from '@okta/okta-angular';
import OktaAuth, { UserClaims } from '@okta/okta-auth-js';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css'],
  standalone : true,
  imports :[NgIf,RouterLink]

})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean = false;
  userFullName!: string;

  storage: Storage = sessionStorage;

  constructor(private oktaAuthService: OktaAuthStateService, @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { }


  ngOnInit(): void {

    // Subscribe to authentication state changes
    this.oktaAuthService.authState$.subscribe(
      (result) => {
        this.isAuthenticated =result.isAuthenticated!;
        this.getUserDetails();
      }
    );
    
  }

  async getUserDetails() {
    if (this.isAuthenticated) {
      try {
        // Fetch the logged in user details (user's claims)
        const userClaims: UserClaims = await this.oktaAuth.getUser();
        this.userFullName = userClaims.name || '';

        // Retrieve the user's email from authentication response
        const theEmail = userClaims.email;

        // Now store the email in browser storage
        if (theEmail) {
          this.storage.setItem('userEmail', JSON.stringify(theEmail));
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    }
  }

  logout() {
    // Terminates the session with Okta and removes current tokens.
    // this.oktaAuth.
  }
}






