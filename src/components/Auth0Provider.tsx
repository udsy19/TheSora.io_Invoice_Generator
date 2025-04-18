import { Auth0Provider } from '@auth0/auth0-react';
import { ReactNode } from 'react';
import { authConfig } from '@/utils/auth';

// Auth0 provider component
interface Auth0ProviderWithNavigateProps {
  children: ReactNode;
}

export const Auth0ProviderWithNavigate = ({ children }: Auth0ProviderWithNavigateProps) => {
  // Handle the redirect after authentication
  const onRedirectCallback = (appState: any) => {
    // If there's a stored location, navigate to it, otherwise go to the root
    if (appState?.returnTo) {
      window.location.href = appState.returnTo;
    } else {
      window.location.href = window.location.origin;
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