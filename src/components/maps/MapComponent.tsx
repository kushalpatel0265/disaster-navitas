
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface Location {
  id: string;
  name: string;
  type: 'incident' | 'shelter' | 'resource' | 'hospital';
  coordinates: [number, number];
  status?: 'active' | 'resolved' | 'pending';
  details?: string;
}

interface MapComponentProps {
  mapboxToken: string;
  locations: Location[];
  selectedLocation: Location | null;
  onLocationSelect: (location: Location) => void;
  onMapLoaded?: () => void;
}

const MapComponent = ({ 
  mapboxToken, 
  locations, 
  selectedLocation, 
  onLocationSelect,
  onMapLoaded 
}: MapComponentProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<{ [key: string]: mapboxgl.Marker }>({});
  const [loaded, setLoaded] = useState(false);

  // Initialize map
  useEffect(() => {
    if (!mapboxToken || !mapContainer.current || map.current) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-118.243683, 34.052235], // Default to LA
      zoom: 11
    });

    map.current.on('load', () => {
      setLoaded(true);
      if (onMapLoaded) onMapLoaded();
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapboxToken, onMapLoaded]);

  // Handle locations and markers
  useEffect(() => {
    if (!map.current || !loaded) return;
    
    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};
    
    // Add new markers
    locations.forEach(location => {
      // Create marker element
      const markerEl = document.createElement('div');
      markerEl.className = 'marker';
      markerEl.style.width = '24px';
      markerEl.style.height = '24px';
      markerEl.style.borderRadius = '50%';
      markerEl.style.cursor = 'pointer';
      
      // Set marker color based on type
      switch (location.type) {
        case 'incident':
          markerEl.style.backgroundColor = '#ef4444'; // red
          break;
        case 'shelter':
          markerEl.style.backgroundColor = '#22c55e'; // green
          break;
        case 'resource':
          markerEl.style.backgroundColor = '#3b82f6'; // blue
          break;
        case 'hospital':
          markerEl.style.backgroundColor = '#a855f7'; // purple
          break;
      }
      
      // Add border
      markerEl.style.border = '2px solid white';
      markerEl.style.boxShadow = '0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.2)';
      
      // Add pulse effect for active incidents
      if (location.type === 'incident' && location.status === 'active') {
        markerEl.style.animation = 'pulse 1.5s infinite';
        
        // Add keyframes for pulse animation if not already present
        if (!document.getElementById('marker-pulse-animation')) {
          const style = document.createElement('style');
          style.id = 'marker-pulse-animation';
          style.innerHTML = `
            @keyframes pulse {
              0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
              70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
              100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
            }
          `;
          document.head.appendChild(style);
        }
      }
      
      // Create and add the marker
      const marker = new mapboxgl.Marker(markerEl)
        .setLngLat(location.coordinates)
        .addTo(map.current!);
        
      // Add click handler
      marker.getElement().addEventListener('click', () => {
        onLocationSelect(location);
      });
      
      // Store marker reference
      markersRef.current[location.id] = marker;
    });
    
    // If there's a selected location, center the map on it
    if (selectedLocation) {
      map.current.flyTo({
        center: selectedLocation.coordinates,
        zoom: 14,
        essential: true
      });
    }
  }, [locations, loaded, selectedLocation, onLocationSelect]);

  return (
    <div ref={mapContainer} className="w-full h-full" />
  );
};

export default MapComponent;
