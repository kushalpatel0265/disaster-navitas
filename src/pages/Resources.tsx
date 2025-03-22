
import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Package, 
  Droplet, 
  Pill, 
  Utensils, 
  Tent, 
  Shirt, 
  Battery, 
  Truck,
  MoreVertical,
  ArrowUpDown
} from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

type ResourceCategory = 'all' | 'water' | 'medical' | 'food' | 'shelter' | 'clothing' | 'power' | 'transport';

interface ResourceItem {
  id: string;
  name: string;
  category: ResourceCategory;
  quantity: number;
  unit: string;
  location: string;
  expiryDate?: string;
  status: 'adequate' | 'low' | 'critical';
  lastUpdated: string;
}

const resourceData: ResourceItem[] = [
  {
    id: 'RES-001',
    name: 'Bottled Water',
    category: 'water',
    quantity: 5600,
    unit: 'bottles',
    location: 'Main Warehouse',
    expiryDate: '2025-12-31',
    status: 'adequate',
    lastUpdated: '3 hours ago',
  },
  {
    id: 'RES-002',
    name: 'First Aid Kits',
    category: 'medical',
    quantity: 320,
    unit: 'kits',
    location: 'Medical Bay A',
    expiryDate: '2024-06-15',
    status: 'low',
    lastUpdated: '1 day ago',
  },
  {
    id: 'RES-003',
    name: 'MRE Packages',
    category: 'food',
    quantity: 1200,
    unit: 'packs',
    location: 'Food Storage C',
    expiryDate: '2024-09-30',
    status: 'low',
    lastUpdated: '2 days ago',
  },
  {
    id: 'RES-004',
    name: 'Emergency Tents',
    category: 'shelter',
    quantity: 45,
    unit: 'units',
    location: 'Storage Bay D',
    status: 'adequate',
    lastUpdated: '1 week ago',
  },
  {
    id: 'RES-005',
    name: 'Blankets',
    category: 'clothing',
    quantity: 180,
    unit: 'pieces',
    location: 'Storage Bay B',
    status: 'critical',
    lastUpdated: '5 days ago',
  },
  {
    id: 'RES-006',
    name: 'Portable Generators',
    category: 'power',
    quantity: 12,
    unit: 'units',
    location: 'Equipment Shed A',
    status: 'low',
    lastUpdated: '2 weeks ago',
  },
  {
    id: 'RES-007',
    name: 'Emergency Vehicles',
    category: 'transport',
    quantity: 8,
    unit: 'vehicles',
    location: 'Garage',
    status: 'adequate',
    lastUpdated: '3 days ago',
  },
  {
    id: 'RES-008',
    name: 'Antibiotics',
    category: 'medical',
    quantity: 250,
    unit: 'boxes',
    location: 'Medical Storage',
    expiryDate: '2024-08-15',
    status: 'critical',
    lastUpdated: '1 day ago',
  },
];

const getCategoryIcon = (category: ResourceCategory) => {
  switch (category) {
    case 'water':
      return <Droplet className="w-4 h-4 text-blue-500" />;
    case 'medical':
      return <Pill className="w-4 h-4 text-red-500" />;
    case 'food':
      return <Utensils className="w-4 h-4 text-amber-500" />;
    case 'shelter':
      return <Tent className="w-4 h-4 text-green-500" />;
    case 'clothing':
      return <Shirt className="w-4 h-4 text-purple-500" />;
    case 'power':
      return <Battery className="w-4 h-4 text-yellow-500" />;
    case 'transport':
      return <Truck className="w-4 h-4 text-gray-500" />;
    default:
      return <Package className="w-4 h-4 text-gray-500" />;
  }
};

const getStatusBadge = (status: 'adequate' | 'low' | 'critical') => {
  switch (status) {
    case 'adequate':
      return (
        <Badge variant="outline" className="border-green-500 text-green-500">
          Adequate
        </Badge>
      );
    case 'low':
      return (
        <Badge variant="outline" className="border-amber-500 text-amber-500">
          Low
        </Badge>
      );
    case 'critical':
      return (
        <Badge variant="destructive">
          Critical
        </Badge>
      );
  }
};

