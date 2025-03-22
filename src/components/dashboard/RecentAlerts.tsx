
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertList } from './alerts/AlertList';
import { alerts } from './alerts/AlertData';

export function RecentAlerts() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Recent Alerts</CardTitle>
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
            View All
          </Button>
        </div>
        <CardDescription>Latest emergency notifications and updates</CardDescription>
      </CardHeader>
      
      <AlertList alerts={alerts} />
      
      <CardFooter className="px-6 py-3 bg-muted/50 flex justify-center border-t">
        <Button variant="ghost" size="sm" className="text-xs">Load more</Button>
      </CardFooter>
    </Card>
  );
}

export default RecentAlerts;
