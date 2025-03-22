
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Bell, Shield, Monitor, Globe, Laptop, Moon, Sun, AlertTriangle } from 'lucide-react';
import { useUser, useClerk } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageLayout from '@/components/layout/PageLayout';

function SettingsPage() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/sign-in');
  };
  
  return (
    <PageLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>
        
        <Tabs defaultValue="account" className="space-y-4">
          <TabsList>
            <TabsTrigger value="account" className="flex items-center gap-2">
              <User size={16} />
              <span>Account</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell size={16} />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Monitor size={16} />
              <span>Appearance</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield size={16} />
              <span>Security</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="account" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  View and manage your personal information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-1">
                  <h3 className="text-sm font-medium">Email Address</h3>
                  <p className="text-sm text-muted-foreground">{user?.primaryEmailAddress?.emailAddress}</p>
                </div>
                <div className="grid gap-1">
                  <h3 className="text-sm font-medium">Name</h3>
                  <p className="text-sm text-muted-foreground">{user?.fullName}</p>
                </div>
                <Separator />
                <div className="grid gap-2">
                  <h3 className="text-sm font-medium">Sessions</h3>
                  <div className="rounded-md border p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">Current Session</p>
                        <p className="text-xs text-muted-foreground">Started at {new Date().toLocaleString()}</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={handleSignOut}>
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button variant="default" onClick={() => navigate('/profile')}>
                  Manage Profile
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Manage how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="alerts">Emergency Alerts</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications for critical emergency alerts</p>
                    </div>
                    <Switch id="alerts" defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="incidents">Incident Updates</Label>
                      <p className="text-sm text-muted-foreground">Get updates on incident progress and status changes</p>
                    </div>
                    <Switch id="incidents" defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="team">Team Communications</Label>
                      <p className="text-sm text-muted-foreground">Notifications for team messages and updates</p>
                    </div>
                    <Switch id="team" defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="resources">Resource Assignments</Label>
                      <p className="text-sm text-muted-foreground">Notifications when resources are assigned to you</p>
                    </div>
                    <Switch id="resources" defaultChecked />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4 flex justify-between">
                <Button variant="outline">Reset to Defaults</Button>
                <Button variant="default">Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Customize how the application looks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-3">Theme</h3>
                    <RadioGroup 
                      defaultValue={theme} 
                      onValueChange={(value) => setTheme(value as 'light' | 'dark' | 'system')}
                      className="grid grid-cols-3 gap-4"
                    >
                      <div>
                        <RadioGroupItem 
                          value="light" 
                          id="theme-light" 
                          className="sr-only peer" 
                        />
                        <Label
                          htmlFor="theme-light"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <Sun className="mb-3 h-6 w-6" />
                          Light
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem 
                          value="dark" 
                          id="theme-dark" 
                          className="sr-only peer" 
                        />
                        <Label
                          htmlFor="theme-dark"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <Moon className="mb-3 h-6 w-6" />
                          Dark
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem 
                          value="system" 
                          id="theme-system" 
                          className="sr-only peer" 
                        />
                        <Label
                          htmlFor="theme-system"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <Laptop className="mb-3 h-6 w-6" />
                          System
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="animations">Animations</Label>
                        <p className="text-sm text-muted-foreground">Enable animations and transitions</p>
                      </div>
                      <Switch id="animations" defaultChecked />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="compact">Compact Mode</Label>
                        <p className="text-sm text-muted-foreground">Use less space in the interface</p>
                      </div>
                      <Switch id="compact" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4 flex justify-between">
                <Button variant="outline">Reset to Defaults</Button>
                <Button variant="default">Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>
                  Manage your account security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enable
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Password</h3>
                    <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
                    <Button variant="outline" size="sm">
                      Change Password
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Active Sessions</h3>
                    <div className="rounded-md border p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium">Current Browser</p>
                          <p className="text-xs text-muted-foreground">Chrome on Windows</p>
                        </div>
                        <div className="text-xs text-muted-foreground">Active now</div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="pt-2">
                    <Button variant="destructive" size="sm">
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
}

export default SettingsPage;
