
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Index from "./pages/Index";
import Contract from "./pages/Contract";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { Auth0ProviderWithNavigate } from "@/components/Auth0Provider";

const queryClient = new QueryClient();

interface ProtectedRouteProps {
  element: React.ReactNode;
}

const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth0();
  
  // Show loading state
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  // Check if the user is authenticated
  if (!isAuthenticated) {
    // If not authenticated, redirect to login
    return <Navigate to="/login" replace />;
  }
  
  // If authenticated, render the protected component
  return <>{element}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Auth0ProviderWithNavigate>
          <Routes>
            <Route path="/login" element={<Login />} />
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
