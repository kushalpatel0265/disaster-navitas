
import { useState } from 'react';
import { Search, UserPlus, Filter, ChevronDown, MoreVertical, Mail, Phone } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import PageLayout from '@/components/layout/PageLayout';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  status: 'active' | 'on-call' | 'off-duty';
  email: string;
  phone: string;
  avatar?: string;
  skills: string[];
}

const teamMembers: TeamMember[] = [
  {
    id: 'TM-001',
    name: 'John Carter',
    role: 'Fire Chief',
    department: 'Fire Department',
    status: 'active',
    email: 'john.carter@example.com',
    phone: '+1 (555) 123-4567',
    skills: ['Fire Suppression', 'Rescue Operations', 'Command'],
  },
  {
    id: 'TM-002',
    name: 'Elena Rodriguez',
    role: 'Paramedic',
    department: 'Emergency Medical Services',
    status: 'active',
    email: 'elena.rodriguez@example.com',
    phone: '+1 (555) 234-5678',
    skills: ['Emergency Medicine', 'Trauma Care', 'Search & Rescue'],
  },
  {
    id: 'TM-003',
    name: 'Marcus Johnson',
    role: 'Water Rescue Specialist',
    department: 'Coast Guard',
    status: 'on-call',
    email: 'marcus.johnson@example.com',
    phone: '+1 (555) 345-6789',
    skills: ['Water Rescue', 'First Aid', 'Equipment Operation'],
  },
  {
    id: 'TM-004',
    name: 'Sarah Williams',
    role: 'Hazmat Specialist',
    department: 'Fire Department',
    status: 'active',
    email: 'sarah.williams@example.com',
    phone: '+1 (555) 456-7890',
    skills: ['Hazardous Materials', 'Chemical Safety', 'Evacuation Coordination'],
  },
  {
    id: 'TM-005',
    name: 'David Chen',
    role: 'Search & Rescue',
    department: 'Emergency Management',
    status: 'off-duty',
    email: 'david.chen@example.com',
    phone: '+1 (555) 567-8901',
    skills: ['Urban Search & Rescue', 'Structural Assessment', 'Technical Rescue'],
  },
];

const getStatusBadge = (status: TeamMember['status']) => {
  switch (status) {
    case 'active':
      return <Badge className="bg-green-500">Active</Badge>;
    case 'on-call':
      return <Badge className="bg-amber-500">On Call</Badge>;
    case 'off-duty':
      return <Badge className="bg-gray-500">Off Duty</Badge>;
  }
};

function TeamPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | TeamMember['status']>('all');
  
  const filteredMembers = teamMembers
    .filter(member => 
      selectedStatus === 'all' || member.status === selectedStatus
    )
    .filter(member => 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.department.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Team Management</h2>
            <p className="text-muted-foreground">
              Manage your team members and their assignments
            </p>
          </div>
          
          <Button className="flex items-center gap-2">
            <UserPlus size={16} className="mr-1" />
            <span>Add Team Member</span>
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search team members..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-10">
                <Filter className="h-4 w-4 mr-2" />
                <span>Filter</span>
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px]">
              <DropdownMenuItem>By Department</DropdownMenuItem>
              <DropdownMenuItem>By Role</DropdownMenuItem>
              <DropdownMenuItem>By Skills</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <Tabs 
          defaultValue="all" 
          value={selectedStatus}
          onValueChange={(value) => setSelectedStatus(value as 'all' | TeamMember['status'])}
          className="space-y-4"
        >
          <TabsList className="grid grid-cols-4 h-auto p-1">
            <TabsTrigger value="all" className="py-2 text-xs">All Members</TabsTrigger>
            <TabsTrigger value="active" className="py-2 text-xs">Active</TabsTrigger>
            <TabsTrigger value="on-call" className="py-2 text-xs">On Call</TabsTrigger>
            <TabsTrigger value="off-duty" className="py-2 text-xs">Off Duty</TabsTrigger>
          </TabsList>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMembers.length === 0 ? (
              <Card className="md:col-span-2 lg:col-span-3">
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground">No team members found for the selected criteria</p>
                </CardContent>
              </Card>
            ) : (
              filteredMembers.map((member) => (
                <Card key={member.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex justify-between items-start p-4 border-b">
                      <div className="flex space-x-4">
                        <Avatar className="h-12 w-12">
                          {member.avatar && <AvatarImage src={member.avatar} alt={member.name} />}
                          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{member.name}</h3>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(member.status)}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-[160px]">
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Edit Member</DropdownMenuItem>
                            <DropdownMenuItem>Assign to Task</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-500">Remove</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    
                    <div className="p-4 space-y-2">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Department: </span>
                        <span>{member.department}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mt-2">
                        {member.skills.slice(0, 3).map((skill, index) => (
                          <Badge key={index} variant="outline" className="bg-secondary/50">
                            {skill}
                          </Badge>
                        ))}
                        {member.skills.length > 3 && (
                          <Badge variant="outline" className="bg-secondary/50">
                            +{member.skills.length - 3} more
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex justify-between mt-4 pt-3 border-t">
                        <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                          <Mail size={14} className="mr-1" />
                          Email
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                          <Phone size={14} className="mr-1" />
                          Call
                        </Button>
                        <Button variant="default" size="sm" className="h-8 px-3 text-xs">
                          Assign
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
    </PageLayout>
  );
}

export default TeamPage;
