import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Users, Trophy, Target, ArrowRight, Mail, Phone } from "lucide-react";

const About = () => {
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
              <Heart className="w-4 h-4 text-accent" />
              <span className="text-sm font-bold text-accent uppercase tracking-wider">Our Story</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary-foreground mb-6 animate-fade-in [animation-delay:100ms] opacity-0 tracking-tight">
              <span className="block">BUILDING</span>
              <span className="text-gradient">CHAMPIONS</span>
            </h1>
            <p className="text-xl text-primary-foreground/70 animate-fade-in [animation-delay:200ms] opacity-0 font-medium max-w-xl mx-auto">
              Empowering athletes to succeed in every aspect of life, beyond the game.
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
              <Link to="/partners">
                <Button variant="hero" size="lg" className="group">
                  Partner With Us
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
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

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Durrell Steen */}
            <div className="bg-card rounded-2xl border border-border overflow-hidden card-shadow animate-fade-in">
              <div className="h-40 hero-gradient relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center border-4 border-primary-foreground/20">
                    <span className="text-4xl font-extrabold text-primary-foreground">DS</span>
                  </div>
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-extrabold text-foreground mb-1">Durrell Steen</h3>
                <p className="text-accent font-bold mb-3">Executive Director</p>
                <p className="text-muted-foreground text-sm mb-4">
                  Leading Brand of a Champion's mission to empower athletes and build lasting impact in communities across the nation.
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
            <div className="bg-card rounded-2xl border border-border overflow-hidden card-shadow animate-fade-in [animation-delay:100ms] opacity-0">
              <div className="h-40 hero-gradient relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center border-4 border-primary-foreground/20">
                    <span className="text-4xl font-extrabold text-primary-foreground">AR</span>
                  </div>
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-extrabold text-foreground mb-1">Aaron Ross</h3>
                <p className="text-accent font-bold mb-3">Athlete Mentor</p>
                <p className="text-muted-foreground text-sm mb-4">
                  Former NFL player bringing firsthand professional experience to guide and mentor athletes through their journey on and off the field.
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-sm font-medium text-foreground">
                  <Trophy className="w-4 h-4 text-accent" />
                  NFL Experience
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="relative overflow-hidden rounded-2xl hero-gradient">
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
            </div>

            <div className="relative z-10 p-12 md:p-20 text-center">
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-bold uppercase tracking-wider mb-6">
                Get Involved
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-6 tracking-tight max-w-2xl mx-auto">
                Join Us in Building Champions
              </h2>
              <p className="text-xl text-primary-foreground/70 mb-10 max-w-xl mx-auto">
                Whether you're an athlete seeking support, a partner organization, or a donor – there's a place for you in our community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/partners">
                  <Button variant="hero" size="xl" className="group w-full sm:w-auto">
                    Become a Partner
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button variant="heroOutline" size="xl">
                  Donate Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
