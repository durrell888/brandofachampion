import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SupportCategories from "@/components/SupportCategories";
import NewsletterSignup from "@/components/NewsletterSignup";
import EmailCapturePopup from "@/components/EmailCapturePopup";
import AffiliateProducts from "@/components/AffiliateProducts";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { ArrowRight, Handshake, Heart, Users, Trophy, Target, Mail, Phone, ExternalLink, Send } from "lucide-react";
import { DonationModal } from "@/components/DonationModal";
import { partners } from "@/data/partners";
import { useToast } from "@/hooks/use-toast";
import { SEO, organizationSchema } from "@/components/SEO";

const Index = () => {
  const { toast } = useToast();
  const [donationModalOpen, setDonationModalOpen] = useState(false);
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
    <main className="min-h-screen bg-background">
      <SEO 
        canonical="https://brandofachampion.com/"
        structuredData={organizationSchema}
      />
      <EmailCapturePopup />
      <Navbar />
      <Hero />

      {/* Mission Section with Featured Image */}
      <section className="py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative animate-fade-in">
              <div className="absolute -inset-4 bg-accent/20 rounded-2xl blur-2xl" />
              <img
                src="/images/community-impact.jpg"
                alt="Brand of a Champion community impact - mentoring young athletes"
                className="relative rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]"
              />
              <div className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground p-6 rounded-xl shadow-lg">
                <div className="text-4xl font-extrabold">500+</div>
                <div className="text-sm font-bold uppercase tracking-wider">Lives Changed</div>
              </div>
            </div>

            {/* Content */}
            <div className="animate-fade-in [animation-delay:200ms] opacity-0">
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-bold uppercase tracking-wider mb-6">
                Our Mission
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6 tracking-tight">
                More Than Just Sports
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Brand of a Champion is a 501(c)(3) nonprofit organization dedicated to helping professional athletes with all aspects of life and success outside of sports.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We believe that true champions are built not just on the field, but through character, community, and continuous growth. Our programs provide comprehensive support in career development, education, mental health, financial literacy, and more.
              </p>
              <a href="#partner-form">
                <Button variant="hero" size="lg" className="group">
                  <Handshake className="w-5 h-5" />
                  Partner With Us
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-secondary/50">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-bold uppercase tracking-wider mb-4">
              Our Values
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
              What We Stand For
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Heart,
                title: "Compassion",
                description: "We lead with empathy and understanding, meeting athletes where they are.",
              },
              {
                icon: Users,
                title: "Community",
                description: "Building strong networks of support that extend beyond individual success.",
              },
              {
                icon: Trophy,
                title: "Excellence",
                description: "Striving for the highest standards in everything we do.",
              },
              {
                icon: Target,
                title: "Purpose",
                description: "Helping athletes discover and pursue their life's true calling.",
              },
            ].map((value, index) => (
              <div
                key={value.title}
                className="bg-card rounded-xl p-8 border border-border hover:border-accent/30 transition-all duration-300 animate-fade-in opacity-0"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl red-gradient flex items-center justify-center mb-6">
                  <value.icon className="w-7 h-7 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-24">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-bold uppercase tracking-wider mb-4">
              Leadership
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
              Meet Our Team
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto overflow-visible">
            {/* Durrell Steen */}
            <div className="bg-card rounded-2xl border border-border card-shadow animate-fade-in transition-all duration-300 hover:scale-110 hover:z-10 hover:shadow-2xl cursor-pointer relative">
              <div className="h-40 hero-gradient relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src="/images/team/durrell-steen.jpg" 
                    alt="Durrell Steen"
                    className="w-24 h-24 rounded-full object-cover border-4 border-primary-foreground/20"
                  />
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-extrabold text-foreground mb-1">Durrell Steen</h3>
                <p className="text-accent font-bold mb-3">Executive Director</p>
                <p className="text-muted-foreground text-sm mb-4">
                  Leading Brand of a Champion's mission to empower athletes and build lasting impact in communities.
                </p>
                <div className="flex flex-col gap-2">
                  <a 
                    href="mailto:Durrell@brandofachampion.com" 
                    className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground hover:text-accent transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    Durrell@brandofachampion.com
                  </a>
                  <a 
                    href="tel:+14702316591" 
                    className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground hover:text-accent transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    (470) 231-6591
                  </a>
                </div>
              </div>
            </div>

            {/* Aaron Ross */}
            <div className="bg-card rounded-2xl border border-border card-shadow animate-fade-in [animation-delay:100ms] opacity-0 transition-all duration-300 hover:scale-110 hover:z-10 hover:shadow-2xl cursor-pointer relative">
              <div className="h-40 hero-gradient relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src="/images/team/aaron-ross.avif" 
                    alt="Aaron Ross"
                    className="w-24 h-24 rounded-full object-cover border-4 border-primary-foreground/20"
                  />
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-extrabold text-foreground mb-1">Aaron Ross</h3>
                <p className="text-accent font-bold mb-3">Athlete Advisor</p>
                <p className="text-muted-foreground text-sm mb-4">
                  Former NFL player bringing firsthand professional experience to guide athletes on and off the field.
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-sm font-medium text-foreground">
                  <Trophy className="w-4 h-4 text-accent" />
                  NFL Experience
                </div>
              </div>
            </div>

            {/* Sanya Richards-Ross */}
            <div className="bg-card rounded-2xl border border-border card-shadow animate-fade-in [animation-delay:200ms] opacity-0 transition-all duration-300 hover:scale-110 hover:z-10 hover:shadow-2xl cursor-pointer relative">
              <div className="h-40 hero-gradient relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src="/images/team/sanya-richards-ross.jpg" 
                    alt="Sanya Richards-Ross"
                    className="w-24 h-24 rounded-full object-cover border-4 border-primary-foreground/20"
                  />
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-extrabold text-foreground mb-1">Sanya Richards-Ross</h3>
                <p className="text-accent font-bold mb-3">Athlete Marketing & Mindset Training</p>
                <p className="text-muted-foreground text-sm mb-4">
                  6x Olympic Gold Medalist, Nike Ambassador, NBC Sports Host, and Philanthropist.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-secondary text-xs font-medium text-foreground">
                    <Trophy className="w-3 h-3 text-accent" />
                    6x Gold Medalist
                  </div>
                </div>
              </div>
            </div>

            {/* Kiana Williams */}
            <div className="bg-card rounded-2xl border border-border overflow-hidden card-shadow animate-fade-in [animation-delay:300ms] opacity-0 transition-transform duration-300 hover:scale-105 hover:z-10 cursor-pointer">
              <div className="h-40 hero-gradient relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src="/images/team/kiana-williams.webp" 
                    alt="Kiana Williams"
                    className="w-24 h-24 rounded-full object-cover border-4 border-primary-foreground/20"
                  />
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-extrabold text-foreground mb-1">Kiana Williams</h3>
                <p className="text-accent font-bold mb-3">Women's Athlete Advisor</p>
                <p className="text-muted-foreground text-sm mb-4">
                  Stanford graduate, NCAA Champion & program's all-time leader in made 3-pointers, current WNBA player.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-secondary text-xs font-medium text-foreground">
                    <Trophy className="w-3 h-3 text-accent" />
                    WNBA Player
                  </div>
                </div>
              </div>
            </div>

            {/* Andrew Chen */}
            <div className="bg-card rounded-2xl border border-border overflow-hidden card-shadow animate-fade-in [animation-delay:400ms] opacity-0 transition-transform duration-300 hover:scale-105 hover:z-10 cursor-pointer">
              <div className="h-40 hero-gradient relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src="/images/team/andrew-chen.jpg" 
                    alt="Andrew Chen"
                    className="w-24 h-24 rounded-full object-cover border-4 border-primary-foreground/20"
                  />
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-extrabold text-foreground mb-1">Andrew Chen</h3>
                <p className="text-accent font-bold mb-3">Financial Advisor</p>
                <p className="text-muted-foreground text-sm mb-4">
                  Advisor since 2007, Philanthropist, Partner with LPL Financial, the #1 independent broker/dealer.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-secondary text-xs font-medium text-foreground">
                    <Trophy className="w-3 h-3 text-accent" />
                    LPL Financial Partner
                  </div>
                </div>
              </div>
            </div>

            {/* Everett Levy */}
            <div className="bg-card rounded-2xl border border-border overflow-hidden card-shadow animate-fade-in [animation-delay:500ms] opacity-0 transition-transform duration-300 hover:scale-105 hover:z-10 cursor-pointer">
              <div className="h-40 hero-gradient relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src="/images/team/everett-levy.jpeg" 
                    alt="Everett Levy"
                    className="w-24 h-24 rounded-full object-cover border-4 border-primary-foreground/20"
                  />
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-extrabold text-foreground mb-1">Everett Levy</h3>
                <p className="text-accent font-bold mb-3">NFL PA Certified Agent</p>
                <p className="text-muted-foreground text-sm mb-4">
                  University of Maryland graduate, NFL PA certified agent at Goal Line Football, helping athletes navigate NIL opportunities.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-secondary text-xs font-medium text-foreground">
                    <Trophy className="w-3 h-3 text-accent" />
                    NFL Agent
                  </div>
                </div>
              </div>
            </div>

            {/* Dameon Hagler */}
            <div className="bg-card rounded-2xl border border-border overflow-hidden card-shadow animate-fade-in [animation-delay:600ms] opacity-0 transition-transform duration-300 hover:scale-105 hover:z-10 cursor-pointer">
              <div className="h-40 hero-gradient relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src="/images/team/dameon-hagler.png" 
                    alt="Dameon Hagler"
                    className="w-24 h-24 rounded-full object-cover border-4 border-primary-foreground/20"
                  />
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-extrabold text-foreground mb-1">Dameon Hagler</h3>
                <p className="text-accent font-bold mb-3">Player Relations</p>
                <p className="text-muted-foreground text-sm mb-4">
                  Military veteran and mentor with a Master's in Network and Communication with a concentration in Project Management.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-secondary text-xs font-medium text-foreground">
                    <Trophy className="w-3 h-3 text-accent" />
                    Military Veteran
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Categories */}
      <section id="services">
        <SupportCategories />
      </section>

      {/* Partners Section */}
      <section id="partners" className="py-24 bg-secondary/50">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <Handshake className="w-4 h-4 text-accent" />
              <span className="text-sm font-bold text-accent uppercase tracking-wider">Our Partners</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
              Trusted By The Best
            </h2>
            <p className="text-lg text-muted-foreground">
              We're proud to partner with organizations that share our commitment to empowering athletes.
            </p>
          </div>

          {/* Partners Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {partners.map((partner, index) => (
              <a
                key={partner.id}
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-card border border-border rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-accent/50 hover:shadow-xl transition-all duration-300 animate-fade-in opacity-0"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="w-24 h-16 flex items-center justify-center mb-4">
                  {partner.logo ? (
                    <img 
                      src={partner.logo} 
                      alt={`${partner.name} logo`}
                      className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                      <span className="text-2xl font-extrabold text-foreground group-hover:text-accent transition-colors">
                        {partner.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="text-sm font-bold text-foreground mb-1 group-hover:text-accent transition-colors">
                  {partner.name}
                </h3>
                <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground group-hover:text-accent transition-colors">
                  <span>Visit</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Form Section */}
      <section id="partner-form" className="pb-24 pt-8 bg-secondary/50">
        <div className="container">
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
                  <a href="#partner-form">
                    <Button variant="hero" size="xl" className="group w-full sm:w-auto">
                      <Handshake className="w-5 h-5" />
                      Become a Partner
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </a>
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
