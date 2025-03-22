
import { Alert } from './types';

export const alerts: Alert[] = [
  {
    id: '1',
    title: 'Flood Warning',
    description: 'Flash flooding reported in downtown area. Evacuation recommended.',
    level: 'critical',
    location: 'Downtown, West Area',
    timestamp: '3 mins ago',
    isNew: true,
  },
  {
    id: '2',
    title: 'Weather Alert',
    description: 'Severe thunderstorm approaching. Expected arrival in 30 minutes.',
    level: 'warning',
    location: 'North County',
    timestamp: '15 mins ago',
  },
  {
    id: '3',
    title: 'Power Outage',
    description: 'Scheduled maintenance causing power disruption in selected areas.',
    level: 'info',
    location: 'East District',
    timestamp: '1 hour ago',
  },
  {
    id: '4',
    title: 'Road Closure',
    description: 'Highway 101 reopened after accident cleanup completed.',
    level: 'resolved',
    location: 'South Highway',
    timestamp: '2 hours ago',
  },
];
