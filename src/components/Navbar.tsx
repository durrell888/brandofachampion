import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-primary-foreground/10">
      <div className="container flex items-center justify-between h-16">
        <a href="/" className="flex items-center gap-2 text-primary-foreground font-bold text-xl">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <Heart className="w-5 h-5 text-accent-foreground" />
          </div>
          AthleteBase
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#athletes" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm font-medium">
            Athletes
          </a>
          <a href="#services" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm font-medium">
            Services
          </a>
          <a href="#about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm font-medium">
            About Us
          </a>
          <a href="#partners" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm font-medium">
            Partners
          </a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="heroOutline" size="sm">
            Sign In
          </Button>
          <Button variant="hero" size="sm">
            Get Started
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-primary-foreground p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-primary border-t border-primary-foreground/10">
          <div className="container py-4 space-y-4">
            <a href="#athletes" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors font-medium">
              Athletes
            </a>
            <a href="#services" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors font-medium">
              Services
            </a>
            <a href="#about" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors font-medium">
              About Us
            </a>
            <a href="#partners" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors font-medium">
              Partners
            </a>
            <div className="flex gap-3 pt-2">
              <Button variant="heroOutline" size="sm" className="flex-1">
                Sign In
              </Button>
              <Button variant="hero" size="sm" className="flex-1">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;