import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { ParentRegistrationModal } from "@/components/ParentRegistrationModal";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const handleGetStarted = () => {
    setIsOpen(false);
    setRegistrationModalOpen(true);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-lg" : "bg-transparent"
      }`}>
        <div className="container flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg red-gradient flex items-center justify-center shadow-lg">
              <span className="font-display text-2xl text-accent-foreground leading-none">B</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-extrabold text-lg tracking-tight text-foreground">
                BRAND OF A
              </span>
              <span className="font-extrabold text-lg tracking-tight text-accent"> CHAMPION</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            <Link
              to="/our-program"
              className={`nav-link nav-chase-glow px-3 py-2 text-sm font-semibold transition-colors text-foreground hover:text-accent ${isActive("/our-program") ? "text-accent" : ""}`}
              style={{ animationDelay: "0s" }}
            >
              Our Program
            </Link>
            <Link
              to="/athletes"
              className={`nav-link nav-chase-glow px-3 py-2 text-sm font-semibold transition-colors text-foreground hover:text-accent ${isActive("/athletes") ? "text-accent" : ""}`}
              style={{ animationDelay: "0.5s" }}
            >
              Athletes
            </Link>
            <Link
              to="/recruiting"
              className={`nav-link nav-chase-glow px-3 py-2 text-sm font-semibold transition-colors text-foreground hover:text-accent ${isActive("/recruiting") ? "text-accent" : ""}`}
              style={{ animationDelay: "1s" }}
            >
              Recruiting
            </Link>
            <Link
              to="/scholarships"
              className={`nav-link nav-chase-glow px-3 py-2 text-sm font-semibold transition-colors text-foreground hover:text-accent ${isActive("/scholarships") ? "text-accent" : ""}`}
              style={{ animationDelay: "1.5s" }}
            >
              Scholarships
            </Link>
            <Link
              to="/community"
              className={`nav-link nav-chase-glow px-3 py-2 text-sm font-semibold transition-colors text-foreground hover:text-accent ${isActive("/community") ? "text-accent" : ""}`}
              style={{ animationDelay: "2s" }}
            >
              Community
            </Link>
            <Link
              to="/stories"
              className={`nav-link nav-chase-glow px-3 py-2 text-sm font-semibold transition-colors text-foreground hover:text-accent ${isActive("/stories") ? "text-accent" : ""}`}
              style={{ animationDelay: "2.5s" }}
            >
              Stories
            </Link>
            <Link
              to="/apparel"
              className={`nav-link nav-chase-glow px-3 py-2 text-sm font-semibold transition-colors text-foreground hover:text-accent ${isActive("/apparel") ? "text-accent" : ""}`}
              style={{ animationDelay: "3s" }}
            >
              Apparel
            </Link>
            <Link
              to="/donate"
              className={`nav-link nav-chase-glow px-3 py-2 text-sm font-semibold transition-colors text-primary hover:text-accent ${isActive("/donate") ? "text-accent" : ""}`}
              style={{ animationDelay: "3.5s" }}
            >
              Donate
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link to="/training">
              <Button variant={scrolled ? "ghost" : "heroOutline"} size="sm">
                Football Training
              </Button>
            </Link>
            <Button variant="hero" size="sm" onClick={handleGetStarted}>
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-lg transition-colors text-foreground hover:bg-secondary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden bg-background border-t border-border animate-fade-in">
            <div className="container py-6 space-y-4">
              <Link to="/our-program" className="block text-foreground hover:text-accent transition-colors font-semibold py-2" onClick={() => setIsOpen(false)}>
                Our Program
              </Link>
              <Link to="/athletes" className="block text-foreground hover:text-accent transition-colors font-semibold py-2" onClick={() => setIsOpen(false)}>
                Athletes
              </Link>
              <Link to="/recruiting" className="block text-foreground hover:text-accent transition-colors font-semibold py-2" onClick={() => setIsOpen(false)}>
                Recruiting
              </Link>
              <Link to="/scholarships" className="block text-foreground hover:text-accent transition-colors font-semibold py-2" onClick={() => setIsOpen(false)}>
                Scholarships
              </Link>
              <Link to="/community" className="block text-foreground hover:text-accent transition-colors font-semibold py-2" onClick={() => setIsOpen(false)}>
                Community
              </Link>
              <Link to="/stories" className="block text-foreground hover:text-accent transition-colors font-semibold py-2" onClick={() => setIsOpen(false)}>
                Stories
              </Link>
              <Link to="/apparel" className="block text-foreground hover:text-accent transition-colors font-semibold py-2" onClick={() => setIsOpen(false)}>
                Apparel
              </Link>
              <Link to="/donate" className="block text-primary hover:text-accent transition-colors font-semibold py-2" onClick={() => setIsOpen(false)}>
                Donate
              </Link>
              <div className="flex gap-3 pt-4 border-t border-border">
                <Link to="/training" className="flex-1" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">
                    Football Training
                  </Button>
                </Link>
                <Button variant="hero" size="sm" className="flex-1" onClick={handleGetStarted}>
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <ParentRegistrationModal open={registrationModalOpen} onOpenChange={setRegistrationModalOpen} />
    </>
  );
};

export default Navbar;
