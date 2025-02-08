export interface Channel {
    id: string;
    name: string;
    description: string;
    subscriberCount: number;
    videoCount: number;
    thumbnailUrl: string;
    category: string;
    lastVideoDate: string;
    postFrequency: 'high' | 'medium' | 'low';
    isSelected?: boolean;
  }
  
  export type FilterOptions = {
    category: string | null;
    postFrequency: string | null;
    searchQuery: string;
  };