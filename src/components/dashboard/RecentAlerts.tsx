
import { useState } from 'react';
import { 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  Clock, 
  ChevronDown, 
  ChevronUp,
  MapPin,
  Calendar
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type AlertLevel = 'critical' | 'warning' | 'info' | 'resolved';

interface Alert {
  id: string;
  title: string;
  description: string;
  level: AlertLevel;
  location: string;
  timestamp: string;
  isNew?: boolean;
}

const alerts: Alert[] = [
  {
    id: '1',
    title: 'Flood Warning',
    description: 'Flash flooding reported in downtown area. Evacuation recommended.',
    level: 'critical',
    location: 'Downtown, West Area',
    timestamp: '3 mins ago',
    isNew: true,
  },
  {
    id: '2',
    title: 'Weather Alert',
    description: 'Severe thunderstorm approaching. Expected arrival in 30 minutes.',
    level: 'warning',
    location: 'North County',
    timestamp: '15 mins ago',
  },
  {
    id: '3',
    title: 'Power Outage',
    description: 'Scheduled maintenance causing power disruption in selected areas.',
    level: 'info',
    location: 'East District',
    timestamp: '1 hour ago',
  },
  {
    id: '4',
    title: 'Road Closure',
    description: 'Highway 101 reopened after accident cleanup completed.',
    level: 'resolved',
    location: 'South Highway',
    timestamp: '2 hours ago',
  },
];

const getAlertIcon = (level: AlertLevel) => {
  switch (level) {
    case 'critical':
      return <AlertTriangle className="w-5 h-5 text-red-500" />;
    case 'warning':
      return <AlertTriangle className="w-5 h-5 text-amber-500" />;
    case 'info':
      return <Info className="w-5 h-5 text-blue-500" />;
    case 'resolved':
      return <CheckCircle className="w-5 h-5 text-green-500" />;
  }
};

const getLevelBadge = (level: AlertLevel) => {
  switch (level) {
    case 'critical':
      return (
        <Badge variant="destructive" className="bg-red-500 text-white">
          Critical
        </Badge>
      );
    case 'warning':
      return (
        <Badge className="bg-amber-500 text-white">
          Warning
        </Badge>
      );
    case 'info':
      return (
        <Badge variant="outline" className="text-blue-500 border-blue-500">
          Info
        </Badge>
      );
    case 'resolved':
      return (
        <Badge variant="outline" className="text-green-500 border-green-500">
          Resolved
        </Badge>
      );
  }
};

export function RecentAlerts() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpanded = (id: string) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Recent Alerts</CardTitle>
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
            View All
          </Button>
        </div>
        <CardDescription>Latest emergency notifications and updates</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {alerts.map((alert) => (
            <div 
              key={alert.id} 
              className={cn(
                "transition-all duration-300",
                alert.isNew && "bg-primary-light/20 dark:bg-primary-light/5"
              )}
            >
              <div className="px-6 py-4 cursor-pointer" onClick={() => toggleExpanded(alert.id)}>
                <div className="flex items-start gap-4">
                  <div className="mt-0.5">{getAlertIcon(alert.level)}</div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm">{alert.title}</p>
                      {getLevelBadge(alert.level)}
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
                    {expanded[alert.id] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </Button>
                </div>
              </div>
              
              {expanded[alert.id] && (
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
          ))}
        </div>
      </CardContent>
      <CardFooter className="px-6 py-3 bg-muted/50 flex justify-center border-t">
        <Button variant="ghost" size="sm" className="text-xs">Load more</Button>
      </CardFooter>
    </Card>
  );
}

export default RecentAlerts;
