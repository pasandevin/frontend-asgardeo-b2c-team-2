import { NgModule } from '@angular/core';
import { OAuthModule, OAuthService } from 'angular-oauth2-oidc';

@NgModule({
  imports: [OAuthModule.forRoot()],
})
export class AppModule {
  constructor(private oauthService: OAuthService) {
    this.oauthService.configure({
      issuer: 'https://api.asgardeo.io/t/dinukath',
      clientId: 'i6I29oV4bSaa5g5Vx043SSAUMJka', // The "Auth Code + PKCE" client
      responseType: 'code',
      redirectUri: 'https://localhost:3000',
      tokenEndpoint: 'https://api.asgardeo.io/t/dinukath/oauth2/token',
      skipIssuerCheck: true,
      logoutUrl: 'https://api.asgardeo.io/t/dinukath/oidc/logout',
      postLogoutRedirectUri: 'http://localhost:3000/',
      scope: 'openid profile', // Ask offline_access to support refresh token refreshes
      useSilentRefresh: false, // Needed for Code Flow to suggest using iframe-based refreshes
      silentRefreshTimeout: 5000, // For faster testing
      timeoutFactor: 0.25, // For faster testing
      sessionChecksEnabled: true,
      showDebugInformation: true, // Also requires enabling "Verbose" level in devtools
      clearHashAfterLogin: false,
      nonceStateSeparator : 'semicolon'
    });
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }
}

