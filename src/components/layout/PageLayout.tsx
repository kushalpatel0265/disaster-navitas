
import { ReactNode } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  padded?: boolean;
}

export function PageLayout({ children, className, padded = true }: PageLayoutProps) {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Sidebar />
      
      <main 
        className={cn(
          "transition-all duration-300",
          isMobile ? "ml-0" : "ml-16 md:ml-16 lg:ml-64",
          padded ? "pt-24 px-4 md:px-6 pb-10" : "pt-16",
          className
        )}
      >
        {children}
      </main>
    </div>
  );
}

export default PageLayout;
