import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth0 } from '@auth0/auth0-react';
import { LogOut, FilePlus, FileText, Mail } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-8">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/images/Logo.png" alt="The Sora" className="h-10 w-auto" />
            <span className="hidden font-playfair text-xl font-bold md:inline-block">
              The Sora
            </span>
          </Link>
          <nav className="flex items-center gap-2 md:gap-4">
            <Button
              variant={isActive('/') ? "default" : "ghost"}
              size="sm"
              asChild
            >
              <Link to="/" className="flex items-center gap-1">
                <FilePlus className="h-4 w-4" />
                <span>Invoice</span>
              </Link>
            </Button>
            <Button
              variant={isActive('/contract') ? "default" : "ghost"}
              size="sm"
              asChild
            >
              <Link to="/contract" className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                <span>Contract</span>
              </Link>
            </Button>
            <Button
              variant={isActive('/reminder') ? "default" : "ghost"}
              size="sm"
              asChild
            >
              <Link to="/reminder" className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                <span>Reminder</span>
              </Link>
            </Button>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleLogout}
            className="flex items-center gap-1"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navigation;