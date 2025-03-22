
import { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  Package, 
  Users, 
  Truck, 
  TrendingUp, 
  TrendingDown,
  Clock,
  Zap,
  Download
} from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

type TimeRange = '24h' | '7d' | '30d' | '90d' | '1y';
type ChartType = 'incidents' | 'resources' | 'response' | 'overview';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const incidentDataByTime: Record<TimeRange, any[]> = {
  '24h': Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    incidents: Math.floor(Math.random() * 5),
    alerts: Math.floor(Math.random() * 7),
  })),
  '7d': Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return {
      time: date.toLocaleDateString('en-US', { weekday: 'short' }),
      incidents: Math.floor(Math.random() * 20) + 5,
      alerts: Math.floor(Math.random() * 30) + 10,
    };
  }),
  '30d': Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return {
      time: `${date.getMonth() + 1}/${date.getDate()}`,
      incidents: Math.floor(Math.random() * 15) + 3,
      alerts: Math.floor(Math.random() * 25) + 8,
    };
  }),
  '90d': Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (90 - i * 7));
    return {
      time: `Week ${i + 1}`,
      incidents: Math.floor(Math.random() * 70) + 20,
      alerts: Math.floor(Math.random() * 100) + 40,
    };
  }),
  '1y': Array.from({ length: 12 }, (_, i) => ({
    time: new Date(0, i).toLocaleDateString('en-US', { month: 'short' }),
    incidents: Math.floor(Math.random() * 200) + 50,
    alerts: Math.floor(Math.random() * 300) + 100,
  })),
};

const incidentTypeData = [
  { name: 'Flooding', value: 35 },
  { name: 'Fire', value: 25 },
  { name: 'Power Outage', value: 20 },
  { name: 'Gas Leak', value: 10 },
  { name: 'Traffic', value: 5 },
  { name: 'Other', value: 5 },
];

const responseTimeData = [
  { name: 'Critical', time: 4.2 },
  { name: 'High', time: 8.5 },
  { name: 'Medium', time: 15.3 },
  { name: 'Low', time: 25.8 },
];

const resourceUsageData = [
  {
    name: 'Water',
    allocated: 8000,
    consumed: 5600,
    remaining: 2400,
  },
  {
    name: 'Medical',
    allocated: 500,
    consumed: 320,
    remaining: 180,
  },
  {
    name: 'Food',
    allocated: 3000,
    consumed: 1200,
    remaining: 1800,
  },
  {
    name: 'Shelter',
    allocated: 50,
    consumed: 45,
    remaining: 5,
  },
  {
    name: 'Blankets',
    allocated: 1000,
    consumed: 180,
    remaining: 820,
  },
];

const formatResponseTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
};

