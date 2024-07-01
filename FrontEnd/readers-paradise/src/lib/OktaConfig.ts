export const OktaConfig = {
    clientId: '0oai2dqmb4CdQiGJT5d7',
    issuer: 'https://dev-41354912.okta.com/oauth2/default',
    redirectUri: 'http://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true,
}