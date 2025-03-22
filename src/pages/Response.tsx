
import { useState } from 'react';
import { 
  Search,
  Filter,
  MapPin,
  Users,
  Clock,
  AlertTriangle,
  Plus,
  PhoneCall,
  MoreVertical,
  ChevronDown,
  CheckCircle,
  PanelRightOpen,
  PanelRightClose,
  ArrowRightCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import PageLayout from '@/components/layout/PageLayout';
import { cn } from '@/lib/utils';

type IncidentSeverity = 'severe' | 'moderate' | 'minor';
type IncidentStatus = 'new' | 'in-progress' | 'resolved';
type ResponderId = string;

interface Responder {
  id: ResponderId;
  name: string;
  role: string;
  status: 'available' | 'dispatched' | 'unavailable';
  location: string;
  avatar?: string;
  contact: string;
  skills: string[];
}

interface Incident {
  id: string;
  title: string;
  description: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  severity: IncidentSeverity;
  status: IncidentStatus;
  reportedAt: string;
  responders: ResponderId[];
  affectedPeople: number;
  progress?: number;
}

const incidents: Incident[] = [
  {
    id: 'INC-001',
    title: 'Downtown Flooding',
    description: 'Flash flooding in downtown area affecting multiple buildings and roads. Water levels rising rapidly.',
    location: 'Main Street & 5th Avenue',
    coordinates: { lat: 34.052235, lng: -118.243683 },
    severity: 'severe',
    status: 'in-progress',
    reportedAt: '2023-06-10T10:30:00',
    responders: ['R-001', 'R-003', 'R-005'],
    affectedPeople: 150,
    progress: 35,
  },
  {
    id: 'INC-002',
    title: 'Gas Leak at Apartment Complex',
    description: 'Reported gas leak at Riverside Apartments. Strong smell detected in building B. Evacuation in progress.',
    location: 'Riverside Apartments, 123 River Rd',
    coordinates: { lat: 34.064545, lng: -118.272781 },
    severity: 'severe',
    status: 'in-progress',
    reportedAt: '2023-06-10T11:15:00',
    responders: ['R-002', 'R-004'],
    affectedPeople: 75,
    progress: 60,
  },
  {
    id: 'INC-003',
    title: 'Traffic Accident',
    description: 'Multiple vehicle collision on Highway 10. Three cars involved. Injuries reported.',
    location: 'Highway 10, Mile Marker 42',
    coordinates: { lat: 34.078899, lng: -118.212156 },
    severity: 'moderate',
    status: 'in-progress',
    reportedAt: '2023-06-10T09:45:00',
    responders: ['R-006', 'R-007'],
    affectedPeople: 8,
    progress: 80,
  },
  {
    id: 'INC-004',
    title: 'Power Outage',
    description: 'Power outage affecting eastern district. Multiple reports of downed power lines from storm damage.',
    location: 'Eastern District',
    coordinates: { lat: 34.032778, lng: -118.252243 },
    severity: 'moderate',
    status: 'new',
    reportedAt: '2023-06-10T12:30:00',
    responders: [],
    affectedPeople: 3000,
  },
  {
    id: 'INC-005',
    title: 'Small Fire at Restaurant',
    description: 'Kitchen fire at Bella\'s Restaurant. Kitchen staff evacuated. No injuries reported.',
    location: 'Bella\'s Restaurant, 456 Oak St',
    coordinates: { lat: 34.041789, lng: -118.299564 },
    severity: 'minor',
    status: 'resolved',
    reportedAt: '2023-06-10T08:15:00',
    responders: ['R-008'],
    affectedPeople: 25,
    progress: 100,
  },
];

const responders: Responder[] = [
  {
    id: 'R-001',
    name: 'John Carter',
    role: 'Fire Chief',
    status: 'dispatched',
    location: 'Downtown Area',
    avatar: '',
    contact: '+1 (555) 123-4567',
    skills: ['Fire Suppression', 'Rescue Operations', 'Command'],
  },
  {
    id: 'R-002',
    name: 'Elena Rodriguez',
    role: 'Paramedic',
    status: 'dispatched',
    location: 'Riverside Area',
    avatar: '',
    contact: '+1 (555) 234-5678',
    skills: ['Emergency Medicine', 'Trauma Care', 'Search & Rescue'],
  },
  {
    id: 'R-003',
    name: 'Marcus Johnson',
    role: 'Water Rescue Specialist',
    status: 'dispatched',
    location: 'Downtown Area',
    avatar: '',
    contact: '+1 (555) 345-6789',
    skills: ['Water Rescue', 'First Aid', 'Equipment Operation'],
  },
  {
    id: 'R-004',
    name: 'Sarah Williams',
    role: 'Hazmat Specialist',
    status: 'dispatched',
    location: 'Riverside Area',
    avatar: '',
    contact: '+1 (555) 456-7890',
    skills: ['Hazardous Materials', 'Chemical Safety', 'Evacuation Coordination'],
  },
  {
    id: 'R-005',
    name: 'David Chen',
    role: 'Search & Rescue',
    status: 'dispatched',
    location: 'Downtown Area',
    avatar: '',
    contact: '+1 (555) 567-8901',
    skills: ['Urban Search & Rescue', 'Structural Assessment', 'Technical Rescue'],
  },
  {
    id: 'R-006',
    name: 'Michael Brown',
    role: 'Traffic Officer',
    status: 'dispatched',
    location: 'Highway 10',
    avatar: '',
    contact: '+1 (555) 678-9012',
    skills: ['Traffic Control', 'First Aid', 'Scene Security'],
  },
  {
    id: 'R-007',
    name: 'Lisa Tanaka',
    role: 'Paramedic',
    status: 'dispatched',
    location: 'Highway 10',
    avatar: '',
    contact: '+1 (555) 789-0123',
    skills: ['Emergency Medicine', 'Trauma Care', 'Triage'],
  },
  {
    id: 'R-008',
    name: 'Robert Miller',
    role: 'Firefighter',
    status: 'available',
    location: 'Central Station',
    avatar: '',
    contact: '+1 (555) 890-1234',
    skills: ['Fire Suppression', 'Rescue Operations', 'First Aid'],
  },
  {
    id: 'R-009',
    name: 'Emily Davis',
    role: 'Emergency Manager',
    status: 'available',
    location: 'Emergency Operations Center',
    avatar: '',
    contact: '+1 (555) 901-2345',
    skills: ['Coordination', 'Resource Management', 'Communications'],
  },
  {
    id: 'R-010',
    name: 'James Wilson',
    role: 'Police Officer',
    status: 'available',
    location: 'Central Station',
    avatar: '',
    contact: '+1 (555) 012-3456',
    skills: ['Law Enforcement', 'Crowd Control', 'Scene Security'],
  },
];

const getSeverityBadge = (severity: IncidentSeverity) => {
  switch (severity) {
    case 'severe':
      return (
        <Badge className="bg-red-500">
          Severe
        </Badge>
      );
    case 'moderate':
      return (
        <Badge className="bg-amber-500">
          Moderate
        </Badge>
      );
    case 'minor':
      return (
        <Badge className="bg-green-500">
          Minor
        </Badge>
      );
  }
};

const getStatusBadge = (status: IncidentStatus) => {
  switch (status) {
    case 'new':
      return (
        <div className="flex items-center space-x-1">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="text-xs font-medium text-blue-500">New</span>
        </div>
      );
    case 'in-progress':
      return (
        <div className="flex items-center space-x-1">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <span className="text-xs font-medium text-amber-500">In Progress</span>
        </div>
      );
    case 'resolved':
      return (
        <div className="flex items-center space-x-1">
          <CheckCircle className="h-3 w-3 text-green-500" />
          <span className="text-xs font-medium text-green-500">Resolved</span>
        </div>
      );
  }
};

function ResponsePage() {
  const [selectedTab, setSelectedTab] = useState<IncidentStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const filteredIncidents = incidents
    .filter(incident => 
      selectedTab === 'all' || incident.status === selectedTab
    )
    .filter(incident => 
      incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
  const selectedIncident = selectedIncidentId 
    ? incidents.find(incident => incident.id === selectedIncidentId) 
    : null;
    
  const incidentResponders = selectedIncident 
    ? responders.filter(responder => selectedIncident.responders.includes(responder.id))
    : [];
    
  const availableResponders = responders.filter(responder => responder.status === 'available');
  
  return (
    <PageLayout padded={false}>
      <div className="flex h-[calc(100vh-4rem)]">
        <div className={cn(
          "h-full w-full transition-all duration-300 ease-in-out",
          sidebarOpen ? "lg:w-[60%]" : "lg:w-full"
        )}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="space-y-1">
                <h2 className="text-3xl font-bold tracking-tight">Emergency Response</h2>
                <p className="text-muted-foreground">
                  Coordinate response efforts and manage incident resolution
                </p>
              </div>
              <Button className="hidden sm:flex items-center gap-2">
                <Plus size={16} className="mr-1" />
                <span>New Incident</span>
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search incidents..."
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
                      <span>Filter</span>
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[180px]">
                    <DropdownMenuItem>By Severity</DropdownMenuItem>
                    <DropdownMenuItem>By Location</DropdownMenuItem>
                    <DropdownMenuItem>By Reported Time</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button className="sm:hidden">
                  <Plus className="h-4 w-4 mr-2" />
                  <span>Add</span>
                </Button>
              </div>
            </div>
            
            <Tabs 
              defaultValue="all" 
              value={selectedTab}
              onValueChange={(value) => setSelectedTab(value as IncidentStatus | 'all')}
              className="space-y-4"
            >
              <TabsList className="grid grid-cols-4 h-auto p-1">
                <TabsTrigger value="all" className="py-2 text-xs">All Incidents</TabsTrigger>
                <TabsTrigger value="new" className="py-2 text-xs">New</TabsTrigger>
                <TabsTrigger value="in-progress" className="py-2 text-xs">In Progress</TabsTrigger>
                <TabsTrigger value="resolved" className="py-2 text-xs">Resolved</TabsTrigger>
              </TabsList>
              
              <div className="grid grid-cols-1 gap-4">
                {filteredIncidents.length === 0 ? (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-muted-foreground">No incidents found for the selected criteria</p>
                    </CardContent>
                  </Card>
                ) : (
                  filteredIncidents.map((incident) => (
                    <Card 
                      key={incident.id}
                      className={cn(
                        "cursor-pointer transition-all duration-200 hover:shadow-md",
                        selectedIncidentId === incident.id && "border-primary ring-1 ring-primary/20"
                      )}
                      onClick={() => {
                        setSelectedIncidentId(incident.id);
                        setSidebarOpen(true);
                      }}
                    >
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{incident.title}</h3>
                              {getSeverityBadge(incident.severity)}
                            </div>
                            
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {incident.description}
                            </p>
                            
                            <div className="flex flex-wrap gap-4 pt-2">
                              <div className="flex items-center text-xs text-muted-foreground">
                                <MapPin size={12} className="mr-1" />
                                <span>{incident.location}</span>
                              </div>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <Clock size={12} className="mr-1" />
                                <span>
                                  Reported: {new Date(incident.reportedAt).toLocaleString()}
                                </span>
                              </div>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <Users size={12} className="mr-1" />
                                <span>
                                  {incident.responders.length} responders
                                </span>
                              </div>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <AlertTriangle size={12} className="mr-1" />
                                <span>
                                  {incident.affectedPeople} affected
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-end">
                            {getStatusBadge(incident.status)}
                            
                            {incident.status === 'in-progress' && incident.progress && (
                              <div className="mt-2 flex items-center gap-2">
                                <span className="text-xs text-muted-foreground">{incident.progress}%</span>
                                <div className="w-24">
                                  <Progress value={incident.progress} className="h-1.5" />
                                </div>
                              </div>
                            )}
                            
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 mt-2" 
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedIncidentId(incident.id);
                                setSidebarOpen(true);
                              }}
                            >
                              <ArrowRightCircle size={16} />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </Tabs>
          </div>
        </div>
        
        <div 
          className={cn(
            "fixed lg:relative right-0 top-0 h-full bg-background border-l border-border transition-all duration-300 ease-in-out z-30 pt-16 lg:pt-0 overflow-auto",
            sidebarOpen 
              ? "translate-x-0 w-full sm:w-[400px] lg:w-[40%]" 
              : "translate-x-full w-full sm:w-[400px] lg:w-0"
          )}
        >
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-4 left-4 h-8 w-8 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-[75px] -left-8 h-8 w-8 hidden lg:flex bg-background border border-border rounded-l-lg rounded-r-none"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen 
              ? <PanelRightClose size={14} /> 
              : <PanelRightOpen size={14} />
            }
          </Button>
          
          {selectedIncident ? (
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-medium">{selectedIncident.title}</h3>
                  {getSeverityBadge(selectedIncident.severity)}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[180px]">
                    <DropdownMenuItem>View full details</DropdownMenuItem>
                    <DropdownMenuItem>Update status</DropdownMenuItem>
                    <DropdownMenuItem>Generate report</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-500">Close incident</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <div className="space-y-4">
                <div className="p-3 rounded-md bg-muted text-sm">
                  <p>{selectedIncident.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-md bg-muted/50">
                    <div className="text-xs text-muted-foreground">Status</div>
                    <div className="font-medium mt-1">{getStatusBadge(selectedIncident.status)}</div>
                  </div>
                  <div className="p-3 rounded-md bg-muted/50">
                    <div className="text-xs text-muted-foreground">Reported</div>
                    <div className="font-medium mt-1">{new Date(selectedIncident.reportedAt).toLocaleString()}</div>
                  </div>
                  <div className="p-3 rounded-md bg-muted/50">
                    <div className="text-xs text-muted-foreground">Location</div>
                    <div className="font-medium mt-1">{selectedIncident.location}</div>
                  </div>
                  <div className="p-3 rounded-md bg-muted/50">
                    <div className="text-xs text-muted-foreground">Affected People</div>
                    <div className="font-medium mt-1">{selectedIncident.affectedPeople}</div>
                  </div>
                </div>
                
                {selectedIncident.status === 'in-progress' && selectedIncident.progress && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Resolution Progress</span>
                      <span className="text-sm">{selectedIncident.progress}%</span>
                    </div>
                    <Progress value={selectedIncident.progress} className="h-2" />
                  </div>
                )}
                
                <Separator />
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">Assigned Responders</h4>
                    <Button variant="ghost" size="sm" className="h-8 text-xs">Manage</Button>
                  </div>
                  
                  {incidentResponders.length === 0 ? (
                    <div className="p-4 text-center text-sm text-muted-foreground bg-muted/50 rounded-md">
                      No responders assigned to this incident yet
                    </div>
                  ) : (
                    <div className="grid gap-3">
                      {incidentResponders.map(responder => (
                        <div key={responder.id} className="flex items-center p-2 rounded-md border border-border">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarFallback>{responder.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm">{responder.name}</div>
                            <div className="text-xs text-muted-foreground truncate">{responder.role}</div>
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8 ml-2">
                            <PhoneCall size={14} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {(selectedIncident.status === 'new' || selectedIncident.status === 'in-progress') && (
                  <>
                    <Separator />
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">Available Responders</h4>
                        <Button variant="ghost" size="sm" className="h-8 text-xs">View All</Button>
                      </div>
                      
                      {availableResponders.length === 0 ? (
                        <div className="p-4 text-center text-sm text-muted-foreground bg-muted/50 rounded-md">
                          No responders available at this time
                        </div>
                      ) : (
                        <div className="grid gap-3">
                          {availableResponders.slice(0, 3).map(responder => (
                            <div key={responder.id} className="flex items-center p-2 rounded-md border border-border bg-muted/30">
                              <Avatar className="h-10 w-10 mr-3">
                                <AvatarFallback>{responder.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-sm">{responder.name}</div>
                                <div className="text-xs text-muted-foreground truncate">{responder.role}</div>
                              </div>
                              <Button size="sm" variant="outline" className="h-8 ml-2 text-xs">
                                Assign
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                )}
                
                <Separator />
                
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Actions</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <Button className="w-full">
                      <span className="mr-2">📢</span>
                      Send Alert
                    </Button>
                    <Button variant="outline" className="w-full">
                      <span className="mr-2">🔄</span>
                      Update Status
                    </Button>
                    <Button variant="outline" className="w-full">
                      <span className="mr-2">📊</span>
                      View Resources
                    </Button>
                    <Button variant="outline" className="w-full">
                      <span className="mr-2">🗺️</span>
                      View Map
                    </Button>
                  </div>
                </div>
                
                {selectedIncident.status !== 'resolved' && (
                  <Button variant="destructive" className="w-full mt-4">
                    {selectedIncident.status === 'new' ? 'Cancel Incident' : 'Resolve Incident'}
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-6">
              <div className="text-center">
                <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Incident Selected</h3>
                <p className="text-muted-foreground">
                  Select an incident to view its details and manage the response
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}

export default ResponsePage;
