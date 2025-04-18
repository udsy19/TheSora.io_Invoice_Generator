import { Auth0ProviderOptions } from '@auth0/auth0-react';

// Explicitly set redirect URI based on hostname
const getRedirectUri = () => {
  // In browsers, use the current origin
  if (typeof window !== 'undefined') {
    const origin = window.location.origin;
    // If we're on the production domain
    if (origin.includes('invoice.thesora.io')) {
      return 'https://invoice.thesora.io';
    }
    // Otherwise, use the current origin (for localhost or other environments)
    return origin;
  }
  
  // Fallback for SSR - should be replaced with your production URL
  return 'https://invoice.thesora.io';
};

// Auth0 configuration
export const authConfig: Auth0ProviderOptions = {
  domain: "dev-g8taohq4go3564mr.us.auth0.com",
  clientId: "FIXspjFabi5yF9aoOXouRFP2XXqDoxJy",
  authorizationParams: {
    redirect_uri: getRedirectUri(),
    scope: "openid profile email"
  },
  // Auth0 session management
  useRefreshTokens: true,
  cacheLocation: "localstorage",
  // Simpler configuration to avoid issues
  skipRedirectCallback: false
};