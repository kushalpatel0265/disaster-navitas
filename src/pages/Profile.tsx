
import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Edit, Check, Mail, Phone, MapPin, Shield, BadgePlus } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageLayout from '@/components/layout/PageLayout';

function ProfilePage() {
  const { user } = useUser();
  const [editing, setEditing] = useState(false);
  
  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
            <p className="text-muted-foreground">
              Manage your personal information and preferences
            </p>
          </div>
          
          <div className="flex gap-2">
            {editing ? (
              <>
                <Button 
                  variant="ghost" 
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </Button>
                <Button onClick={() => setEditing(false)}>
                  <Check className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button onClick={() => setEditing(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-4 space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={user?.imageUrl} alt={user?.fullName || 'User'} />
                    <AvatarFallback>
                      {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <h3 className="text-xl font-medium">{user?.fullName}</h3>
                  <p className="text-muted-foreground">Emergency Response Coordinator</p>
                  
                  <div className="flex flex-wrap justify-center gap-2 mt-3">
                    <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-200">
                      First Responder
                    </Badge>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-200">
                      Team Lead
                    </Badge>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-3 text-muted-foreground" />
                    <span className="text-sm">{user?.primaryEmailAddress?.emailAddress}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-3 text-muted-foreground" />
                    <span className="text-sm">+1 (555) 123-4567</span>
                  </div>
                  
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-3 text-muted-foreground" />
                    <span className="text-sm">Los Angeles, CA</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 mr-3 text-muted-foreground" />
                    <span className="text-sm">Member since {new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button variant="outline" className="w-full">
                  <BadgePlus className="mr-2 h-4 w-4" />
                  Add Certification
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Skills & Certifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium">Emergency Management</h4>
                    <div className="h-2 w-full bg-secondary mt-1 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 w-4/5 rounded-full" />
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium">First Aid & CPR</h4>
                    <div className="h-2 w-full bg-secondary mt-1 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 w-full rounded-full" />
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium">Incident Command</h4>
                    <div className="h-2 w-full bg-secondary mt-1 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 w-3/4 rounded-full" />
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium">Resource Coordination</h4>
                    <div className="h-2 w-full bg-secondary mt-1 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 w-3/5 rounded-full" />
                    </div>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Certifications</h4>
                  <div className="space-y-2">
                    <div className="text-sm flex justify-between">
                      <span>FEMA Incident Management</span>
                      <span className="text-muted-foreground">2023</span>
                    </div>
                    <div className="text-sm flex justify-between">
                      <span>Advanced First Aid</span>
                      <span className="text-muted-foreground">2022</span>
                    </div>
                    <div className="text-sm flex justify-between">
                      <span>Disaster Response</span>
                      <span className="text-muted-foreground">2021</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-8 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName" 
                      defaultValue={user?.firstName || ''} 
                      disabled={!editing} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName" 
                      defaultValue={user?.lastName || ''} 
                      disabled={!editing} 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    defaultValue={user?.primaryEmailAddress?.emailAddress || ''} 
                    disabled 
                  />
                  <p className="text-xs text-muted-foreground">Email address cannot be changed directly. Please contact administrator.</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    defaultValue="+1 (555) 123-4567" 
                    disabled={!editing} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    defaultValue="Los Angeles, CA" 
                    disabled={!editing} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input 
                    id="role" 
                    defaultValue="Emergency Response Coordinator" 
                    disabled={!editing} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio" 
                    rows={4} 
                    placeholder="Tell us about yourself"
                    disabled={!editing} 
                    defaultValue="Experienced emergency management professional with over 5 years specializing in disaster response coordination and team leadership."
                  />
                </div>
              </CardContent>
            </Card>
            
            <Tabs defaultValue="activity" className="space-y-4">
              <TabsList>
                <TabsTrigger value="activity">Recent Activity</TabsTrigger>
                <TabsTrigger value="teams">Teams</TabsTrigger>
                <TabsTrigger value="settings">Account Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="activity">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>
                      View your recent actions and responses
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-4">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium">Responded to Downtown Flooding incident</p>
                          <p className="text-xs text-muted-foreground">3 hours ago</p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-start space-x-4">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium">Updated status of Gas Leak incident</p>
                          <p className="text-xs text-muted-foreground">Yesterday at 2:30 PM</p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-start space-x-4">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium">Joined Emergency Response Team</p>
                          <p className="text-xs text-muted-foreground">3 days ago</p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-start space-x-4">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium">Completed Disaster Response training</p>
                          <p className="text-xs text-muted-foreground">1 week ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="teams">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Teams</CardTitle>
                    <CardDescription>
                      Teams you are a member of
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-sm font-medium">Emergency Response Team</h4>
                          <p className="text-xs text-muted-foreground">First Responder • 5 members</p>
                        </div>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-sm font-medium">Flood Response Unit</h4>
                          <p className="text-xs text-muted-foreground">Team Lead • 8 members</p>
                        </div>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-sm font-medium">Downtown Evacuation Team</h4>
                          <p className="text-xs text-muted-foreground">Coordinator • 12 members</p>
                        </div>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t px-6 py-4">
                    <Button variant="outline" className="w-full">
                      See All Teams
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>
                      Manage your account preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive email notifications for important updates</p>
                      </div>
                      <Switch id="email-notifications" defaultChecked />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="sms-notifications">SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive text messages for critical alerts</p>
                      </div>
                      <Switch id="sms-notifications" defaultChecked />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="public-profile">Public Profile</Label>
                        <p className="text-sm text-muted-foreground">Make your profile visible to other team members</p>
                      </div>
                      <Switch id="public-profile" defaultChecked />
                    </div>
                  </CardContent>
                  <CardFooter className="border-t px-6 py-4 flex justify-end">
                    <Button>Save Settings</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default ProfilePage;
