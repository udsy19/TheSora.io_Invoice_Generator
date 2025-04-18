import { Auth0ProviderOptions } from '@auth0/auth0-react';

// Auth0 configuration
export const authConfig: Auth0ProviderOptions = {
  domain: "dev-g8taohq4go3564mr.us.auth0.com",
  clientId: "FIXspjFabi5yF9aoOXouRFP2XXqDoxJy",
  authorizationParams: {
    redirect_uri: `${window.location.origin}/login`,
    audience: "https://api.thesora.io",
    scope: "openid profile email read:current_user update:current_user_metadata"
  },
  // Adding these properties to avoid callback URL mismatches
  useRefreshTokens: true,
  cacheLocation: "localstorage"
};