import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ExternalLink, X, Sparkles, Star, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { partners } from "@/data/partners";

interface PartnerVideo {
  id: string;
  youtubeId: string;
  title: string;
  partner: string;
  description: string;
  featured?: boolean;
}

const partnerVideos: PartnerVideo[] = [
  {
    id: "1",
    youtubeId: "R0bhVY6Nu4Y",
    title: "Brand of a Champion x Partner Showcase",
    partner: "Brand of a Champion",
    description: "Watch our athletes in action with our amazing partners.",
    featured: true,
  },
];

const AthletePartnerships = () => {
  const navigate = useNavigate();
  const [activeVideo, setActiveVideo] = useState<PartnerVideo | null>(null);
  const [hoveredPartner, setHoveredPartner] = useState<string | null>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const featuredVideo = partnerVideos.find(v => v.featured) || partnerVideos[0];

  const handleBecomePartner = () => {
    navigate('/');
    setTimeout(() => {
      const partnerForm = document.getElementById('partner-form');
      if (partnerForm) {
        partnerForm.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % partnerVideos.length);
  };

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + partnerVideos.length) % partnerVideos.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Athlete Partnerships | Brand of a Champion"
        description="Discover our athlete partnerships, brand collaborations, and exclusive content showcasing our athletes with top partners."
      />
      <Navbar />

      {/* Hero Section with Cinematic Video Feature */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Exclusive Partner Content</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
              Athlete <span className="text-primary">Partnerships</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience our athletes in action with world-class brands and partners
            </p>
          </motion.div>

          {/* Cinematic Featured Video Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative max-w-5xl mx-auto"
          >
            {/* Glowing border effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-2xl blur-lg opacity-30 animate-pulse" />
            
            <div className="relative bg-card rounded-2xl overflow-hidden border border-border shadow-2xl">
              {/* Video Container */}
              <div className="relative aspect-video group cursor-pointer" onClick={() => setActiveVideo(featuredVideo)}>
                <img
                  src={`https://img.youtube.com/vi/${featuredVideo.youtubeId}/maxresdefault.jpg`}
                  alt={featuredVideo.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Play Button with Pulse */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/30 rounded-full animate-ping" />
                    <div className="relative w-20 h-20 md:w-24 md:h-24 bg-primary rounded-full flex items-center justify-center shadow-2xl">
                      <Play className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground ml-1" fill="currentColor" />
                    </div>
                  </div>
                </motion.div>

                {/* Video Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                    <span className="text-sm font-medium text-yellow-500">Featured</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{featuredVideo.title}</h3>
                  <p className="text-white/70 text-sm md:text-base">{featuredVideo.description}</p>
                </div>
              </div>

              {/* Navigation for multiple videos */}
              {partnerVideos.length > 1 && (
                <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="pointer-events-auto opacity-80 hover:opacity-100"
                    onClick={(e) => { e.stopPropagation(); prevVideo(); }}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="pointer-events-auto opacity-80 hover:opacity-100"
                    onClick={(e) => { e.stopPropagation(); nextVideo(); }}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partner Brands Section - Hexagon Grid */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
        
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Our <span className="text-primary">Partners</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              World-class brands supporting our athletes' journey to greatness
            </p>
          </motion.div>

          {/* Unique Floating Partner Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {partners.map((partner, index) => (
              <motion.a
                key={partner.id}
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredPartner(partner.id)}
                onMouseLeave={() => setHoveredPartner(null)}
                className="group relative"
              >
                {/* Card */}
                <motion.div
                  className="relative bg-card border border-border rounded-2xl p-6 h-40 flex flex-col items-center justify-center overflow-hidden transition-all duration-500"
                  whileHover={{ 
                    y: -8,
                    boxShadow: "0 20px 40px -15px rgba(0,0,0,0.3)"
                  }}
                >
                  {/* Animated background on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredPartner === partner.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Glow effect */}
                  <motion.div
                    className="absolute -inset-px bg-gradient-to-r from-primary to-accent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10"
                  />

                  {/* Logo */}
                  {partner.logo ? (
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-h-16 max-w-[120px] object-contain transition-transform duration-500 group-hover:scale-110 relative z-10"
                    />
                  ) : (
                    <span className="text-lg font-bold text-foreground relative z-10">{partner.name}</span>
                  )}

                  {/* Partner name */}
                  <motion.span
                    className="absolute bottom-4 text-sm font-medium text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    {partner.name}
                  </motion.span>

                  {/* External link icon */}
                  <motion.div
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <ExternalLink className="w-4 h-4 text-primary" />
                  </motion.div>
                </motion.div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Video Gallery Section - Masonry Style */}
      {partnerVideos.length > 1 && (
        <section className="py-20">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Partner <span className="text-primary">Highlights</span>
              </h2>
              <p className="text-muted-foreground">
                Watch all our partnership videos and brand collaborations
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partnerVideos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => setActiveVideo(video)}
                >
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-card border border-border">
                    <img
                      src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="w-14 h-14 bg-primary/90 rounded-full flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Play className="w-6 h-6 text-primary-foreground ml-0.5" fill="currentColor" />
                      </motion.div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <h4 className="text-white font-semibold text-sm line-clamp-1">{video.title}</h4>
                      <p className="text-white/60 text-xs">{video.partner}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Interested in <span className="text-primary">Partnering?</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join our roster of world-class partners and help support the next generation of champions
            </p>
            <Button variant="hero" size="lg" onClick={handleBecomePartner}>
              Become a Partner
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1`}
                title={activeVideo.title}
                className="w-full h-full rounded-xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AthletePartnerships;
