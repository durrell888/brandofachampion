export interface Video {
  id: string;
  youtubeId: string;
  title: string;
  description: string;
  category: 'athlete-stories' | 'behind-scenes' | 'success-stories' | 'educational';
  duration: string;
  featured?: boolean;
}

export const videos: Video[] = [
  {
    id: "1",
    youtubeId: "FF1og_pLkmA",
    title: "Brand of a Champion - Our Mission",
    description: "Discover how Brand of a Champion is helping professional athletes build their legacy beyond the game. Watch inspiring stories of transformation and success.",
    category: "athlete-stories",
    duration: "5:32",
    featured: true,
  },
  // Add more videos here as needed
];

export const categories = [
  { id: "all", label: "All Videos" },
  { id: "athlete-stories", label: "Athlete Stories" },
  { id: "behind-scenes", label: "Behind the Scenes" },
  { id: "success-stories", label: "Success Stories" },
  { id: "educational", label: "Educational" },
];
