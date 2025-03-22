
export type AlertLevel = 'critical' | 'warning' | 'info' | 'resolved';

export interface Alert {
  id: string;
  title: string;
  description: string;
  level: AlertLevel;
  location: string;
  timestamp: string;
  isNew?: boolean;
}
