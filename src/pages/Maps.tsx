import { useState, useEffect, useRef } from 'react';
import { Search, Layers, MapPin, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageLayout from '@/components/layout/PageLayout';
import MapComponent from '@/components/maps/MapComponent';

interface Location {
  id: string;
  name: string;
  type: 'incident' | 'shelter' | 'resource' | 'hospital';
  coordinates: [number, number];
  status?: 'active' | 'resolved' | 'pending';
  details?: string;
}

const predefinedLocations: Location[] = [
  {
    id: 'loc-001',
    name: 'Downtown Flooding',
    type: 'incident',
    coordinates: [-118.243683, 34.052235],
    status: 'active',
    details: 'Severe flooding in downtown area affecting multiple buildings'
  },
  {
    id: 'loc-002',
    name: 'Central Hospital',
    type: 'hospital',
    coordinates: [-118.267353, 34.047321],
    details: 'Main regional hospital with emergency services'
  },
  {
    id: 'loc-003',
    name: 'Community Center Shelter',
    type: 'shelter',
    coordinates: [-118.255872, 34.060932],
    details: 'Emergency shelter with capacity for 200 people'
  },
  {
    id: 'loc-004',
    name: 'South Side Supply Cache',
    type: 'resource',
    coordinates: [-118.285872, 34.032932],
    details: 'Emergency supplies including water, food, and medical supplies'
  },
  {
    id: 'loc-005',
    name: 'Highway 10 Accident',
    type: 'incident',
    coordinates: [-118.212156, 34.078899],
    status: 'active',
    details: 'Multi-vehicle collision, traffic blocked in both directions'
  }
];

const RADAR_PUBLISHABLE_KEY = "prj_test_pk_8df728385a37cc76fcf0f1ed2cae13e7fddcf086";

function MapsPage() {
  const [locations, setLocations] = useState<Location[]>(predefinedLocations);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapViewType, setMapViewType] = useState<'all' | 'incidents' | 'resources'>('all');
  
  const filteredLocations = locations.filter(location => {
    // Filter by search query
    const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         location.details?.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by map view type
    const matchesType = mapViewType === 'all' || 
                       (mapViewType === 'incidents' && location.type === 'incident') || 
                       (mapViewType === 'resources' && (location.type === 'resource' || location.type === 'shelter' || location.type === 'hospital'));
    
    return matchesSearch && matchesType;
  });
  
  const getLocationBadge = (locationType: Location['type']) => {
    switch (locationType) {
      case 'incident':
        return <Badge className="bg-red-500">Incident</Badge>;
      case 'shelter':
        return <Badge className="bg-green-500">Shelter</Badge>;
      case 'resource':
        return <Badge className="bg-blue-500">Resource</Badge>;
      case 'hospital':
        return <Badge className="bg-purple-500">Hospital</Badge>;
    }
  };
  
  return (
    <PageLayout padded={false}>
      <div className="flex h-[calc(100vh-4rem)]">
        <div className="flex flex-col w-full md:w-[350px] h-full border-r border-border overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold">Map Layers</h2>
            <p className="text-sm text-muted-foreground">View and manage map locations</p>
          </div>
          
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search locations..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <Tabs 
            defaultValue="all"
            value={mapViewType}
            onValueChange={(value) => setMapViewType(value as 'all' | 'incidents' | 'resources')}
            className="flex-1 flex flex-col"
          >
            <div className="px-4 py-2 border-b">
              <TabsList className="grid grid-cols-3 h-auto p-1">
                <TabsTrigger value="all" className="text-xs py-1.5">All</TabsTrigger>
                <TabsTrigger value="incidents" className="text-xs py-1.5">Incidents</TabsTrigger>
                <TabsTrigger value="resources" className="text-xs py-1.5">Resources</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="flex-1 overflow-auto p-0 m-0">
              <LocationList 
                locations={filteredLocations}
                selectedLocation={selectedLocation}
                onSelectLocation={setSelectedLocation}
                getLocationBadge={getLocationBadge}
              />
            </TabsContent>
            
            <TabsContent value="incidents" className="flex-1 overflow-auto p-0 m-0">
              <LocationList 
                locations={filteredLocations}
                selectedLocation={selectedLocation}
                onSelectLocation={setSelectedLocation}
                getLocationBadge={getLocationBadge}
              />
            </TabsContent>
            
            <TabsContent value="resources" className="flex-1 overflow-auto p-0 m-0">
              <LocationList 
                locations={filteredLocations}
                selectedLocation={selectedLocation}
                onSelectLocation={setSelectedLocation}
                getLocationBadge={getLocationBadge}
              />
            </TabsContent>
          </Tabs>
          
          <div className="p-4 border-t">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Layers size={16} />
                <Label htmlFor="show-layers">Show Layers</Label>
              </div>
              <Switch id="show-layers" defaultChecked />
            </div>
          </div>
        </div>
        
        <div className="hidden md:block flex-1 relative">
          <MapComponent 
            radarPublishableKey={RADAR_PUBLISHABLE_KEY}
            locations={locations}
            selectedLocation={selectedLocation}
            onLocationSelect={setSelectedLocation}
            onMapLoaded={() => setMapLoaded(true)}
          />
          
          {selectedLocation && (
            <div className="absolute bottom-5 left-5 w-80 bg-background/90 backdrop-blur-sm rounded-lg border border-border shadow-md">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{selectedLocation.name}</h3>
                  {getLocationBadge(selectedLocation.type)}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedLocation.details || 'No additional details available'}
                </p>
                
                <div className="flex items-center text-xs text-muted-foreground mt-2">
                  <MapPin size={12} className="mr-1" />
                  <span>
                    {selectedLocation.coordinates[1].toFixed(4)}, {selectedLocation.coordinates[0].toFixed(4)}
                  </span>
                </div>
                
                <div className="flex justify-end gap-2 mt-4">
                  {selectedLocation.type === 'incident' && (
                    <Button size="sm" variant="default">
                      Respond
                    </Button>
                  )}
                  <Button size="sm" variant="outline" onClick={() => setSelectedLocation(null)}>
                    Close
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex-1 flex items-center justify-center md:hidden">
          <div className="text-center p-6">
            <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Map View Unavailable</h3>
            <p className="text-muted-foreground">
              Please use a larger screen to view the interactive map.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

interface LocationListProps {
  locations: Location[];
  selectedLocation: Location | null;
  onSelectLocation: (location: Location) => void;
  getLocationBadge: (type: Location['type']) => React.ReactNode;
}

function LocationList({ locations, selectedLocation, onSelectLocation, getLocationBadge }: LocationListProps) {
  if (locations.length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="text-muted-foreground">No locations found</p>
      </div>
    );
  }
  
  return (
    <div className="divide-y divide-border">
      {locations.map((location) => (
        <div 
          key={location.id}
          className={`p-3 hover:bg-muted cursor-pointer ${selectedLocation?.id === location.id ? 'bg-muted' : ''}`}
          onClick={() => onSelectLocation(location)}
        >
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm">{location.name}</h3>
            {getLocationBadge(location.type)}
          </div>
          
          {location.details && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
              {location.details}
            </p>
          )}
          
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            <MapPin size={10} className="mr-1" />
            <span>
              {location.coordinates[1].toFixed(4)}, {location.coordinates[0].toFixed(4)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MapsPage;
