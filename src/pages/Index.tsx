
import { 
  Package, 
  Users, 
  AlertTriangle, 
  Truck, 
  ArrowRight, 
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/layout/PageLayout';
import StatCard from '@/components/dashboard/StatCard';
import RecentAlerts from '@/components/dashboard/RecentAlerts';
import ResourceOverview from '@/components/dashboard/ResourceOverview';
import ActiveIncidents from '@/components/dashboard/ActiveIncidents';
import IncidentMap from '@/components/dashboard/IncidentMap';
import WeatherAlert from '@/components/dashboard/WeatherAlert';

const Dashboard = () => {
  return (
    <PageLayout>
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Overview of current emergency situations and resources
          </p>
        </div>
        <Button className="hidden sm:flex items-center gap-2 transition-all">
          <Zap size={16} className="mr-1" />
          <span>Emergency Response</span>
          <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="Available Resources" 
          value="7,342"
          trend={{ value: 2.5, isPositive: true }}
          icon={<Package size={18} />}
          variant="primary"
        />
        <StatCard 
          title="Responders On Duty" 
          value="138"
          trend={{ value: 12, isPositive: true }}
          icon={<Users size={18} />}
          variant="secondary"
        />
        <StatCard 
          title="Active Alerts" 
          value="17"
          trend={{ value: 5, isPositive: false }}
          icon={<AlertTriangle size={18} />}
          variant="tertiary"
        />
        <StatCard 
          title="Deployed Vehicles" 
          value="42"
          trend={{ value: 8, isPositive: true }}
          icon={<Truck size={18} />}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <IncidentMap />
        </div>
        <div>
          <WeatherAlert />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentAlerts />
        <div className="grid grid-cols-1 gap-6">
          <ResourceOverview />
          <ActiveIncidents />
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
