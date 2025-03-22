
import { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent
} from '@/components/ui/card';
import { 
  Cloud, 
  CloudLightning, 
  CloudRain, 
  Snowflake, 
  Sun, 
  Wind,
  Droplets
} from 'lucide-react';
import { cn } from '@/lib/utils';

type WeatherCondition = 'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'snowy' | 'windy';

interface WeatherData {
  condition: WeatherCondition;
  temperature: number;
  humidity: number;
  wind: number;
  precipitation: number;
  alert?: string;
}

const mockWeatherData: WeatherData = {
  condition: 'rainy',
  temperature: 15,
  humidity: 85,
  wind: 12,
  precipitation: 70,
  alert: 'Heavy rain expected in the next 12 hours. Potential flash flooding in low-lying areas.',
};

const getWeatherIcon = (condition: WeatherCondition) => {
  switch (condition) {
    case 'sunny':
      return <Sun className="w-8 h-8 text-amber-500" />;
    case 'cloudy':
      return <Cloud className="w-8 h-8 text-gray-500" />;
    case 'rainy':
      return <CloudRain className="w-8 h-8 text-blue-500" />;
    case 'stormy':
      return <CloudLightning className="w-8 h-8 text-purple-500" />;
    case 'snowy':
      return <Snowflake className="w-8 h-8 text-blue-300" />;
    case 'windy':
      return <Wind className="w-8 h-8 text-gray-500" />;
  }
};

export function WeatherAlert() {
  const [weather, setWeather] = useState<WeatherData>(mockWeatherData);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <Card className={cn(
      "overflow-hidden",
      weather.condition === 'rainy' && "bg-gradient-to-br from-blue-50 to-gray-50 dark:from-blue-950/30 dark:to-gray-950/50",
      weather.condition === 'stormy' && "bg-gradient-to-br from-purple-50 to-gray-50 dark:from-purple-950/30 dark:to-gray-950/50",
      weather.condition === 'sunny' && "bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/50",
      weather.condition === 'cloudy' && "bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-950/30 dark:to-slate-950/50",
      weather.condition === 'snowy' && "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/50",
      weather.condition === 'windy' && "bg-gradient-to-br from-cyan-50 to-gray-50 dark:from-cyan-950/30 dark:to-gray-950/50",
    )}>
      <CardContent className="p-6 text-foreground">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              {getWeatherIcon(weather.condition)}
              <span className="text-2xl font-semibold">
                {weather.temperature}°C
              </span>
            </div>
            <p className="text-sm text-muted-foreground capitalize">
              {weather.condition} conditions
            </p>
            <p className="text-xs text-muted-foreground">
              {currentTime.toLocaleDateString()} · {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
          
          <div className="flex space-x-4 text-xs">
            <div className="flex flex-col items-center">
              <Droplets className="w-4 h-4 mb-1 text-blue-500" />
              <span className="font-medium">{weather.humidity}%</span>
              <span className="text-muted-foreground">Humidity</span>
            </div>
            <div className="flex flex-col items-center">
              <Wind className="w-4 h-4 mb-1 text-gray-500" />
              <span className="font-medium">{weather.wind} km/h</span>
              <span className="text-muted-foreground">Wind</span>
            </div>
            <div className="flex flex-col items-center">
              <CloudRain className="w-4 h-4 mb-1 text-blue-500" />
              <span className="font-medium">{weather.precipitation}%</span>
              <span className="text-muted-foreground">Rain</span>
            </div>
          </div>
        </div>
        
        {weather.alert && (
          <div className="mt-4 p-2.5 rounded-md bg-yellow-100/80 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/30 text-sm">
            <div className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-600 dark:text-yellow-500 mr-2 mt-0.5"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
              <p className="text-yellow-800 dark:text-yellow-200">{weather.alert}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default WeatherAlert;
