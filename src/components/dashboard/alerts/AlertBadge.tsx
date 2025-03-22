
import { Badge } from '@/components/ui/badge';
import { AlertLevel } from './types';

interface AlertBadgeProps {
  level: AlertLevel;
}

export function AlertBadge({ level }: AlertBadgeProps) {
  switch (level) {
    case 'critical':
      return (
        <Badge variant="destructive" className="bg-red-500 text-white">
          Critical
        </Badge>
      );
    case 'warning':
      return (
        <Badge className="bg-amber-500 text-white">
          Warning
        </Badge>
      );
    case 'info':
      return (
        <Badge variant="outline" className="text-blue-500 border-blue-500">
          Info
        </Badge>
      );
    case 'resolved':
      return (
        <Badge variant="outline" className="text-green-500 border-green-500">
          Resolved
        </Badge>
      );
  }
}
