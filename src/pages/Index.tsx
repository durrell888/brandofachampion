import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SupportCategories from "@/components/SupportCategories";
import NewsletterSignup from "@/components/NewsletterSignup";
import EmailCapturePopup from "@/components/EmailCapturePopup";
import AffiliateProducts from "@/components/AffiliateProducts";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Handshake, Heart } from "lucide-react";
import { DonationModal } from "@/components/DonationModal";

const Index = () => {
  const [donationModalOpen, setDonationModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background">
      <EmailCapturePopup />
      <Navbar />
      <Hero />

      {/* Support Categories */}
      <section id="services">
        <SupportCategories />
      </section>

      {/* Affiliate Products Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <AffiliateProducts 
            title="Recommended Gear"
            subtitle="Top picks from our partners to help athletes perform at their best"
            maxProducts={8}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="relative overflow-hidden rounded-2xl hero-gradient">
            {/* Background effects */}
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-primary-foreground/5 blur-3xl" />
            </div>

            <div className="relative z-10 p-12 md:p-20">
              <div className="max-w-3xl mx-auto text-center">
                <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-bold uppercase tracking-wider mb-6">
                  Join The Movement
                </span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-6 tracking-tight">
                  Ready to Make a Difference?
                </h2>
                <p className="text-xl text-primary-foreground/70 mb-10 max-w-xl mx-auto">
                  Join our network of supporters and help athletes transition successfully into their next chapter.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/partners">
                    <Button variant="hero" size="xl" className="group w-full sm:w-auto">
                      <Handshake className="w-5 h-5" />
                      Become a Partner
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Button 
                    variant="heroOutline" 
                    size="xl" 
                    className="group"
                    onClick={() => setDonationModalOpen(true)}
                  >
                    <Heart className="w-5 h-5" />
                    Donate Now
                  </Button>
                </div>
                <DonationModal open={donationModalOpen} onOpenChange={setDonationModalOpen} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <NewsletterSignup />

      <Footer />
    </main>
  );
};

export default Index;
