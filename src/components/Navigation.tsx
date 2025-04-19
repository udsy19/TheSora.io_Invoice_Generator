import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth0 } from '@auth0/auth0-react';
import { LogOut, FilePlus, FileText, Mail, Menu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    <div className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-8">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/images/White_Typography_Logo.png" 
              alt="The Sora" 
              className="h-10 w-auto" 
              onError={(e) => {
                // Fallback to the old logo if this fails
                const target = e.target as HTMLImageElement;
                target.onerror = null; // Prevent infinite loop
                target.src = "/images/Logo.png";
              }}
            />
          </Link>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Button
              variant={isActive('/') ? "default" : "ghost"}
              size="sm"
              className={`${isActive('/') ? 'bg-pink-100 text-pink-800 hover:bg-pink-200 hover:text-pink-900' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} rounded-md px-3`}
              asChild
            >
              <Link to="/" className="flex items-center gap-1.5">
                <FilePlus className="h-4 w-4" />
                <span>Invoice</span>
              </Link>
            </Button>
            <Button
              variant={isActive('/contract') ? "default" : "ghost"}
              size="sm"
              className={`${isActive('/contract') ? 'bg-pink-100 text-pink-800 hover:bg-pink-200 hover:text-pink-900' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} rounded-md px-3`}
              asChild
            >
              <Link to="/contract" className="flex items-center gap-1.5">
                <FileText className="h-4 w-4" />
                <span>Contract</span>
              </Link>
            </Button>
            <Button
              variant={isActive('/reminder') ? "default" : "ghost"}
              size="sm"
              className={`${isActive('/reminder') ? 'bg-pink-100 text-pink-800 hover:bg-pink-200 hover:text-pink-900' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} rounded-md px-3`}
              asChild
            >
              <Link to="/reminder" className="flex items-center gap-1.5">
                <Mail className="h-4 w-4" />
                <span>Reminder</span>
              </Link>
            </Button>
          </nav>
        </div>
        
        {/* Desktop logout button */}
        <div className="hidden md:flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleLogout}
            className="border-pink-200 text-pink-800 hover:bg-pink-50 flex items-center gap-1.5"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
        
        {/* Mobile menu */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/" className="flex items-center gap-2 w-full">
                  <FilePlus className="h-4 w-4" />
                  <span>Invoice</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/contract" className="flex items-center gap-2 w-full">
                  <FileText className="h-4 w-4" />
                  <span>Contract</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/reminder" className="flex items-center gap-2 w-full">
                  <Mail className="h-4 w-4" />
                  <span>Reminder</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                <LogOut className="h-4 w-4 mr-2" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navigation;