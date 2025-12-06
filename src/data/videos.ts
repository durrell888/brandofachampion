export interface Video {
  id: string;
  youtubeId: string;
  title: string;
  description: string;
  category: 'douglas-county' | 'behind-scenes' | 'success-stories' | 'educational';
  duration: string;
  featured?: boolean;
}

export interface VideoSeries {
  id: string;
  title: string;
  description: string;
}

export const videoSeries: VideoSeries[] = [
  {
    id: "douglas-county",
    title: "Douglas County: Behind the Brand",
    description: "The changing of a program through the impact of a nonprofit named Brand of a Champion. Several top players in the state joined a life-changing organization and played football together to transform a high school that was once average. The result? Ranked as high as 18th in the country by MaxPreps, accomplishing record-setting achievements the school hadn't seen in over 60 years. They went 10-0 and won their region after 25 years. They reached the 4th round of playoffs two years in a row, finishing with a 31-8 record over three years of the program's impact. The program produced 4 All-Americans in Devin Carter, Jordan Carter, Aaron Gregory, and Joshua Sam-Epelle, along with 30 college football scholarship players in just 3 years."
  }
];

export const videos: Video[] = [
  {
    id: "1",
    youtubeId: "FF1og_pLkmA",
    title: "Douglas County: Behind the Brand - Episode 1",
    description: "The beginning of a transformation. Watch how Brand of a Champion started to change the trajectory of Douglas County football.",
    category: "douglas-county",
    duration: "5:32",
    featured: true,
  },
  {
    id: "2",
    youtubeId: "CifVIQKwWD8",
    title: "Douglas County: Behind the Brand - Episode 2",
    description: "Top players in the state come together for something bigger than football.",
    category: "douglas-county",
    duration: "3:00",
  },
  {
    id: "3",
    youtubeId: "ApVCy1HLN_Q",
    title: "Douglas County: Behind the Brand - Episode 3",
    description: "Building a brotherhood and changing the culture of a program.",
    category: "douglas-county",
    duration: "3:00",
  },
  {
    id: "4",
    youtubeId: "3EKRTqDWj84",
    title: "Douglas County: Behind the Brand - Episode 4",
    description: "The work behind the scenes that led to historic success.",
    category: "douglas-county",
    duration: "3:00",
  },
  {
    id: "5",
    youtubeId: "ATploDcl6J4",
    title: "Douglas County: Behind the Brand - Episode 5",
    description: "Rising through the ranks and making a name on the national stage.",
    category: "douglas-county",
    duration: "3:00",
  },
  {
    id: "6",
    youtubeId: "D188JyJHQyY",
    title: "Douglas County: Behind the Brand - Episode 6",
    description: "The making of All-Americans and the pursuit of excellence.",
    category: "douglas-county",
    duration: "3:00",
  },
  {
    id: "7",
    youtubeId: "fGJ-fRUC_tA",
    title: "Douglas County: Behind the Brand - Episode 7",
    description: "Breaking records and defying expectations after 60 years.",
    category: "douglas-county",
    duration: "3:00",
  },
  {
    id: "8",
    youtubeId: "SDgzcTqDcvs",
    title: "Douglas County: Behind the Brand - Episode 8",
    description: "The journey to winning region after 25 years.",
    category: "douglas-county",
    duration: "3:00",
  },
  {
    id: "9",
    youtubeId: "MAWJT-OJCYY",
    title: "Douglas County: Behind the Brand - Episode 9",
    description: "Playoff dreams and championship aspirations.",
    category: "douglas-county",
    duration: "3:00",
  },
  {
    id: "10",
    youtubeId: "YBSj9wmhRz4",
    title: "Douglas County: Behind the Brand - Episode 10",
    description: "30 scholarships, 4 All-Americans, and a legacy built to last.",
    category: "douglas-county",
    duration: "3:00",
  },
  {
    id: "11",
    youtubeId: "-NShGONy3pc",
    title: "Douglas County: Behind the Brand - Episode 11",
    description: "The impact beyond the field - changing lives through Brand of a Champion.",
    category: "douglas-county",
    duration: "3:00",
  },
  {
    id: "12",
    youtubeId: "BwRmGX4Rbwo",
    title: "Douglas County: Behind the Brand - Episode 12",
    description: "A 31-8 record and the making of champions.",
    category: "douglas-county",
    duration: "3:00",
  },
  {
    id: "13",
    youtubeId: "scjCbAAiACE",
    title: "Douglas County: Behind the Brand - Episode 13",
    description: "The finale - reflecting on a journey that changed everything.",
    category: "douglas-county",
    duration: "3:00",
  },
];

export const categories = [
  { id: "all", label: "All Videos" },
  { id: "douglas-county", label: "Douglas County: Behind the Brand" },
  { id: "behind-scenes", label: "Behind the Scenes" },
  { id: "success-stories", label: "Success Stories" },
  { id: "educational", label: "Educational" },
];
