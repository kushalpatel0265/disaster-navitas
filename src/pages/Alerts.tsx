
import { useState } from 'react';
import { 
  Bell,
  Search, 
  Plus, 
  Filter, 
  SlidersHorizontal, 
  ChevronDown, 
  Clock, 
  MapPin, 
  AlertTriangle,
  Share2,
  Eye,
  CheckCircle,
  XCircle,
  MoreVertical,
  CalendarClock
} from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type AlertCategory = 'all' | 'weather' | 'infrastructure' | 'medical' | 'security';
type AlertPriority = 'critical' | 'high' | 'medium' | 'low';
type AlertStatus = 'active' | 'scheduled' | 'resolved' | 'cancelled';

interface Alert {
  id: string;
  title: string;
  description: string;
  category: AlertCategory;
  priority: AlertPriority;
  status: AlertStatus;
  location: string;
  issuedAt: string;
  expiresAt?: string;
  createdBy: string;
}

const alertData: Alert[] = [
  {
    id: 'ALT-001',
    title: 'Flash Flood Warning',
    description: 'Potential flash flooding in low-lying areas due to continuous rainfall. Residents advised to move to higher ground.',
    category: 'weather',
    priority: 'critical',
    status: 'active',
    location: 'Downtown Area, River District',
    issuedAt: '2023-06-10T10:30:00',
    expiresAt: '2023-06-11T10:30:00',
    createdBy: 'Weather Monitoring System',
  },
  {
    id: 'ALT-002',
    title: 'Scheduled Power Outage',
    description: 'Planned maintenance will cause a temporary power outage in the specified areas. Expected duration: 3 hours.',
    category: 'infrastructure',
    priority: 'medium',
    status: 'scheduled',
    location: 'East District, Blocks A-F',
    issuedAt: '2023-06-12T08:00:00',
    expiresAt: '2023-06-12T11:00:00',
    createdBy: 'Power Company',
  },
  {
    id: 'ALT-003',
    title: 'COVID-19 Testing Site',
    description: 'New COVID-19 testing location established. Free testing available for all residents.',
    category: 'medical',
    priority: 'high',
    status: 'active',
    location: 'Community Center, North District',
    issuedAt: '2023-06-08T14:15:00',
    expiresAt: '2023-06-15T23:59:00',
    createdBy: 'Health Department',
  },
  {
    id: 'ALT-004',
    title: 'Road Closure',
    description: 'Main Street closed due to construction. Expected to reopen next week. Please use alternate routes.',
    category: 'infrastructure',
    priority: 'medium',
    status: 'active',
    location: 'Main Street, between 5th and 8th Avenue',
    issuedAt: '2023-06-09T07:30:00',
    expiresAt: '2023-06-16T18:00:00',
    createdBy: 'Transportation Department',
  },
  {
    id: 'ALT-005',
    title: 'Severe Thunderstorm Warning',
    description: 'Severe thunderstorms with potential for lightning and hail expected this evening. Seek shelter indoors.',
    category: 'weather',
    priority: 'high',
    status: 'active',
    location: 'Citywide',
    issuedAt: '2023-06-10T15:45:00',
    expiresAt: '2023-06-10T23:00:00',
    createdBy: 'Weather Monitoring System',
  },
  {
    id: 'ALT-006',
    title: 'Suspicious Activity Alert',
    description: 'Reports of suspicious activities in the southern residential area. Increased police patrols in the area.',
    category: 'security',
    priority: 'high',
    status: 'active',
    location: 'Southern Residential Area',
    issuedAt: '2023-06-10T20:10:00',
    expiresAt: '2023-06-11T08:00:00',
    createdBy: 'Police Department',
  },
  {
    id: 'ALT-007',
    title: 'Water Main Repair',
    description: 'Water service interrupted due to emergency repairs. Service expected to resume by evening.',
    category: 'infrastructure',
    priority: 'medium',
    status: 'resolved',
    location: 'Western District, Sector C',
    issuedAt: '2023-06-09T10:30:00',
    expiresAt: '2023-06-09T18:00:00',
    createdBy: 'Water Services',
  },
  {
    id: 'ALT-008',
    title: 'Vaccination Drive Cancelled',
    description: 'The scheduled vaccination drive at Central Hospital has been cancelled due to supply issues.',
    category: 'medical',
    priority: 'medium',
    status: 'cancelled',
    location: 'Central Hospital, Medical District',
    issuedAt: '2023-06-08T12:00:00',
    expiresAt: '2023-06-11T18:00:00',
    createdBy: 'Health Department',
  },
];

