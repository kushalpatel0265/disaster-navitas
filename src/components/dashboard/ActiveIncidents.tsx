
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  MoreVertical, 
  Filter, 
  MapPin, 
  Clock, 
  Users, 
  AlertCircle 
} from 'lucide-react';
import { cn } from '@/lib/utils';

type IncidentPriority = 'high' | 'medium' | 'low';
type IncidentStatus = 'active' | 'responding' | 'contained';

interface Incident {
  id: string;
  title: string;
  location: string;
  priority: IncidentPriority;
  status: IncidentStatus;
  responders: number;
  reportedAt: string;
  affectedArea: string;
}

const incidents: Incident[] = [
  {
    id: 'INC-001',
    title: 'Downtown Flooding',
    location: 'Central District, Main St',
    priority: 'high',
    status: 'active',
    responders: 12,
    reportedAt: '35 minutes ago',
    affectedArea: '2.5 sq km',
  },
  {
    id: 'INC-002',
    title: 'Highway Landslide',
    location: 'North County, Route 35',
    priority: 'high',
    status: 'responding',
    responders: 8,
    reportedAt: '1 hour ago',
    affectedArea: '300 meters',
  },
  {
    id: 'INC-003',
    title: 'Lakeside Power Outage',
    location: 'East End, Lake View Area',
    priority: 'medium',
    status: 'contained',
    responders: 5,
    reportedAt: '2 hours ago',
    affectedArea: '4 blocks',
  },
  {
    id: 'INC-004',
    title: 'Chemical Spill',
    location: 'Industrial Zone, Sector B',
    priority: 'medium',
    status: 'responding',
    responders: 7,
    reportedAt: '3 hours ago',
    affectedArea: '500 meters',
  },
];

const getPriorityBadge = (priority: IncidentPriority) => {
  switch (priority) {
    case 'high':
      return (
        <Badge className="bg-red-500 text-white">
          High
        </Badge>
      );
    case 'medium':
      return (
        <Badge className="bg-amber-500 text-white">
          Medium
        </Badge>
      );
    case 'low':
      return (
        <Badge variant="outline" className="text-green-500 border-green-500">
          Low
        </Badge>
      );
  }
};

const getStatusBadge = (status: IncidentStatus) => {
  switch (status) {
    case 'active':
      return (
        <div className="flex items-center">
          <span className="relative flex h-2 w-2 mr-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="text-xs">Active</span>
        </div>
      );
    case 'responding':
      return (
        <div className="flex items-center">
          <span className="relative flex h-2 w-2 mr-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <span className="text-xs">Responding</span>
        </div>
      );
    case 'contained':
      return (
        <div className="flex items-center">
          <span className="h-2 w-2 rounded-full bg-green-500 mr-1.5"></span>
          <span className="text-xs">Contained</span>
        </div>
      );
  }
};

export function ActiveIncidents() {
  const [filter, setFilter] = useState<IncidentPriority | 'all'>('all');
  
  const filteredIncidents = filter === 'all' 
    ? incidents 
    : incidents.filter(incident => incident.priority === filter);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Active Incidents</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Filter size={14} />
                <span>Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuItem 
                className="cursor-pointer" 
                onClick={() => setFilter('all')}
              >
                All priorities
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="cursor-pointer" 
                onClick={() => setFilter('high')}
              >
                High priority
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="cursor-pointer" 
                onClick={() => setFilter('medium')}
              >
                Medium priority
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="cursor-pointer" 
                onClick={() => setFilter('low')}
              >
                Low priority
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardDescription>
          {filter === 'all' ? 'All active incidents' : `${filter} priority incidents`}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {filteredIncidents.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground">
              No incidents match the selected filter
            </div>
          ) : (
            filteredIncidents.map((incident) => (
              <div 
                key={incident.id}
                className={cn(
                  "p-4 transition-colors hover:bg-muted/50",
                  incident.priority === 'high' && "border-l-2 border-red-500 pl-[14px]",
                  incident.priority === 'medium' && "border-l-2 border-amber-500 pl-[14px]",
                  incident.priority === 'low' && "border-l-2 border-green-500 pl-[14px]",
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-sm">{incident.title}</h4>
                      {getPriorityBadge(incident.priority)}
                    </div>
                    
                    <div className="flex items-center text-xs text-muted-foreground">
                      <MapPin size={12} className="mr-1" />
                      <span>{incident.location}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-3 pt-2">
                      <div className="flex items-center text-xs text-muted-foreground">
                        {getStatusBadge(incident.status)}
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Users size={12} className="mr-1" />
                        <span>{incident.responders} responders</span>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock size={12} className="mr-1" />
                        <span>{incident.reportedAt}</span>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <AlertCircle size={12} className="mr-1" />
                        <span>{incident.affectedArea}</span>
                      </div>
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <MoreVertical size={14} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[160px]">
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Assign responders</DropdownMenuItem>
                      <DropdownMenuItem>Update status</DropdownMenuItem>
                      <DropdownMenuItem>Generate report</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default ActiveIncidents;
