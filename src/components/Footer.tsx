import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, Facebook, Instagram, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ParentRegistrationModal } from "@/components/ParentRegistrationModal";

const Footer = () => {
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* CTA Section */}
      <div className="border-b border-primary-foreground/10">
        <div className="container py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-2">Ready to Build Your Brand?</h2>
              <p className="text-primary-foreground/70 text-lg">Join the champion community today.</p>
            </div>
            <Button 
              variant="hero" 
              size="xl" 
              className="group"
              onClick={() => setRegistrationModalOpen(true)}
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg red-gradient flex items-center justify-center">
                <span className="font-display text-2xl text-accent-foreground leading-none">B</span>
              </div>
              <div>
                <span className="font-extrabold text-lg tracking-tight">BRAND OF A</span>
                <span className="font-extrabold text-lg tracking-tight text-accent"> CHAMPION</span>
              </div>
            </Link>
            <p className="text-primary-foreground/60 text-sm leading-relaxed mb-6">
              Empowering athletes to succeed in every aspect of life, beyond the game.
            </p>
            <div className="flex gap-3">
              <a 
                href="https://facebook.com/BrandofaChampion" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://x.com/brandofachamp" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-all"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a 
                href="https://instagram.com/brandofachampion" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://threads.net/@brandofachampion" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-all"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.182.408-2.256 1.333-3.023.853-.707 2.01-1.134 3.45-1.272.932-.089 1.873-.025 2.813.19l.034-1.442c-.004-.536-.063-1.035-.176-1.487-.233-.925-.727-1.641-1.469-2.131-.74-.488-1.693-.736-2.835-.736-1.89 0-3.376.688-4.42 2.046-.976 1.27-1.47 2.995-1.47 5.13s.492 3.86 1.466 5.13c1.042 1.36 2.527 2.05 4.424 2.05.07 0 .14 0 .21-.003l.007 2.12h-.016zm1.929-6.328c-.786.023-1.478.148-2.049.372-.528.207-.933.494-1.203.855-.263.353-.38.744-.35 1.165.036.485.253.89.646 1.204.44.352 1.063.537 1.803.537 1.083 0 1.947-.35 2.57-1.04.588-.652.934-1.58 1.03-2.76-.8-.239-1.628-.36-2.447-.333z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link to="/athletes" className="text-primary-foreground/60 hover:text-accent text-sm font-medium transition-colors">Find Athletes</Link></li>
              <li><Link to="/#services" className="text-primary-foreground/60 hover:text-accent text-sm font-medium transition-colors">Our Services</Link></li>
              <li><Link to="/stories" className="text-primary-foreground/60 hover:text-accent text-sm font-medium transition-colors">Success Stories</Link></li>
              <li><Link to="/athlete-partnerships" className="text-primary-foreground/60 hover:text-accent text-sm font-medium transition-colors">Partner With Us</Link></li>
              <li><Link to="/donate" className="text-primary-foreground/60 hover:text-accent text-sm font-medium transition-colors">Donate</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-6">Resources</h3>
            <ul className="space-y-4">
              <li><Link to="/recruiting" className="text-primary-foreground/60 hover:text-accent text-sm font-medium transition-colors">Recruiting Guide</Link></li>
              <li><Link to="/scholarships" className="text-primary-foreground/60 hover:text-accent text-sm font-medium transition-colors">Scholarships</Link></li>
              <li><Link to="/community" className="text-primary-foreground/60 hover:text-accent text-sm font-medium transition-colors">Community Board</Link></li>
              <li><Link to="/news" className="text-primary-foreground/60 hover:text-accent text-sm font-medium transition-colors">News & Updates</Link></li>
              <li><Link to="/apparel" className="text-primary-foreground/60 hover:text-accent text-sm font-medium transition-colors">Apparel Store</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <a href="mailto:Durrell@brandofachampion.com" className="text-sm font-medium text-primary-foreground/60 hover:text-accent transition-colors">
                  Durrell@brandofachampion.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <a href="tel:+14702316591" className="text-sm font-medium text-primary-foreground/60 hover:text-accent transition-colors">
                  (470) 231-6591
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/40">
            © 2025 Brand of a Champion. All rights reserved. 501(c)(3) Nonprofit Organization.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-sm text-primary-foreground/40 hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-primary-foreground/40 hover:text-accent transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>

      <ParentRegistrationModal open={registrationModalOpen} onOpenChange={setRegistrationModalOpen} />
    </footer>
  );
};

export default Footer;
