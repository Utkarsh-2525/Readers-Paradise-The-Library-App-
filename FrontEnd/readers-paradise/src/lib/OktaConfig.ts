export const OktaConfig = {
    clientId: '0oaih2t0r3GgXEUiQ5d7',
    issuer: 'https://dev-41354912.okta.com/oauth2/default',
    redirectUri: 'https://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true,
}