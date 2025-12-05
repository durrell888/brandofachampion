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
          <div className="hidden md:flex items-center gap-1">
        {[
            { href: "#athletes", label: "Athletes" },
            { href: "/recruiting", label: "Recruiting", isRoute: true },
            { href: "/scholarships", label: "Scholarships", isRoute: true },
            { href: "/stories", label: "Stories", isRoute: true },
            { href: "/apparel", label: "Apparel", isRoute: true },
            { href: "/about", label: "About", isRoute: true },
            { href: "/partners", label: "Partners", isRoute: true },
          ].map((item, index) => (
            item.isRoute ? (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`nav-link nav-chase-glow px-4 py-2 text-sm font-semibold transition-colors text-foreground hover:text-accent ${isActive(item.href) ? "text-accent" : ""}`}
                  style={{ animationDelay: `${index * 0.5}s` }}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className="nav-link nav-chase-glow px-4 py-2 text-sm font-semibold transition-colors text-foreground hover:text-accent"
                  style={{ animationDelay: `${index * 0.5}s` }}
                >
                  {item.label}
                </a>
              )
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button variant={scrolled ? "ghost" : "heroOutline"} size="sm">
              Sign In
            </Button>
            <Button variant="hero" size="sm" onClick={handleGetStarted}>
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors text-foreground hover:bg-secondary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden bg-background border-t border-border animate-fade-in">
            <div className="container py-6 space-y-4">
            <a href="#athletes" className="block text-foreground hover:text-accent transition-colors font-semibold py-2">
              Athletes
            </a>
            <Link to="/recruiting" className="block text-foreground hover:text-accent transition-colors font-semibold py-2" onClick={() => setIsOpen(false)}>
              Recruiting
            </Link>
            <Link to="/scholarships" className="block text-foreground hover:text-accent transition-colors font-semibold py-2" onClick={() => setIsOpen(false)}>
              Scholarships
            </Link>
            <Link to="/stories" className="block text-foreground hover:text-accent transition-colors font-semibold py-2" onClick={() => setIsOpen(false)}>
              Stories
            </Link>
              <Link to="/apparel" className="block text-foreground hover:text-accent transition-colors font-semibold py-2" onClick={() => setIsOpen(false)}>
                Apparel
              </Link>
              <Link to="/about" className="block text-foreground hover:text-accent transition-colors font-semibold py-2" onClick={() => setIsOpen(false)}>
                About
              </Link>
              <Link to="/partners" className="block text-foreground hover:text-accent transition-colors font-semibold py-2" onClick={() => setIsOpen(false)}>
                Partners
              </Link>
              <div className="flex gap-3 pt-4 border-t border-border">
                <Button variant="outline" size="sm" className="flex-1">
                  Sign In
                </Button>
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
