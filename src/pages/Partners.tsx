import { useState } from "react";
import { partners } from "@/data/partners";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ExternalLink, Send, Handshake, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Partners = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const subject = encodeURIComponent(`Partnership Inquiry from ${formData.company}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nCompany: ${formData.company}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    
    window.location.href = `mailto:Durrell@brandofachampion.com?subject=${subject}&body=${body}`;
    
    toast({
      title: "Opening email client",
      description: "Your partnership inquiry is ready to send!",
    });
    
    setFormData({ name: "", company: "", email: "", message: "" });
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
              <Handshake className="w-4 h-4 text-accent" />
              <span className="text-sm font-bold text-accent uppercase tracking-wider">Our Partners</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary-foreground mb-6 animate-fade-in [animation-delay:100ms] opacity-0 tracking-tight">
              <span className="block">TRUSTED BY</span>
              <span className="text-gradient">THE BEST</span>
            </h1>
            <p className="text-xl text-primary-foreground/70 animate-fade-in [animation-delay:200ms] opacity-0 font-medium max-w-xl mx-auto">
              We're proud to partner with organizations that share our commitment to empowering athletes.
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

      <main className="py-20">
        <div className="container">
          {/* Partners Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {partners.map((partner, index) => (
              <a
                key={partner.id}
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-card border border-border rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-accent/50 hover:shadow-xl transition-all duration-300 animate-fade-in opacity-0"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="w-32 h-24 flex items-center justify-center mb-6">
                  {partner.logo ? (
                    <img 
                      src={partner.logo} 
                      alt={`${partner.name} logo`}
                      className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-secondary rounded-xl flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                      <span className="text-3xl font-extrabold text-foreground group-hover:text-accent transition-colors">
                        {partner.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                  {partner.name}
                </h3>
                <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground group-hover:text-accent transition-colors">
                  <span>Visit Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </a>
            ))}
          </div>

          {/* Partnership Form Section */}
          <div className="mt-24">
            <div className="relative overflow-hidden rounded-2xl hero-gradient">
              <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
              </div>

              <div className="relative z-10 p-8 md:p-16">
                <div className="max-w-2xl mx-auto">
                  <div className="text-center mb-10">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-bold uppercase tracking-wider mb-6">
                      Join Us
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mb-4 tracking-tight">
                      Become a Partner
                    </h2>
                    <p className="text-primary-foreground/70 text-lg">
                      Join us in supporting the next generation of champions.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-bold text-primary-foreground/80 mb-2 uppercase tracking-wider">
                          Your Name
                        </label>
                        <Input
                          id="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="John Smith"
                          className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-accent"
                        />
                      </div>
                      <div>
                        <label htmlFor="company" className="block text-sm font-bold text-primary-foreground/80 mb-2 uppercase tracking-wider">
                          Company
                        </label>
                        <Input
                          id="company"
                          type="text"
                          required
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Your Company"
                          className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-accent"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-bold text-primary-foreground/80 mb-2 uppercase tracking-wider">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@company.com"
                        className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-accent"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-bold text-primary-foreground/80 mb-2 uppercase tracking-wider">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your organization and partnership ideas..."
                        className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-accent resize-none"
                      />
                    </div>

                    <Button type="submit" variant="hero" size="xl" className="w-full md:w-auto group">
                      <Send className="w-5 h-5" />
                      Send Partnership Inquiry
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Partners;
