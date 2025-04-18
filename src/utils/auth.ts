import { Auth0ProviderOptions } from '@auth0/auth0-react';

// Explicitly set redirect URI based on hostname
const getRedirectUri = () => {
  const origin = window.location.origin;
  // If we're on the production domain
  if (origin.includes('invoice.thesora.io')) {
    return 'https://invoice.thesora.io';
  }
  // Otherwise, use the current origin (for localhost or other environments)
  return origin;
};

// Auth0 configuration
export const authConfig: Auth0ProviderOptions = {
  domain: "dev-g8taohq4go3564mr.us.auth0.com",
  clientId: "FIXspjFabi5yF9aoOXouRFP2XXqDoxJy",
  authorizationParams: {
    redirect_uri: getRedirectUri(),
    audience: "https://api.thesora.io",
    scope: "openid profile email read:current_user update:current_user_metadata"
  },
  // Auth0 session management
  useRefreshTokens: true,
  cacheLocation: "localstorage"
};