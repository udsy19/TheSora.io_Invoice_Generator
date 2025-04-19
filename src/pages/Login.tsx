import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

export default function Login() {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();
  
  // Redirect to main page if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async () => {
    await loginWithRedirect();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f8f9fa]">
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: -1 }}>
        <div className="absolute top-0 left-0 w-full h-72 bg-sora-gradient" />
      </div>
      
      <Card className="w-full max-w-md">
        <CardHeader className="items-center space-y-4">
          <div className="w-16 h-16 mb-2">
            <img 
              src="/images/Logo.png" 
              alt="The Sora Photography" 
              className="w-full h-full object-contain"
            />
          </div>
          <CardTitle className="text-2xl">Sora Invoice Generator</CardTitle>
          <CardDescription>
            Sign in to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-sm text-gray-500">
            Click the button below to sign in with your Sora account
          </p>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleLogin} 
            className="w-full bg-sora-purple hover:bg-opacity-80" 
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Sign In with Auth0"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}