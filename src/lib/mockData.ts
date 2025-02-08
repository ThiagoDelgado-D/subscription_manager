import { Channel } from './types';

export const categories = [
  'Gaming',
  'Technology',
  'Education',
  'Entertainment',
  'Music',
  'Sports',
];

export const mockChannels: Channel[] = [
  {
    id: '1',
    name: 'TechMaster Pro',
    description: 'Latest in technology and programming tutorials',
    subscriberCount: 1200000,
    videoCount: 547,
    thumbnailUrl: '/placeholder.svg',
    category: 'Technology',
    lastVideoDate: '2024-03-15',
    postFrequency: 'high',
  },
  {
    id: '2',
    name: 'Gaming Legends',
    description: 'League of Legends and other gaming content',
    subscriberCount: 890000,
    videoCount: 1232,
    thumbnailUrl: '/placeholder.svg',
    category: 'Gaming',
    lastVideoDate: '2024-03-14',
    postFrequency: 'high',
  },
  {
    id: '3',
    name: 'Learning Hub',
    description: 'Educational content for everyone',
    subscriberCount: 500000,
    videoCount: 245,
    thumbnailUrl: '/placeholder.svg',
    category: 'Education',
    lastVideoDate: '2024-03-10',
    postFrequency: 'medium',
  },
  // Agrega más canales mock aquí según necesites
];