const ResourcesPage = () => {
  const [activeCategory, setActiveCategory] = useState<ResourceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredResources = resourceData
    .filter(resource => 
      activeCategory === 'all' || resource.category === activeCategory
    )
    .filter(resource => 
      resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <PageLayout>
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Resources</h2>
          <p className="text-muted-foreground">
            Manage and track emergency resources and supplies
          </p>
        </div>
        <Button className="hidden sm:flex items-center gap-2">
          <Plus size={16} className="mr-1" />
          <span>Add Resource</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-9 space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search resources..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button variant="outline" size="icon" className="h-10 w-10">
                <Filter className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-10">
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    <span>Sort</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuItem>Name (A-Z)</DropdownMenuItem>
                  <DropdownMenuItem>Name (Z-A)</DropdownMenuItem>
                  <DropdownMenuItem>Quantity (High-Low)</DropdownMenuItem>
                  <DropdownMenuItem>Quantity (Low-High)</DropdownMenuItem>
                  <DropdownMenuItem>Status (Critical First)</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button className="sm:hidden">
                <Plus className="h-4 w-4 mr-2" />
                <span>Add</span>
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="all" className="w-full" onValueChange={(value) => setActiveCategory(value as ResourceCategory)}>
            <TabsList className="grid grid-cols-4 md:grid-cols-8 h-auto p-1">
              <TabsTrigger value="all" className="py-2 text-xs">All</TabsTrigger>
              <TabsTrigger value="water" className="py-2 text-xs">Water</TabsTrigger>
              <TabsTrigger value="medical" className="py-2 text-xs">Medical</TabsTrigger>
              <TabsTrigger value="food" className="py-2 text-xs">Food</TabsTrigger>
              <TabsTrigger value="shelter" className="py-2 text-xs">Shelter</TabsTrigger>
              <TabsTrigger value="clothing" className="py-2 text-xs">Clothing</TabsTrigger>
              <TabsTrigger value="power" className="py-2 text-xs">Power</TabsTrigger>
              <TabsTrigger value="transport" className="py-2 text-xs">Transport</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeCategory} className="mt-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium">Resource Inventory</CardTitle>
                  <CardDescription>
                    {activeCategory === 'all' 
                      ? 'All resources in inventory' 
                      : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} resources`
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  {filteredResources.length === 0 ? (
                    <div className="px-6 py-8 text-center text-muted-foreground">
                      No resources found for the selected category or search query
                    </div>
                  ) : (
                    <div className="border-t border-border">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Resource</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Quantity</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">Location</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Expiry</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {filteredResources.map((resource) => (
                            <tr 
                              key={resource.id}
                              className="hover:bg-muted/50 transition-colors"
                            >
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="p-1.5 rounded-md bg-muted mr-3">
                                    {getCategoryIcon(resource.category)}
                                  </div>
                                  <div>
                                    <div className="font-medium text-sm">{resource.name}</div>
                                    <div className="text-xs text-muted-foreground">{resource.id}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm">{resource.quantity.toLocaleString()} {resource.unit}</div>
                                <div className="mt-1 w-24">
                                  <Progress 
                                    value={
                                      resource.status === 'adequate' ? 80 :
                                      resource.status === 'low' ? 40 : 15
                                    } 
                                    className={cn(
                                      "h-1.5",
                                      resource.status === 'adequate' && "text-green-500",
                                      resource.status === 'low' && "text-amber-500",
                                      resource.status === 'critical' && "text-red-500"
                                    )}
                                  />
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                                <div className="text-sm">{resource.location}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                                <div className="text-sm">
                                  {resource.expiryDate 
                                    ? new Date(resource.expiryDate).toLocaleDateString() 
                                    : 'N/A'
                                  }
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {getStatusBadge(resource.status)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end" className="w-[160px]">
                                    <DropdownMenuItem>View details</DropdownMenuItem>
                                    <DropdownMenuItem>Update quantity</DropdownMenuItem>
                                    <DropdownMenuItem>Move location</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Resource Summary</CardTitle>
              <CardDescription>Quick status overview</CardDescription>
            </CardHeader>
            <CardContent className="pb-6">
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium mb-2">Critical Resources</h4>
                  <div className="space-y-3">
                    {resourceData
                      .filter(resource => resource.status === 'critical')
                      .map(resource => (
                        <div key={resource.id} className="flex items-center justify-between p-2 rounded-md bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20">
                          <div className="flex items-center">
                            {getCategoryIcon(resource.category)}
                            <span className="ml-2 text-sm font-medium">{resource.name}</span>
                          </div>
                          <Badge variant="destructive">
                            {resource.quantity.toLocaleString()} {resource.unit}
                          </Badge>
                        </div>
                      ))
                    }
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-sm font-medium mb-2">Quick Actions</h4>
                  <div className="space-y-2">
                    <Button className="w-full justify-start" variant="outline">
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Resource
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <span className="mr-2">📦</span>
                      Request Supplies
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <span className="mr-2">🔄</span>
                      Update Inventory
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <span className="mr-2">📊</span>
                      Generate Report
                    </Button>
                  </div>
                </div>
                
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-3">Category Distribution</h4>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center">
                          <Droplet className="w-3 h-3 text-blue-500 mr-1" />
                          Water
                        </span>
                        <span>20%</span>
                      </div>
                      <Progress value={20} className="h-1 text-blue-500" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center">
                          <Pill className="w-3 h-3 text-red-500 mr-1" />
                          Medical
                        </span>
                        <span>15%</span>
                      </div>
                      <Progress value={15} className="h-1 text-red-500" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center">
                          <Utensils className="w-3 h-3 text-amber-500 mr-1" />
                          Food
                        </span>
                        <span>25%</span>
                      </div>
                      <Progress value={25} className="h-1 text-amber-500" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center">
                          <Tent className="w-3 h-3 text-green-500 mr-1" />
                          Shelter
                        </span>
                        <span>12%</span>
                      </div>
                      <Progress value={12} className="h-1 text-green-500" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center">
                          <Shirt className="w-3 h-3 text-purple-500 mr-1" />
                          Clothing
                        </span>
                        <span>18%</span>
                      </div>
                      <Progress value={18} className="h-1 text-purple-500" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center">
                          <Battery className="w-3 h-3 text-yellow-500 mr-1" />
                          Power
                        </span>
                        <span>5%</span>
                      </div>
                      <Progress value={5} className="h-1 text-yellow-500" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center">
                          <Truck className="w-3 h-3 text-gray-500 mr-1" />
                          Transport
                        </span>
                        <span>8%</span>
                      </div>
                      <Progress value={8} className="h-1 text-gray-500" />
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
};

export default ResourcesPage;
