
import { useEffect, useRef, useState } from 'react';
import * as radar from 'radar-sdk-js';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Radar publishable key
const RADAR_PUBLISHABLE_KEY = "prj_test_pk_8df728385a37cc76fcf0f1ed2cae13e7fddcf086";

interface MapPoint {
  lat: number;
  lng: number;
  type: 'incident' | 'team' | 'resource';
  title: string;
  status?: string;
}

const dummyMapPoints: MapPoint[] = [
  { 
    lat: 34.052235, 
    lng: -118.243683, 
    type: 'incident', 
    title: 'Downtown Flooding', 
    status: 'critical'
  },
  { 
    lat: 34.064545, 
    lng: -118.272781, 
    type: 'team', 
    title: 'Rescue Team Alpha'
  },
  { 
    lat: 34.032778, 
    lng: -118.252243, 
    type: 'resource', 
    title: 'Medical Supply Cache'
  },
  { 
    lat: 34.078899, 
    lng: -118.212156, 
    type: 'incident', 
    title: 'Gas Leak', 
    status: 'responding'
  },
  { 
    lat: 34.041789, 
    lng: -118.299564, 
    type: 'team', 
    title: 'Engineering Crew'
  },
];

export function IncidentMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [mapView, setMapView] = useState<'satellite' | 'street'>('street');
  const mapRef = useRef<any>(null);
  
  // Initialize Radar map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    
    // Initialize Radar SDK
    radar.initialize(RADAR_PUBLISHABLE_KEY);
    
    const loadMap = async () => {
      try {
        // Get map context from Radar
        await new Promise<void>((resolve, reject) => {
          radar.getContext({
            layers: ['map'],
            callback: function(err, result) {
              if (err) {
                reject(err);
                return;
              }
              
              // If we got map data, we can consider it loaded
              resolve();
              setLoading(false);
            }
          });
        });
      } catch (error) {
        console.error('Error loading Radar map:', error);
        // Still mark as loaded even if there's an error
        setLoading(false);
      }
    };
    
    loadMap();
    
    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-medium">Incident Map</CardTitle>
            <CardDescription>Real-time incident tracking</CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              variant={mapView === 'street' ? 'default' : 'outline'} 
              className="h-8 px-3"
              onClick={() => setMapView('street')}
            >
              Street
            </Button>
            <Button 
              size="sm" 
              variant={mapView === 'satellite' ? 'default' : 'outline'} 
              className="h-8 px-3"
              onClick={() => setMapView('satellite')}
            >
              Satellite
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-3">
        <div className="rounded-md overflow-hidden border border-border h-[400px] relative">
          {loading ? (
            <div className="absolute inset-0 bg-muted flex items-center justify-center">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-muted-foreground/20 mb-3"></div>
                <div className="h-4 w-24 bg-muted-foreground/20 rounded"></div>
              </div>
            </div>
          ) : (
            <>
              <div 
                ref={mapContainerRef} 
                className="w-full h-full relative"
              >
                {/* Static map background as fallback */}
                <div className={cn(
                  "absolute inset-0 bg-center bg-cover transition-opacity duration-500",
                  mapView === 'street' 
                    ? "bg-[url('https://assets.radar.com/images/maps-preview.png')] opacity-100" 
                    : "bg-[url('https://assets.radar.com/images/maps-satellite-preview.png')] opacity-100"
                )} />
                
                {/* Dots on the map - in a real implementation this would be handled by the map API */}
                <div className="relative h-full w-full">
                  {dummyMapPoints.map((point, idx) => {
                    // Convert lat/lng to approximate screen coordinates (this is just for illustration)
                    const left = ((point.lng + 118.3) / 0.15) * 100;
                    const top = (-(point.lat - 34.1) / 0.15) * 100;
                    
                    return (
                      <div 
                        key={idx}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 group"
                        style={{ left: `${left}%`, top: `${top}%` }}
                      >
                        <div 
                          className={cn(
                            "w-4 h-4 rounded-full border-2 border-white shadow-md cursor-pointer",
                            point.type === 'incident' && (
                              point.status === 'critical' ? "bg-red-500 animate-pulse" : "bg-amber-500"
                            ),
                            point.type === 'team' && "bg-green-500",
                            point.type === 'resource' && "bg-blue-500"
                          )}
                        >
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-black/80 text-white rounded px-2 py-1 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            {point.title}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="absolute bottom-3 left-3 bg-background/80 backdrop-blur-sm rounded-md border border-border p-2 text-xs">
                <div className="flex flex-col space-y-1.5">
                  <div className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                    <span>Critical Incident</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-amber-500 mr-2"></span>
                    <span>Active Incident</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                    <span>Response Team</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                    <span>Resource Cache</span>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-3 right-3 space-y-2">
                <Button size="icon" variant="outline" className="bg-background/80 backdrop-blur-sm h-8 w-8">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                </Button>
                <Button size="icon" variant="outline" className="bg-background/80 backdrop-blur-sm h-8 w-8">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                </Button>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default IncidentMap;