function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');
  const [incidentData, setIncidentData] = useState(incidentDataByTime[timeRange]);
  const [activeTab, setActiveTab] = useState<ChartType>('overview');
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    setIsLoading(true);
    setIncidentData([]);
    
    const timer = setTimeout(() => {
      setIncidentData(incidentDataByTime[timeRange]);
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [timeRange]);
  
  return (
    <PageLayout>
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground">
            Monitor disaster management performance and resource utilization
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue={timeRange} onValueChange={(value) => setTimeRange(value as TimeRange)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" className="h-10 w-10">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-muted-foreground">Total Incidents</p>
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            </div>
            <div className="flex items-baseline space-x-2">
              <h3 className="text-2xl font-bold">248</h3>
              <div className="flex items-center text-green-500 text-xs font-medium">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>12%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {timeRange === '24h' ? 'Today' : timeRange === '7d' ? 'This week' : timeRange === '30d' ? 'This month' : timeRange === '90d' ? 'This quarter' : 'This year'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-muted-foreground">Resources Deployed</p>
              <Package className="h-4 w-4 text-blue-500" />
            </div>
            <div className="flex items-baseline space-x-2">
              <h3 className="text-2xl font-bold">1,423</h3>
              <div className="flex items-center text-amber-500 text-xs font-medium">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>8%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              From {incidentData.length} distribution points
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-muted-foreground">Avg. Response Time</p>
              <Clock className="h-4 w-4 text-indigo-500" />
            </div>
            <div className="flex items-baseline space-x-2">
              <h3 className="text-2xl font-bold">12m 23s</h3>
              <div className="flex items-center text-green-500 text-xs font-medium">
                <TrendingDown className="h-3 w-3 mr-1" />
                <span>4.8%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              For critical incidents
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-muted-foreground">People Assisted</p>
              <Users className="h-4 w-4 text-green-500" />
            </div>
            <div className="flex items-baseline space-x-2">
              <h3 className="text-2xl font-bold">5,247</h3>
              <div className="flex items-center text-green-500 text-xs font-medium">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>18%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Across 32 affected areas
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-6">
        <Tabs 
          defaultValue="overview" 
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as ChartType)}
          className="space-y-4"
        >
          <TabsList className="h-auto p-1">
            <TabsTrigger value="overview" className="py-2 text-sm">Overview</TabsTrigger>
            <TabsTrigger value="incidents" className="py-2 text-sm">Incident Analysis</TabsTrigger>
            <TabsTrigger value="resources" className="py-2 text-sm">Resource Utilization</TabsTrigger>
            <TabsTrigger value="response" className="py-2 text-sm">Response Metrics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium">Incident Overview</CardTitle>
                <CardDescription>Incidents and alerts over time</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-96 p-6">
                  {isLoading ? (
                    <div className="h-full flex items-center justify-center">
                      <div className="animate-pulse flex flex-col items-center">
                        <div className="h-16 w-16 bg-muted-foreground/20 rounded-full mb-4"></div>
                        <div className="h-5 w-32 bg-muted-foreground/20 rounded"></div>
                      </div>
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={incidentData}>
                        <defs>
                          <linearGradient id="colorIncidents" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0284c7" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#0284c7" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorAlerts" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="time" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'var(--background)', 
                            borderColor: 'var(--border)',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                          }} 
                        />
                        <Legend />
                        <Area type="monotone" dataKey="incidents" name="Incidents" stroke="#0284c7" fillOpacity={1} fill="url(#colorIncidents)" />
                        <Area type="monotone" dataKey="alerts" name="Alerts" stroke="#f59e0b" fillOpacity={1} fill="url(#colorAlerts)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium">Incident Types</CardTitle>
                  <CardDescription>Distribution by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={incidentTypeData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={2}
                          dataKey="value"
                          label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {incidentTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium">Response Time</CardTitle>
                  <CardDescription>Average by incident priority</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={responseTimeData}
                        layout="vertical"
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="name" />
                        <Tooltip formatter={(value) => `${value} minutes`} />
                        <Bar 
                          dataKey="time" 
                          name="Response Time" 
                          fill="#3b82f6" 
                          radius={[0, 4, 4, 0]}
                          label={{ 
                            position: 'right', 
                            formatter: (value: number) => formatResponseTime(value),
                            fill: 'var(--foreground)',
                            fontSize: 12
                          }} 
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="incidents" className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium">Incident Trends</CardTitle>
                <CardDescription>Historical incident data analysis</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-96 p-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={incidentData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'var(--background)', 
                          borderColor: 'var(--border)',
                          borderRadius: '8px',
                        }} 
                      />
                      <Legend />
                      <Line type="monotone" dataKey="incidents" name="Incidents" stroke="#0284c7" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                      <Line type="monotone" dataKey="alerts" name="Alerts" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium">Geographic Distribution</CardTitle>
                  <CardDescription>Incident hotspots by location</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-muted rounded-md">
                    <p className="text-muted-foreground">Map visualization placeholder</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium">Resolution Metrics</CardTitle>
                  <CardDescription>Average resolution time by incident type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: 'Flooding', time: 48.5 },
                          { name: 'Fire', time: 24.2 },
                          { name: 'Power Outage', time: 36.8 },
                          { name: 'Gas Leak', time: 18.6 },
                          { name: 'Traffic', time: 12.4 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => `${value} hours`} />
                        <Bar dataKey="time" name="Resolution Time" fill="#8884d8" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="resources" className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium">Resource Allocation</CardTitle>
                <CardDescription>Current resource usage statistics</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-96 p-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={resourceUsageData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'var(--background)', 
                          borderColor: 'var(--border)',
                          borderRadius: '8px',
                        }} 
                      />
                      <Legend />
                      <Bar dataKey="allocated" name="Allocated" fill="#3b82f6" radius={[4, 0, 0, 4]} />
                      <Bar dataKey="consumed" name="Consumed" fill="#f59e0b" />
                      <Bar dataKey="remaining" name="Remaining" fill="#10b981" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium">Resource Efficiency</CardTitle>
                  <CardDescription>Utilization rates by resource type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={[
                          { month: 'Jan', water: 65, medical: 78, food: 82, shelter: 45 },
                          { month: 'Feb', water: 70, medical: 82, food: 78, shelter: 50 },
                          { month: 'Mar', water: 75, medical: 85, food: 83, shelter: 60 },
                          { month: 'Apr', water: 72, medical: 88, food: 85, shelter: 65 },
                          { month: 'May', water: 78, medical: 90, food: 87, shelter: 70 },
                          { month: 'Jun', water: 85, medical: 92, food: 89, shelter: 75 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                        <XAxis dataKey="month" />
                        <YAxis unit="%" />
                        <Tooltip formatter={(value) => `${value}%`} />
                        <Legend />
                        <Line type="monotone" dataKey="water" name="Water" stroke="#3b82f6" strokeWidth={2} />
                        <Line type="monotone" dataKey="medical" name="Medical" stroke="#ef4444" strokeWidth={2} />
                        <Line type="monotone" dataKey="food" name="Food" stroke="#f59e0b" strokeWidth={2} />
                        <Line type="monotone" dataKey="shelter" name="Shelter" stroke="#10b981" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium">Cost Analysis</CardTitle>
                  <CardDescription>Resource expenditure breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Water', value: 25 },
                            { name: 'Medical', value: 35 },
                            { name: 'Food', value: 20 },
                            { name: 'Shelter', value: 15 },
                            { name: 'Transport', value: 5 },
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={2}
                          dataKey="value"
                          label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {incidentTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="response" className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium">Response Performance</CardTitle>
                <CardDescription>Key response metrics over time</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-96 p-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { month: 'Jan', responseTime: 15.2, deploymentRate: 82, resolutionTime: 72 },
                        { month: 'Feb', responseTime: 14.8, deploymentRate: 84, resolutionTime: 68 },
                        { month: 'Mar', responseTime: 13.5, deploymentRate: 87, resolutionTime: 65 },
                        { month: 'Apr', responseTime: 12.8, deploymentRate: 89, resolutionTime: 61 },
                        { month: 'May', responseTime: 11.6, deploymentRate: 92, resolutionTime: 58 },
                        { month: 'Jun', responseTime: 10.2, deploymentRate: 94, resolutionTime: 52 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" unit="%" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'var(--background)', 
                          borderColor: 'var(--border)',
                          borderRadius: '8px',
                        }} 
                        formatter={(value, name) => [
                          name === 'responseTime' ? `${value} min` : 
                          name === 'resolutionTime' ? `${value} hrs` : 
                          `${value}%`, 
                          name === 'responseTime' ? 'Response Time' : 
                          name === 'deploymentRate' ? 'Deployment Rate' : 
                          'Resolution Time'
                        ]}
                      />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="responseTime" name="Response Time" stroke="#3b82f6" strokeWidth={2} />
                      <Line yAxisId="right" type="monotone" dataKey="deploymentRate" name="Deployment Rate" stroke="#f59e0b" strokeWidth={2} />
                      <Line yAxisId="left" type="monotone" dataKey="resolutionTime" name="Resolution Time" stroke="#10b981" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium">Team Performance</CardTitle>
                  <CardDescription>Response efficiency by team</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: 'Team Alpha', efficiency: 92, incidents: 48 },
                          { name: 'Team Bravo', efficiency: 88, incidents: 36 },
                          { name: 'Team Charlie', efficiency: 85, incidents: 42 },
                          { name: 'Team Delta', efficiency: 90, incidents: 30 },
                          { name: 'Team Echo', efficiency: 82, incidents: 25 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" orientation="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'var(--background)', 
                            borderColor: 'var(--border)',
                            borderRadius: '8px',
                          }} 
                          formatter={(value, name) => [
                            name === 'efficiency' ? `${value}%` : value, 
                            name === 'efficiency' ? 'Efficiency Rating' : 'Incidents Handled'
                          ]}
                        />
                        <Legend />
                        <Bar yAxisId="left" dataKey="efficiency" name="Efficiency Rating" fill="#8884d8" radius={[4, 4, 0, 0]} />
                        <Bar yAxisId="right" dataKey="incidents" name="Incidents Handled" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium">Critical Metrics</CardTitle>
                  <CardDescription>Key performance indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-amber-500" />
                          <div className="text-sm font-medium">Avg. Response Time</div>
                        </div>
                        <div className="text-sm font-medium">10.2 minutes</div>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-amber-500 h-full rounded-full" style={{ width: '85%' }}></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <div>Target: 12 minutes</div>
                        <div className="text-amber-500">15% better than target</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-green-500" />
                          <div className="text-sm font-medium">Team Deployment Rate</div>
                        </div>
                        <div className="text-sm font-medium">94%</div>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full rounded-full" style={{ width: '94%' }}></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <div>Target: 90%</div>
                        <div className="text-green-500">4% better than target</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Truck className="h-4 w-4 text-blue-500" />
                          <div className="text-sm font-medium">Resource Delivery Time</div>
                        </div>
                        <div className="text-sm font-medium">28 minutes</div>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full rounded-full" style={{ width: '80%' }}></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <div>Target: 25 minutes</div>
                        <div className="text-red-500">12% worse than target</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
}

export default AnalyticsPage;
