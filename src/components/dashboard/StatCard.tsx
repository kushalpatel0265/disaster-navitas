
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'tertiary';
}

export function StatCard({ 
  title, 
  value, 
  icon, 
  trend, 
  className,
  variant = 'default' 
}: StatCardProps) {
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300",
        variant === 'primary' && "border-primary/20 bg-gradient-to-br from-primary-light/50 to-background",
        variant === 'secondary' && "border-secondary/20 bg-gradient-to-br from-secondary/50 to-background",
        variant === 'tertiary' && "border-tertiary/20 bg-gradient-to-br from-tertiary/10 to-background",
        className
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
            
            {trend && (
              <div className="flex items-center space-x-1">
                <span
                  className={cn(
                    "text-xs font-medium",
                    trend.isPositive ? "text-green-500" : "text-red-500"
                  )}
                >
                  {trend.isPositive ? '+' : ''}{trend.value}%
                </span>
                <span className="text-xs text-muted-foreground">vs last period</span>
              </div>
            )}
          </div>
          
          <div className={cn(
            "p-2 rounded-full",
            variant === 'primary' && "bg-primary/10 text-primary",
            variant === 'secondary' && "bg-secondary text-secondary-foreground",
            variant === 'tertiary' && "bg-tertiary/10 text-tertiary",
            variant === 'default' && "bg-muted text-muted-foreground"
          )}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default StatCard;