const getCategoryIcon = (category: AlertCategory) => {
  switch (category) {
    case 'weather':
      return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/><path d="M22 10a3 3 0 0 0-3-3h-2.207a5.502 5.502 0 0 0-10.702.5"/></svg>;
    case 'infrastructure':
      return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500"><path d="M2 12a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V7h-5a8 8 0 0 0-5 2 8 8 0 0 0-5-2H2Z"/><path d="M6 11c1.5 0 3 .5 3 2-2 0-3 0-3-2Z"/><path d="M18 11c-1.5 0-3 .5-3 2 2 0 3 0 3-2Z"/></svg>;
    case 'medical':
      return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500"><path d="M8 19h8a4 4 0 0 0 4-4v-8a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4Z"/><path d="M12 7v6"/><path d="M9 10h6"/></svg>;
    case 'security':
      return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
    default:
      return <Bell className="w-4 h-4 text-gray-500" />;
  }
};

const getPriorityBadge = (priority: AlertPriority) => {
  switch (priority) {
    case 'critical':
      return (
        <Badge className="bg-red-500">
          Critical
        </Badge>
      );
    case 'high':
      return (
        <Badge className="bg-amber-500">
          High
        </Badge>
      );
    case 'medium':
      return (
        <Badge className="bg-blue-500">
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

const getStatusBadge = (status: AlertStatus) => {
  switch (status) {
    case 'active':
      return (
        <div className="flex items-center space-x-1">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-xs font-medium text-green-500">Active</span>
        </div>
      );
    case 'scheduled':
      return (
        <div className="flex items-center space-x-1">
          <CalendarClock className="h-3 w-3 text-blue-500" />
          <span className="text-xs font-medium text-blue-500">Scheduled</span>
        </div>
      );
    case 'resolved':
      return (
        <div className="flex items-center space-x-1">
          <CheckCircle className="h-3 w-3 text-green-500" />
          <span className="text-xs font-medium text-green-500">Resolved</span>
        </div>
      );
    case 'cancelled':
      return (
        <div className="flex items-center space-x-1">
          <XCircle className="h-3 w-3 text-red-500" />
          <span className="text-xs font-medium text-red-500">Cancelled</span>
        </div>
      );
  }
};

export function AlertsPage() {
  const [activeTab, setActiveTab] = useState<AlertStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: 'all' as AlertCategory | 'all',
    priority: 'all' as AlertPriority | 'all',
  });
  
  const filteredAlerts = alertData
    .filter(alert => 
      activeTab === 'all' || alert.status === activeTab
    )
    .filter(alert => 
      filters.category === 'all' || alert.category === filters.category
    )
    .filter(alert => 
      filters.priority === 'all' || alert.priority === filters.priority
    )
    .filter(alert => 
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
  return (
    <PageLayout>
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Alert Management</h2>
          <p className="text-muted-foreground">
            Create, monitor, and manage emergency alerts and notifications
          </p>
        </div>
        <Button className="hidden sm:flex items-center gap-2">
          <Plus size={16} className="mr-1" />
          <span>Create Alert</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search alerts..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-10">
                    <Filter className="h-4 w-4 mr-2" />
                    <span>Filters</span>
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[220px]">
                  <div className="px-3 pt-1 pb-2">
                    <h4 className="font-medium text-sm mb-2">Alert Category</h4>
                    <div className="space-y-1">
                      {(['all', 'weather', 'infrastructure', 'medical', 'security'] as const).map((category) => (
                        <div 
                          key={category} 
                          className={cn(
                            "px-2 py-1.5 rounded-sm text-sm cursor-pointer hover:bg-muted",
                            filters.category === category && "bg-muted"
                          )}
                          onClick={() => setFilters({...filters, category})}
                        >
                          {category === 'all' ? 'All Categories' : 
                            category.charAt(0).toUpperCase() + category.slice(1)}
                        </div>
                      ))}
                    </div>
                    
                    <Separator className="my-2" />
                    
                    <h4 className="font-medium text-sm mb-2">Priority</h4>
                    <div className="space-y-1">
                      {(['all', 'critical', 'high', 'medium', 'low'] as const).map((priority) => (
                        <div 
                          key={priority} 
                          className={cn(
                            "px-2 py-1.5 rounded-sm text-sm cursor-pointer hover:bg-muted",
                            filters.priority === priority && "bg-muted"
                          )}
                          onClick={() => setFilters({...filters, priority})}
                        >
                          {priority === 'all' ? 'All Priorities' : 
                            priority.charAt(0).toUpperCase() + priority.slice(1)}
                        </div>
                      ))}
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" size="icon" className="h-10 w-10">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
              <Button className="sm:hidden">
                <Plus className="h-4 w-4 mr-2" />
                <span>Create</span>
              </Button>
            </div>
          </div>
          
          <Tabs 
            defaultValue="all" 
            value={activeTab} 
            onValueChange={(value) => setActiveTab(value as AlertStatus | 'all')}
          >
            <TabsList className="grid grid-cols-5 h-auto p-1">
              <TabsTrigger value="all" className="py-2 text-xs">All Alerts</TabsTrigger>
              <TabsTrigger value="active" className="py-2 text-xs">Active</TabsTrigger>
              <TabsTrigger value="scheduled" className="py-2 text-xs">Scheduled</TabsTrigger>
              <TabsTrigger value="resolved" className="py-2 text-xs">Resolved</TabsTrigger>
              <TabsTrigger value="cancelled" className="py-2 text-xs">Cancelled</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium">Alerts</CardTitle>
                  <CardDescription>
                    {activeTab === 'all' 
                      ? 'All emergency alerts' 
                      : `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} alerts`
                    }
                    {filters.category !== 'all' && ` - ${filters.category.charAt(0).toUpperCase() + filters.category.slice(1)}`}
                    {filters.priority !== 'all' && ` - ${filters.priority.charAt(0).toUpperCase() + filters.priority.slice(1)} priority`}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  {filteredAlerts.length === 0 ? (
                    <div className="px-6 py-8 text-center text-muted-foreground">
                      No alerts found for the selected criteria
                    </div>
                  ) : (
                    <div className="divide-y divide-border">
                      {filteredAlerts.map((alert) => (
                        <div 
                          key={alert.id}
                          className={cn(
                            "p-4 hover:bg-muted/50 transition-colors",
                            alert.priority === 'critical' && "border-l-2 border-red-500 pl-[14px]",
                            alert.priority === 'high' && "border-l-2 border-amber-500 pl-[14px]",
                            alert.priority === 'medium' && "border-l-2 border-blue-500 pl-[14px]",
                            alert.priority === 'low' && "border-l-2 border-green-500 pl-[14px]",
                          )}
                        >
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium text-sm">{alert.title}</h4>
                                {getPriorityBadge(alert.priority)}
                              </div>
                              
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {alert.description}
                              </p>
                              
                              <div className="flex flex-wrap gap-4 pt-2">
                                <div className="flex items-center text-xs text-muted-foreground">
                                  {getCategoryIcon(alert.category)}
                                  <span className="ml-1 capitalize">
                                    {alert.category}
                                  </span>
                                </div>
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <MapPin size={12} className="mr-1" />
                                  <span>{alert.location}</span>
                                </div>
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <Clock size={12} className="mr-1" />
                                  <span>
                                    Issued: {new Date(alert.issuedAt).toLocaleString()}
                                  </span>
                                </div>
                                {getStatusBadge(alert.status)}
                              </div>
                            </div>
                            
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVertical size={15} />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-[160px]">
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  <span>View</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Share2 className="mr-2 h-4 w-4" />
                                  <span>Share</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {alert.status === 'active' && (
                                  <DropdownMenuItem>
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    <span>Mark as Resolved</span>
                                  </DropdownMenuItem>
                                )}
                                {alert.status === 'scheduled' && (
                                  <DropdownMenuItem>
                                    <XCircle className="mr-2 h-4 w-4" />
                                    <span>Cancel Alert</span>
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem className="text-red-500">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                                  <span>Delete</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Quick Alert</CardTitle>
              <CardDescription>Send an immediate alert to your audience</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Alert Templates</h4>
                  <div className="grid grid-cols-1 gap-2">
                    <Button variant="outline" className="justify-start h-auto py-3 group">
                      <AlertTriangle className="h-4 w-4 mr-2 text-red-500 group-hover:animate-pulse" />
                      <div className="text-left">
                        <div className="text-sm font-medium">Evacuation Notice</div>
                        <div className="text-xs text-muted-foreground">Immediate evacuation of the affected area</div>
                      </div>
                    </Button>
                    <Button variant="outline" className="justify-start h-auto py-3 group">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2 text-amber-500"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/><path d="M22 10a3 3 0 0 0-3-3h-2.207a5.502 5.502 0 0 0-10.702.5"/></svg>
                      <div className="text-left">
                        <div className="text-sm font-medium">Weather Warning</div>
                        <div className="text-xs text-muted-foreground">Severe weather alert and safety guidance</div>
                      </div>
                    </Button>
                    <Button variant="outline" className="justify-start h-auto py-3 group">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2 text-blue-500"><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/></svg>
                      <div className="text-left">
                        <div className="text-sm font-medium">Public Announcement</div>
                        <div className="text-xs text-muted-foreground">General information for the community</div>
                      </div>
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Distribution Channels</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-orange-500"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                        <span className="text-sm">Emergency SMS</span>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-blue-500"><path d="M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2v-7.5"/><path d="m18 2 4 4-4 4"/><path d="M14 4c-3.3 0-6 2.7-6 6v8"/><path d="M6 15h8"/></svg>
                        <span className="text-sm">Mobile App Push</span>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-red-500"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                        <span className="text-sm">Social Media</span>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-purple-500"><rect width="20" height="15" x="2" y="7" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>
                        <span className="text-sm">Email Notification</span>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-amber-500"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                        <span className="text-sm">Emergency Siren</span>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="pt-2">
                  <Button className="w-full">
                    Send Emergency Alert
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    This will send an immediate alert to all selected channels
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Alert Statistics</CardTitle>
              <CardDescription>Alert system performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium mb-3">Past 30 Days</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="text-2xl font-bold">42</div>
                      <div className="text-xs text-muted-foreground">Alerts Sent</div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="text-2xl font-bold">98.3%</div>
                      <div className="text-xs text-muted-foreground">Delivery Rate</div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="text-2xl font-bold">84%</div>
                      <div className="text-xs text-muted-foreground">Open Rate</div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="text-2xl font-bold">2.1m</div>
                      <div className="text-xs text-muted-foreground">People Reached</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Alert Types</h4>
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Weather</span>
                        <span>42%</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '42%' }} />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Infrastructure</span>
                        <span>28%</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: '28%' }} />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Medical</span>
                        <span>18%</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-red-500 rounded-full" style={{ width: '18%' }} />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Security</span>
                        <span>12%</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-purple-500 rounded-full" style={{ width: '12%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}

export default AlertsPage;
