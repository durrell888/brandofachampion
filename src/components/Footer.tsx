import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <a href="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <Heart className="w-5 h-5 text-accent-foreground" />
              </div>
              AthleteBase
            </a>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6">
              Empowering athletes to succeed in every aspect of life, beyond the game.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">Find Athletes</a></li>
              <li><a href="#" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">Our Services</a></li>
              <li><a href="#" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">Success Stories</a></li>
              <li><a href="#" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">Partner With Us</a></li>
              <li><a href="#" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">Donate</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">Career Guide</a></li>
              <li><a href="#" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">Financial Toolkit</a></li>
              <li><a href="#" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">Mental Health Resources</a></li>
              <li><a href="#" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">Education Programs</a></li>
              <li><a href="#" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <Mail className="w-4 h-4 shrink-0" />
                support@athletebase.org
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <Phone className="w-4 h-4 shrink-0" />
                (555) 123-4567
              </li>
              <li className="flex items-start gap-3 text-sm text-primary-foreground/70">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                123 Sports Way<br />New York, NY 10001
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/60">
            © 2024 AthleteBase. All rights reserved. 501(c)(3) Nonprofit Organization.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;