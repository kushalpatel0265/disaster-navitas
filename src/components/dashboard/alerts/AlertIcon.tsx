
import { AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { AlertLevel } from './types';

interface AlertIconProps {
  level: AlertLevel;
}

export function AlertIcon({ level }: AlertIconProps) {
  switch (level) {
    case 'critical':
      return <AlertTriangle className="w-5 h-5 text-red-500" />;
    case 'warning':
      return <AlertTriangle className="w-5 h-5 text-amber-500" />;
    case 'info':
      return <Info className="w-5 h-5 text-blue-500" />;
    case 'resolved':
      return <CheckCircle className="w-5 h-5 text-green-500" />;
  }
}
