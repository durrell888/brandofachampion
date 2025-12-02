import { useState } from "react";
import { Heart, Play } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VideoCard from "@/components/VideoCard";
import FeaturedVideo from "@/components/FeaturedVideo";
import VideoModal from "@/components/VideoModal";
import { videos, categories, type Video } from "@/data/videos";
import { Button } from "@/components/ui/button";

const Videos = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const featuredVideo = videos.find((v) => v.featured);
  const filteredVideos = videos.filter((video) => {
    if (selectedCategory === "all") return !video.featured;
    return video.category === selectedCategory && !video.featured;
  });

  const handlePlayVideo = (video: Video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 hero-gradient overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-accent blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-primary-foreground blur-3xl" />
        </div>

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 mb-6 animate-fade-in">
              <Play className="w-4 h-4 text-accent" />
              <span className="text-sm text-primary-foreground/90">Watch Our Impact</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 animate-fade-in [animation-delay:100ms] opacity-0">
              Stories of <span className="text-gradient">Champions</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 animate-fade-in [animation-delay:200ms] opacity-0">
              Discover inspiring stories of athletes who are building their legacy beyond the game with Brand of a Champion.
            </p>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              className="fill-background"
            />
          </svg>
        </div>
      </section>

      {/* Featured Video Section */}
      {featuredVideo && (
        <section className="py-16 md:py-24">
          <div className="container">
            <FeaturedVideo video={featuredVideo} onPlay={handlePlayVideo} />
          </div>
        </section>
      )}

      {/* Video Grid Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="rounded-full"
              >
                {category.label}
              </Button>
            ))}
          </div>

          {/* Video Grid */}
          {filteredVideos.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((video) => (
                <VideoCard key={video.id} video={video} onPlay={handlePlayVideo} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Heart className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">More Stories Coming Soon</h3>
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
