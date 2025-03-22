
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUser, useClerk } from '@clerk/clerk-react';
import { 
  Menu, 
  X, 
  Bell, 
  UserCircle, 
  ChevronDown,
  LogOut,
  User,
  Settings,
  HelpCircle
} from 'lucide-react';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
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

  const handleSignOut = async () => {
    await signOut();
    navigate('/sign-in');
  };

  const navigationItems = [
    { href: '/dashboard', text: 'Dashboard' },
    { href: '/resources', text: 'Resources' },
    { href: '/alerts', text: 'Alerts' },
    { href: '/response', text: 'Response' },
    { href: '/analytics', text: 'Analytics' },
    { href: '/team', text: 'Team' },
    { href: '/maps', text: 'Maps' },
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
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.imageUrl} alt={user.fullName || ''} />
                    <AvatarFallback>
                      {user.firstName?.[0]}{user.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium hidden lg:inline-block">
                    {user.firstName}
                  </span>
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 animate-scale-in">
                <div className="flex items-center justify-start p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    {user.fullName && (
                      <p className="font-medium">{user.fullName}</p>
                    )}
                    {user.primaryEmailAddress && (
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {user.primaryEmailAddress.emailAddress}
                      </p>
                    )}
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={handleSignOut}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => navigate('/sign-in')}>
              Sign In
            </Button>
          )}
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
            <div className="border-t border-border pt-3 mt-3 flex flex-col space-y-3">
              <Button 
                variant="ghost" 
                className="justify-start"
                onClick={() => {
                  setIsOpen(false);
                  navigate('/profile');
                }}
              >
                <User size={18} className="mr-2" />
                <span>Profile</span>
              </Button>
              <Button 
                variant="ghost" 
                className="justify-start"
                onClick={() => {
                  setIsOpen(false);
                  navigate('/settings');
                }}
              >
                <Settings size={18} className="mr-2" />
                <span>Settings</span>
              </Button>
              {user ? (
                <Button 
                  variant="ghost" 
                  className="justify-start text-destructive hover:text-destructive"
                  onClick={() => {
                    setIsOpen(false);
                    handleSignOut();
                  }}
                >
                  <LogOut size={18} className="mr-2" />
                  <span>Log out</span>
                </Button>
              ) : (
                <Button 
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/sign-in');
                  }}
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
