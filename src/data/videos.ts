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
  {
    id: "2",
    youtubeId: "ApVCy1HLN_Q",
    title: "Douglas County Athlete Story",
    description: "Follow the journey of a Douglas County athlete as they build their future beyond the game with Brand of a Champion.",
    category: "athlete-stories",
    duration: "3:00",
  },
  {
    id: "3",
    youtubeId: "CifVIQKwWD8",
    title: "Douglas County Athlete Story",
    description: "Follow the journey of a Douglas County athlete as they build their future beyond the game with Brand of a Champion.",
    category: "athlete-stories",
    duration: "3:00",
  },
  {
    id: "4",
    youtubeId: "3EKRTqDWj84",
    title: "Douglas County Athlete Story",
    description: "Follow the journey of a Douglas County athlete as they build their future beyond the game with Brand of a Champion.",
    category: "athlete-stories",
    duration: "3:00",
  },
  {
    id: "5",
    youtubeId: "ATploDcl6J4",
    title: "Douglas County Athlete Story",
    description: "Follow the journey of a Douglas County athlete as they build their future beyond the game with Brand of a Champion.",
    category: "athlete-stories",
    duration: "3:00",
  },
  {
    id: "6",
    youtubeId: "D188JyJHQyY",
    title: "Douglas County Athlete Story",
    description: "Follow the journey of a Douglas County athlete as they build their future beyond the game with Brand of a Champion.",
    category: "athlete-stories",
    duration: "3:00",
  },
  {
    id: "7",
    youtubeId: "fGJ-fRUC_tA",
    title: "Douglas County Athlete Story",
    description: "Follow the journey of a Douglas County athlete as they build their future beyond the game with Brand of a Champion.",
    category: "athlete-stories",
    duration: "3:00",
  },
  {
    id: "8",
    youtubeId: "SDgzcTqDcvs",
    title: "Douglas County Athlete Story",
    description: "Follow the journey of a Douglas County athlete as they build their future beyond the game with Brand of a Champion.",
    category: "athlete-stories",
    duration: "3:00",
  },
  {
    id: "9",
    youtubeId: "MAWJT-OJCYY",
    title: "Douglas County Athlete Story",
    description: "Follow the journey of a Douglas County athlete as they build their future beyond the game with Brand of a Champion.",
    category: "athlete-stories",
    duration: "3:00",
  },
];

export const categories = [
  { id: "all", label: "All Videos" },
  { id: "athlete-stories", label: "Athlete Stories" },
  { id: "behind-scenes", label: "Behind the Scenes" },
  { id: "success-stories", label: "Success Stories" },
  { id: "educational", label: "Educational" },
];
