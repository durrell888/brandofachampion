import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { ParentRegistrationModal } from "@/components/ParentRegistrationModal";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [recruitingDropdownOpen, setRecruitingDropdownOpen] = useState(false);
  const [donateDropdownOpen, setDonateDropdownOpen] = useState(false);
  const [athletesDropdownOpen, setAthletesDropdownOpen] = useState(false);
  const [storiesDropdownOpen, setStoriesDropdownOpen] = useState(false);
  const [mobileRecruitingOpen, setMobileRecruitingOpen] = useState(false);
  const [mobileDonateOpen, setMobileDonateOpen] = useState(false);
  const [mobileAthletesOpen, setMobileAthletesOpen] = useState(false);
  const [mobileStoriesOpen, setMobileStoriesOpen] = useState(false);
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
            {/* Athletes Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setAthletesDropdownOpen(true)}
              onMouseLeave={() => setAthletesDropdownOpen(false)}
            >
              <button
                className={`nav-link nav-chase-glow px-3 py-2 text-sm font-semibold transition-colors text-foreground hover:text-accent flex items-center gap-1 ${isActive("/athletes") || isActive("/athlete-partnerships") ? "text-accent" : ""}`}
                style={{ animationDelay: "0.5s" }}
              >
                Athletes
                <ChevronDown className={`w-4 h-4 transition-transform ${athletesDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {athletesDropdownOpen && (
                <div className="absolute top-full left-0 pt-2 w-48">
                  <div className="bg-background border border-border rounded-lg shadow-xl py-2 animate-fade-in">
                    <Link
                      to="/athletes"
                      className={`block px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary ${isActive("/athletes") ? "text-accent" : "text-foreground"}`}
                    >
                      All Athletes
                    </Link>
                    <Link
                      to="/athlete-partnerships"
                      className={`block px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary ${isActive("/athlete-partnerships") ? "text-accent" : "text-foreground"}`}
                    >
                      Program Partnerships
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            {/* Recruiting Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setRecruitingDropdownOpen(true)}
              onMouseLeave={() => setRecruitingDropdownOpen(false)}
            >
              <button
                className={`nav-link nav-chase-glow px-3 py-2 text-sm font-semibold transition-colors text-foreground hover:text-accent flex items-center gap-1 ${isActive("/recruiting") || isActive("/scholarships") ? "text-accent" : ""}`}
                style={{ animationDelay: "1s" }}
              >
                Recruiting
                <ChevronDown className={`w-4 h-4 transition-transform ${recruitingDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {recruitingDropdownOpen && (
                <div className="absolute top-full left-0 pt-2 w-48">
                  <div className="bg-background border border-border rounded-lg shadow-xl py-2 animate-fade-in">
                    <Link
                      to="/recruiting"
                      className={`block px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary ${isActive("/recruiting") ? "text-accent" : "text-foreground"}`}
                    >
                      College Recruiting
                    </Link>
                    <Link
                      to="/scholarships"
                      className={`block px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary ${isActive("/scholarships") ? "text-accent" : "text-foreground"}`}
                    >
                      Scholarships
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Stories Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setStoriesDropdownOpen(true)}
              onMouseLeave={() => setStoriesDropdownOpen(false)}
            >
              <button
                className={`nav-link nav-chase-glow px-3 py-2 text-sm font-semibold transition-colors text-foreground hover:text-accent flex items-center gap-1 ${isActive("/stories") || isActive("/media-development") ? "text-accent" : ""}`}
                style={{ animationDelay: "1.5s" }}
              >
                Video Production
                <ChevronDown className={`w-4 h-4 transition-transform ${storiesDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {storiesDropdownOpen && (
                <div className="absolute top-full left-0 pt-2 w-48">
                  <div className="bg-background border border-border rounded-lg shadow-xl py-2 animate-fade-in">
                    <Link
                      to="/stories"
                      className={`block px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary ${isActive("/stories") ? "text-accent" : "text-foreground"}`}
                    >
                      Our Stories
                    </Link>
                    <Link
                      to="/media-development"
                      className={`block px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary ${isActive("/media-development") ? "text-accent" : "text-foreground"}`}
                    >
                      Media Development
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <Link
              to="/georgia-media"
              className={`nav-link nav-chase-glow px-3 py-2 text-sm font-semibold transition-colors text-foreground hover:text-accent ${isActive("/georgia-media") ? "text-accent" : ""}`}
              style={{ animationDelay: "2s" }}
            >
              GA Media
            </Link>
            <Link
              to="/academy"
              className={`nav-link nav-chase-glow px-3 py-2 text-sm font-semibold transition-colors text-yellow-500 hover:text-yellow-400 ${isActive("/academy") ? "text-yellow-400" : ""}`}
              style={{ animationDelay: "2.25s" }}
            >
              🏆 Academy
            </Link>
            
            {/* Donate Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setDonateDropdownOpen(true)}
              onMouseLeave={() => setDonateDropdownOpen(false)}
            >
              <button
                className={`nav-link nav-chase-glow px-3 py-2 text-sm font-semibold transition-colors text-primary hover:text-accent flex items-center gap-1 ${isActive("/donate") || isActive("/donate/usaa") || isActive("/community") || isActive("/volunteer") ? "text-accent" : ""}`}
                style={{ animationDelay: "2.5s" }}
              >
                Donate
                <ChevronDown className={`w-4 h-4 transition-transform ${donateDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {donateDropdownOpen && (
                <div className="absolute top-full right-0 pt-2 w-48">
                  <div className="bg-background border border-border rounded-lg shadow-xl py-2 animate-fade-in">
                    <Link
                      to="/donate"
                      className={`block px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary ${isActive("/donate") ? "text-accent" : "text-foreground"}`}
                    >
                      Make a Donation
                    </Link>
                    <Link
                      to="/donate/usaa"
                      className={`block px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary ${isActive("/donate/usaa") ? "text-accent" : "text-foreground"}`}
                    >
                      USAA Partnership
                    </Link>
                     <Link
                      to="/community"
                      className={`block px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary ${isActive("/community") ? "text-accent" : "text-foreground"}`}
                    >
                      Community Chat
                    </Link>
                    <Link
                      to="/volunteer"
                      className={`block px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary ${isActive("/volunteer") ? "text-accent" : "text-foreground"}`}
                    >
                      Volunteer
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link to="/training">
              <Button variant={scrolled ? "ghost" : "heroOutline"} size="sm">
                Football Training
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant={scrolled ? "ghost" : "heroOutline"} size="sm">
                Member Login
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
            <div className="container py-6 space-y-2">
              <Link to="/our-program" className="block text-foreground hover:text-accent transition-colors font-semibold py-2" onClick={() => setIsOpen(false)}>
                Our Program
              </Link>
              {/* Mobile Athletes Accordion */}
              <div>
                <button 
                  className={`flex items-center justify-between w-full text-foreground hover:text-accent transition-colors font-semibold py-2 ${isActive("/athletes") || isActive("/athlete-partnerships") ? "text-accent" : ""}`}
                  onClick={() => setMobileAthletesOpen(!mobileAthletesOpen)}
                >
                  Athletes
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileAthletesOpen ? "rotate-180" : ""}`} />
                </button>
                {mobileAthletesOpen && (
                  <div className="pl-4 space-y-1 pt-1">
                    <Link to="/athletes" className="block text-muted-foreground hover:text-accent transition-colors font-medium py-2" onClick={() => setIsOpen(false)}>
                      All Athletes
                    </Link>
                    <Link to="/athlete-partnerships" className="block text-muted-foreground hover:text-accent transition-colors font-medium py-2" onClick={() => setIsOpen(false)}>
                      Program Partnerships
                    </Link>
                  </div>
                )}
              </div>
              
              {/* Mobile Recruiting Accordion */}
              <div>
                <button 
                  className={`flex items-center justify-between w-full text-foreground hover:text-accent transition-colors font-semibold py-2 ${isActive("/recruiting") || isActive("/scholarships") ? "text-accent" : ""}`}
                  onClick={() => setMobileRecruitingOpen(!mobileRecruitingOpen)}
                >
                  Recruiting
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileRecruitingOpen ? "rotate-180" : ""}`} />
                </button>
                {mobileRecruitingOpen && (
                  <div className="pl-4 space-y-1 pt-1">
                    <Link to="/recruiting" className="block text-muted-foreground hover:text-accent transition-colors font-medium py-2" onClick={() => setIsOpen(false)}>
                      College Recruiting
                    </Link>
                    <Link to="/scholarships" className="block text-muted-foreground hover:text-accent transition-colors font-medium py-2" onClick={() => setIsOpen(false)}>
                      Scholarships
                    </Link>
                  </div>
                )}
              </div>
              
              {/* Mobile Stories Accordion */}
              <div>
                <button 
                  className={`flex items-center justify-between w-full text-foreground hover:text-accent transition-colors font-semibold py-2 ${isActive("/stories") || isActive("/media-development") ? "text-accent" : ""}`}
                  onClick={() => setMobileStoriesOpen(!mobileStoriesOpen)}
                >
                  Video Production
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileStoriesOpen ? "rotate-180" : ""}`} />
                </button>
                {mobileStoriesOpen && (
                  <div className="pl-4 space-y-1 pt-1">
                    <Link to="/stories" className="block text-muted-foreground hover:text-accent transition-colors font-medium py-2" onClick={() => setIsOpen(false)}>
                      Our Stories
                    </Link>
                    <Link to="/media-development" className="block text-muted-foreground hover:text-accent transition-colors font-medium py-2" onClick={() => setIsOpen(false)}>
                      Media Development
                    </Link>
                  </div>
                )}
              </div>
              <Link to="/georgia-media" className="block text-foreground hover:text-accent transition-colors font-semibold py-2" onClick={() => setIsOpen(false)}>
                GA Media
              </Link>
              <Link to="/academy" className="block text-yellow-500 hover:text-yellow-400 transition-colors font-semibold py-2" onClick={() => setIsOpen(false)}>
                🏆 Champion Academy
              </Link>
              
              {/* Mobile Donate Accordion */}
              <div>
                <button 
                  className={`flex items-center justify-between w-full text-primary hover:text-accent transition-colors font-semibold py-2 ${isActive("/donate") || isActive("/donate/usaa") || isActive("/community") || isActive("/volunteer") ? "text-accent" : ""}`}
                  onClick={() => setMobileDonateOpen(!mobileDonateOpen)}
                >
                  Donate
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileDonateOpen ? "rotate-180" : ""}`} />
                </button>
                {mobileDonateOpen && (
                  <div className="pl-4 space-y-1 pt-1">
                    <Link to="/donate" className="block text-muted-foreground hover:text-accent transition-colors font-medium py-2" onClick={() => setIsOpen(false)}>
                      Make a Donation
                    </Link>
                    <Link to="/donate/usaa" className="block text-muted-foreground hover:text-accent transition-colors font-medium py-2" onClick={() => setIsOpen(false)}>
                      USAA Partnership
                    </Link>
                    <Link to="/community" className="block text-muted-foreground hover:text-accent transition-colors font-medium py-2" onClick={() => setIsOpen(false)}>
                      Community Chat
                    </Link>
                    <Link to="/volunteer" className="block text-muted-foreground hover:text-accent transition-colors font-medium py-2" onClick={() => setIsOpen(false)}>
                      Volunteer
                    </Link>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col gap-3 pt-4 border-t border-border">
                <div className="flex gap-3">
                  <Link to="/training" className="flex-1" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full">
                      Football Training
                    </Button>
                  </Link>
                  <Link to="/auth" className="flex-1" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full">
                      Member Login
                    </Button>
                  </Link>
                </div>
                <Button variant="hero" size="sm" className="w-full" onClick={handleGetStarted}>
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
