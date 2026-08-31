import React, { useEffect, useState } from 'react';
import { APIProvider, Map, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { MapPin } from 'lucide-react';

const origin = { lat: 28.7041, lng: 77.1025 }; // New Delhi
const destination = { lat: 28.5355, lng: 77.3910 }; // Noida

function DeliveryRoute({ apiKey }: { apiKey: string }) {
  const map = useMap();
  const geometryLibrary = useMapsLibrary('geometry');
  const [polyline, setPolyline] = useState<google.maps.Polyline | null>(null);

  useEffect(() => {
    if (!map || !geometryLibrary) return;

    const fetchRoute = async () => {
      try {
        const response = await fetch('/api/proxy/routes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            apiKey,
            routeRequest: {
              origin: { location: { latLng: { latitude: origin.lat, longitude: origin.lng } } },
              destination: { location: { latLng: { latitude: destination.lat, longitude: destination.lng } } },
              travelMode: 'DRIVING'
            }
          })
        });
        const data = await response.json();
        
        if (data.routes && data.routes.length > 0) {
          const encodedPolyline = data.routes[0].polyline.encodedPolyline;
          const path = geometryLibrary.encoding.decodePath(encodedPolyline);
          
          const newPolyline = new google.maps.Polyline({
            path,
            strokeColor: '#3b82f6',
            strokeOpacity: 0.8,
            strokeWeight: 6,
            map: map
          });
          
          setPolyline(newPolyline);
          
          // Fit bounds
          const bounds = new google.maps.LatLngBounds();
          path.forEach((p) => bounds.extend(p));
          map.fitBounds(bounds, 40);
        }
      } catch (err) {
        console.error("Failed to load route", err);
      }
    };
    
    fetchRoute();
    
    return () => {
      if (polyline) {
        polyline.setMap(null);
      }
    };
  }, [map, geometryLibrary, apiKey]);

  return null;
}

export default function DeliveryMap() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="relative w-full h-[400px] rounded-3xl bg-indigo-50 dark:bg-slate-900 overflow-hidden border border-indigo-100 dark:border-slate-800 flex items-center justify-center shadow-sm">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #6366f1 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        
        {/* Route line */}
        <div className="absolute top-1/2 left-1/4 right-1/4 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full -translate-y-1/2 overflow-hidden">
          <div className="h-full bg-indigo-500 transition-all duration-1000 animate-pulse" style={{ width: `70%` }}></div>
        </div>
        
        {/* Pins */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center border-2 border-indigo-500 z-10">
            <MapPin className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="mt-2 text-xs font-bold text-slate-700 dark:text-slate-300 bg-white/80 dark:bg-slate-900/80 px-2 py-1 rounded-md backdrop-blur-sm shadow-sm">Warehouse</div>
        </div>

        <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 z-10 transition-colors bg-white border-slate-300 text-slate-400 dark:bg-slate-800 dark:border-slate-600`}>
            <MapPin className="w-5 h-5" />
          </div>
          <div className="mt-2 text-xs font-bold text-slate-700 dark:text-slate-300 bg-white/80 dark:bg-slate-900/80 px-2 py-1 rounded-md backdrop-blur-sm shadow-sm">Destination</div>
        </div>

        {/* Info */}
        <div className="absolute bottom-6 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 max-w-sm text-center mx-4">
          <h3 className="font-bold text-slate-800 dark:text-white flex items-center justify-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
            </span>
            Live GPS Simulation
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
            Please add your <code className="bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded text-indigo-500">VITE_GOOGLE_MAPS_API_KEY</code> to the AI Studio Secrets panel to unlock actual Google Maps routing.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[400px] rounded-3xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700">
      <APIProvider apiKey={apiKey}>
        <Map
          defaultZoom={10}
          defaultCenter={origin}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
          mapId="DEMO_MAP_ID"
          internalUsageAttributionIds={["gmp_mcp_codeassist_v1_aistudio"]}
        >
          <DeliveryRoute apiKey={apiKey} />
        </Map>
      </APIProvider>
    </div>
  );
}
