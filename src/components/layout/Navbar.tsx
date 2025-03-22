
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Bell, UserCircle, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';

const NavItem = ({ href, text, active }: { href: string; text: string; active: boolean }) => (
  <Link
    to={href}
    className={cn(
      "relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
      active 
        ? "text-primary bg-primary-light dark:bg-primary-light/10" 
        : "text-foreground/80 hover:text-foreground hover:bg-secondary"
    )}
  >
    {text}
    {active && (
      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-primary rounded-full animate-pulse-subtle" />
    )}
  </Link>
);

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { href: '/', text: 'Dashboard' },
    { href: '/resources', text: 'Resources' },
    { href: '/alerts', text: 'Alerts' },
    { href: '/response', text: 'Response' },
    { href: '/analytics', text: 'Analytics' },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
        scrolled ? "bg-background/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container px-4 md:px-6 mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-lg font-bold text-foreground"
          >
            <span className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
              <span className="text-sm font-bold">DM</span>
            </span>
            <span className="hidden md:inline-block">DisasterMgmt</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <NavItem 
                key={item.href} 
                href={item.href} 
                text={item.text} 
                active={location.pathname === item.href} 
              />
            ))}
          </nav>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell size={18} />
            <Badge className="absolute -top-1 -right-1 px-1.5 min-w-[18px] h-[18px] text-xs bg-primary">
              3
            </Badge>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <UserCircle size={20} />
                <span className="text-sm font-medium">Admin</span>
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 animate-scale-in">
              <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-destructive">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-background md:hidden animate-fade-in">
          <div className="p-4 flex flex-col space-y-3">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "px-4 py-3 rounded-lg text-sm font-medium",
                  location.pathname === item.href 
                    ? "text-primary bg-primary-light dark:bg-primary-light/10" 
                    : "text-foreground/80 hover:text-foreground"
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.text}
              </Link>
            ))}
            <div className="border-t border-border pt-3 mt-3 flex items-center justify-between">
              <Button variant="ghost" size="sm" className="relative">
                <Bell size={18} />
                <Badge className="absolute -top-1 -right-1 px-1.5 min-w-[18px] h-[18px] text-xs bg-primary">
                  3
                </Badge>
              </Button>
              <Button variant="ghost" size="sm">
                <UserCircle size={18} className="mr-2" />
                <span className="text-sm">Admin</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
