import { useState } from "react";
import { Heart, Play, ChevronLeft, Film } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VideoCard from "@/components/VideoCard";
import FeaturedVideo from "@/components/FeaturedVideo";
import VideoModal from "@/components/VideoModal";
import { videos, videoSeries, type Video } from "@/data/videos";
import { Button } from "@/components/ui/button";

const Videos = () => {
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentSeries = videoSeries.find((s) => s.id === selectedSeries);
  const seriesVideos = selectedSeries 
    ? videos.filter((v) => v.category === selectedSeries)
    : [];
  const featuredVideo = seriesVideos.find((v) => v.featured);

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

      {/* Series Selection or Series Content */}
      {!selectedSeries ? (
        /* Series Cards */
        <section className="py-20">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground text-center mb-12">
              Video Series
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {videoSeries.map((series) => {
                const seriesVideoCount = videos.filter((v) => v.category === series.id).length;
                return (
                  <button
                    key={series.id}
                    onClick={() => setSelectedSeries(series.id)}
                    className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/50 transition-all duration-300 hover:shadow-xl hover:shadow-accent/10 text-left"
                  >
                    <div className="aspect-video bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                      <Film className="w-16 h-16 text-accent/60 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                        {series.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {seriesVideoCount} Episodes
                      </p>
                    </div>
                    <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* Back Button & Series Info */}
          <section className="py-16 bg-card border-b border-border">
            <div className="container">
              <Button
                variant="ghost"
                onClick={() => setSelectedSeries(null)}
                className="mb-8 -ml-2"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                Back to Series
              </Button>
              <div className="max-w-4xl">
                <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
                  {currentSeries?.title}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {currentSeries?.description}
                </p>
              </div>
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
              {seriesVideos.filter((v) => !v.featured).length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {seriesVideos
                    .filter((v) => !v.featured)
                    .map((video) => (
                      <VideoCard key={video.id} video={video} onPlay={handlePlayVideo} />
                    ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-card rounded-xl border border-border">
                  <Heart className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-foreground mb-2">More Episodes Coming Soon</h3>
                  <p className="text-muted-foreground">
                    We're working on bringing you more episodes. Check back soon!
                  </p>
                </div>
              )}
            </div>
          </section>
        </>
      )}

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
