
import { useState } from 'react';
import { MapPin, Clock, ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Alert } from './types';
import { AlertIcon } from './AlertIcon';
import { AlertBadge } from './AlertBadge';

interface AlertItemProps {
  alert: Alert;
}

export function AlertItem({ alert }: AlertItemProps) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div 
      className={cn(
        "transition-all duration-300",
        alert.isNew && "bg-primary-light/20 dark:bg-primary-light/5"
      )}
    >
      <div className="px-6 py-4 cursor-pointer" onClick={toggleExpanded}>
        <div className="flex items-start gap-4">
          <div className="mt-0.5"><AlertIcon level={alert.level} /></div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="font-medium text-sm">{alert.title}</p>
              <AlertBadge level={alert.level} />
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {alert.description}
            </p>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center">
                <MapPin className="w-3.5 h-3.5 mr-1" />
                {alert.location}
              </div>
              <div className="flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1" />
                {alert.timestamp}
              </div>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="ml-2 h-8 w-8 text-muted-foreground"
          >
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
        </div>
      </div>
      
      {expanded && (
        <div className="px-6 pb-4 pl-16 animate-fade-in">
          <div className="p-3 bg-muted rounded-lg text-sm">
            <div className="flex items-center justify-between mb-2">
              <h5 className="font-medium">Alert Details</h5>
              <Badge variant="outline" className="text-xs">
                ID: {alert.id}
              </Badge>
            </div>
            <p className="mb-2">{alert.description}</p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
              <div className="flex items-center">
                <Calendar className="w-3.5 h-3.5 mr-1" />
                Issued: Yesterday, 3:45 PM
              </div>
              <div className="flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1" />
                Valid until: Today, 9:00 PM
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <Button size="sm" variant="outline" className="text-xs h-8">View on Map</Button>
              <Button size="sm" className="text-xs h-8">Take Action</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
