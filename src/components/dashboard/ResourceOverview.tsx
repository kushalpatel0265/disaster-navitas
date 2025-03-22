
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from '@/lib/utils';

interface ResourceItem {
  name: string;
  current: number;
  total: number;
  unit: string;
  critical: number;
}

const resources: ResourceItem[] = [
  {
    name: 'Drinking Water',
    current: 5600,
    total: 8000,
    unit: 'liters',
    critical: 2000,
  },
  {
    name: 'Medical Supplies',
    current: 320,
    total: 500,
    unit: 'kits',
    critical: 100,
  },
  {
    name: 'Food Rations',
    current: 1200,
    total: 3000,
    unit: 'meals',
    critical: 500,
  },
  {
    name: 'Emergency Shelters',
    current: 45,
    total: 50,
    unit: 'units',
    critical: 10,
  },
  {
    name: 'Blankets',
    current: 180,
    total: 1000,
    unit: 'pieces',
    critical: 200,
  },
];

export function ResourceOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Resource Inventory</CardTitle>
        <CardDescription>Current status of critical supplies</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {resources.map((resource) => {
            const percentage = Math.round((resource.current / resource.total) * 100);
            const isCritical = resource.current <= resource.critical;
            const isLow = resource.current <= resource.total * 0.3 && !isCritical;
            
            return (
              <div key={resource.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="font-medium text-sm">{resource.name}</span>
                    {isCritical && (
                      <span className="ml-2 px-1.5 py-0.5 text-[10px] font-medium rounded-sm bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                        CRITICAL
                      </span>
                    )}
                    {isLow && (
                      <span className="ml-2 px-1.5 py-0.5 text-[10px] font-medium rounded-sm bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                        LOW
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {resource.current.toLocaleString()} / {resource.total.toLocaleString()} {resource.unit}
                  </span>
                </div>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="relative">
                        <Progress 
                          value={percentage} 
                          className={cn(
                            "h-2",
                            isCritical && "text-red-500",
                            isLow && "text-amber-500",
                            !isCritical && !isLow && "text-primary"
                          )}
                        />
                        {resource.critical > 0 && (
                          <div 
                            className="absolute top-1/2 w-px h-3 bg-red-500 transform -translate-y-1/2 pointer-events-none"
                            style={{ left: `${(resource.critical / resource.total) * 100}%` }}
                          />
                        )}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="p-2 text-xs">
                      {percentage}% - Critical level: {Math.round((resource.critical / resource.total) * 100)}%
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export default ResourceOverview;
