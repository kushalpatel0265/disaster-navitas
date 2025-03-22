
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Package, 
  Bell, 
  ActivitySquare, 
  BarChart3, 
  Users, 
  Map, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

type SidebarItem = {
  icon: React.ElementType;
  label: string;
  href: string;
};

const mainItems: SidebarItem[] = [
  { icon: Home, label: 'Dashboard', href: '/dashboard' },
  { icon: Package, label: 'Resources', href: '/resources' },
  { icon: Bell, label: 'Alerts', href: '/alerts' },
  { icon: ActivitySquare, label: 'Response', href: '/response' },
  { icon: BarChart3, label: 'Analytics', href: '/analytics' },
];

const secondaryItems: SidebarItem[] = [
  { icon: Users, label: 'Team', href: '/team' },
  { icon: Map, label: 'Maps', href: '/maps' },
  { icon: User, label: 'Profile', href: '/profile' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  // Auto-collapse on mobile
  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    }
  }, [isMobile]);

  // If we're on mobile, hide the sidebar completely
  if (isMobile) return null;

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 bottom-0 z-30 flex flex-col bg-background border-r border-border transition-all duration-300 ease-in-out pt-20",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex-1 px-3 py-4 flex flex-col space-y-6 overflow-y-auto scrollbar-thin">
        <nav className="flex flex-col space-y-1">
          {mainItems.map((item) => (
            <NavItem
              key={item.href}
              item={item}
              active={location.pathname === item.href}
              collapsed={collapsed}
            />
          ))}
        </nav>
        
        <div className="px-3 py-2">
          <div className={cn(
            "border-t border-border",
            collapsed ? "mx-auto w-4" : ""
          )} />
        </div>
        
        <nav className="flex flex-col space-y-1">
          {secondaryItems.map((item) => (
            <NavItem
              key={item.href}
              item={item}
              active={location.pathname === item.href}
              collapsed={collapsed}
            />
          ))}
        </nav>
      </div>
      
      <div className="p-3 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          className="w-full flex items-center justify-center"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight size={16} />
          ) : (
            <>
              <ChevronLeft size={16} className="mr-2" />
              <span>Collapse</span>
            </>
          )}
        </Button>
      </div>
    </aside>
  );
};

function NavItem({ 
  item, 
  active, 
  collapsed 
}: { 
  item: SidebarItem; 
  active: boolean; 
  collapsed: boolean;
}) {
  const Icon = item.icon;
  
  const linkContent = (
    <div
      className={cn(
        "flex items-center rounded-lg transition-all duration-200",
        active 
          ? "text-primary font-medium bg-primary-light dark:bg-primary-light/10" 
          : "text-muted-foreground hover:text-foreground hover:bg-secondary",
        collapsed ? "justify-center p-2" : "px-3 py-2"
      )}
    >
      <Icon size={18} className={collapsed ? "" : "mr-3"} />
      {!collapsed && <span>{item.label}</span>}
      {active && !collapsed && (
        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
      )}
    </div>
  );

  return collapsed ? (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Link to={item.href} className="block">
            {linkContent}
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right" className="animate-fade-in">
          {item.label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <Link to={item.href} className="block">
      {linkContent}
    </Link>
  );
}

export default Sidebar;
