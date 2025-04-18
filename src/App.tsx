
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import Index from "./pages/Index";
import Contract from "./pages/Contract";
import NotFound from "./pages/NotFound";
import { Auth0ProviderWithNavigate } from "@/components/Auth0Provider";

const queryClient = new QueryClient();

interface ProtectedRouteProps {
  element: React.ReactNode;
}

// Loading component
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen bg-[#f8f9fa]">
    <div className="animate-pulse text-2xl font-neue text-gray-700">Loading...</div>
  </div>
);

// Auth component that redirects to Auth0 login if not authenticated
const AuthRequired = () => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
    }
  }, [isAuthenticated, isLoading, loginWithRedirect]);
  
  if (isLoading || !isAuthenticated) {
    return <Loading />;
  }
  
  return null;
};

const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth0();
  
  // Show loading state
  if (isLoading) {
    return <Loading />;
  }
  
  // If authenticated, render the protected component
  if (isAuthenticated) {
    return <>{element}</>;
  }
  
  // Render the AuthRequired component which will redirect to login
  return <AuthRequired />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Auth0ProviderWithNavigate>
          <Routes>
            <Route path="/" element={<ProtectedRoute element={<Index />} />} />
            <Route path="/contract" element={<ProtectedRoute element={<Contract />} />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Auth0ProviderWithNavigate>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
