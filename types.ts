import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  path: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  links: string[];
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  image?: string;
  url?: string;
  source: string; // Made required
}

export interface EventItem {
  id: number;
  day: number;
  month: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  description: string;
  organizer: string;
  contact: string;
  coordinates: [number, number];
  image?: string;
}

export interface Department {
  name: string;
  head: string;
  phone: string;
  email: string;
  description: string;
}

export interface HistoryItem {
  year: string;
  title: string;
  description: string;
  image?: string;
}

export interface DestinationItem {
  id: string;
  name: string;
  type: 'Park' | 'Beach' | 'Museum' | 'Landmark';
  description: string;
  address: string;
  coordinates: [number, number];
  features: string[];
  nearbyDining: { name: string; type: string; distance: string }[];
  image: string;
}

export interface EmergencyFacility {
  name: string;
  type: 'Hospital' | 'Police' | 'Fire';
  address: string;
  phone: string;
  coordinates: [number, number];
  description: string;
}