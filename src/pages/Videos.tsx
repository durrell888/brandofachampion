import { useState } from "react";
import { Heart, Play } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VideoCard from "@/components/VideoCard";
import FeaturedVideo from "@/components/FeaturedVideo";
import VideoModal from "@/components/VideoModal";
import { videos, categories, videoSeries, type Video } from "@/data/videos";
import { Button } from "@/components/ui/button";

const Videos = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const featuredVideo = videos.find((v) => v.featured);
  const filteredVideos = videos
    .filter((video) => {
      if (selectedCategory === "all") return !video.featured;
      return video.category === selectedCategory && !video.featured;
    })
    .sort((a, b) => parseInt(a.id) - parseInt(b.id));

  const currentSeries = videoSeries.find((s) => s.id === selectedCategory);

  const handlePlayVideo = (video: Video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 hero-gradient overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary-foreground/5 blur-3xl" />
        </div>

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8 animate-fade-in">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm font-bold text-accent uppercase tracking-wider">Watch Our Impact</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary-foreground mb-6 animate-fade-in [animation-delay:100ms] opacity-0 tracking-tight">
              <span className="block">STORIES OF</span>
              <span className="text-gradient">CHAMPIONS</span>
            </h1>
            <p className="text-xl text-primary-foreground/70 animate-fade-in [animation-delay:200ms] opacity-0 font-medium">
              Discover inspiring stories of athletes building their legacy beyond the game.
            </p>
          </div>
        </div>

        {/* Angled divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16">
            <path d="M0 80L1440 0V80H0Z" className="fill-background" />
          </svg>
        </div>
      </section>

      {/* Featured Video Section */}
      {featuredVideo && (
        <section className="py-20">
          <div className="container">
            <FeaturedVideo video={featuredVideo} onPlay={handlePlayVideo} />
          </div>
        </section>
      )}

      {/* Video Grid Section */}
      <section className="py-20 bg-secondary/50">
        <div className="container">
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "hero" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="rounded-full px-6"
              >
                {category.label}
              </Button>
            ))}
          </div>

          {/* Series Description */}
          {currentSeries && (
            <div className="max-w-4xl mx-auto mb-12 p-6 bg-card rounded-xl border border-border">
              <h3 className="text-2xl font-bold text-foreground mb-4">{currentSeries.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{currentSeries.description}</p>
            </div>
          )}

          {/* Video Grid */}
          {filteredVideos.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((video) => (
                <VideoCard key={video.id} video={video} onPlay={handlePlayVideo} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-card rounded-xl border border-border">
              <Heart className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2">More Stories Coming Soon</h3>
              <p className="text-muted-foreground">
                We're working on bringing you more inspiring stories. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />

      {/* Video Modal */}
      <VideoModal
        video={selectedVideo}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Videos;
