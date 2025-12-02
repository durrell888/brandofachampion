import { partners } from "@/data/partners";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ExternalLink } from "lucide-react";

const Partners = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our Partners
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're proud to partner with organizations that share our commitment to empowering athletes beyond the game.
            </p>
          </div>

          {/* Partners Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {partners.map((partner) => (
              <a
                key={partner.id}
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-card border border-border rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-primary/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                  <span className="text-2xl font-bold text-foreground">
                    {partner.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {partner.name}
                </h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground group-hover:text-primary transition-colors">
                  <span>Visit Website</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </a>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center bg-primary/5 rounded-2xl p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Become a Partner
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Join us in supporting the next generation of champions. Partner with Brand of a Champion to make a lasting impact.
            </p>
            <a
              href="mailto:Durrell@brandofachampion.com"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Partners;
