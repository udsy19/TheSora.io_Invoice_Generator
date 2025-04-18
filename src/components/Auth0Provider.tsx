import { Auth0Provider } from '@auth0/auth0-react';
import { ReactNode } from 'react';
import { authConfig } from '@/utils/auth';

// Auth0 provider component
interface Auth0ProviderWithNavigateProps {
  children: ReactNode;
}

export const Auth0ProviderWithNavigate = ({ children }: Auth0ProviderWithNavigateProps) => {
  // Handle the redirect after authentication - avoiding redirect loops
  const onRedirectCallback = (appState: any) => {
    // Check if we've been redirected from Auth0
    const isFromAuth0 = window.location.search.includes('code=') && 
                         window.location.search.includes('state=');
    
    // Only redirect if we came from Auth0, otherwise leave the URL as is
    if (isFromAuth0) {
      // If there's a stored location, navigate to it, otherwise go to the root
      if (appState?.returnTo) {
        window.location.replace(appState.returnTo);
      } else {
        // Use replace instead of href to avoid creating a history entry
        window.location.replace(window.location.origin);
      }
    }
  };

  return (
    <Auth0Provider 
      {...authConfig}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};