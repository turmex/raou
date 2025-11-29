import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useContent } from "@/hooks/useContent";
import logo from "@/assets/logo.png";

export const Navigation = () => {
  const { content } = useContent();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Always use dark text/white background
  const useDarkText = true;

  // Default data while loading
  const destinations = content?.destinations || [];
  const experiences = content?.experiences || { who: [], what: [], remarkable: [] };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          "bg-background/95 backdrop-blur-md shadow-lg border-b border-border"
        )}
      >
        <nav className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <img
                src={logo}
                alt="RAOU"
                className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <NavigationMenu>
                <NavigationMenuList className="gap-2">
                  <NavigationMenuItem>
                    <Link to="/" className="px-4 py-2 text-sm font-medium transition-colors hover:text-accent text-foreground">
                      HOME
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-sm font-medium hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent text-foreground hover:text-accent">
                      DESTINATIONS
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[800px] p-6 bg-background">
                        <div className="grid grid-cols-4 gap-6">
                          {destinations.map((dest) => (
                            <div key={dest.region}>
                              <h4 className="font-semibold mb-3 text-foreground">{dest.region}</h4>
                              <ul className="space-y-2">
                                {dest.countries.slice(0, 4).map((country) => {
                                  const countrySlug = country.toLowerCase().replace(/ /g, "-");
                                  const countryLink = dest.countryLinks?.[country] || `/destinations/${countrySlug}`;
                                  return (
                                    <li key={country}>
                                      <Link
                                        to={countryLink}
                                        className="text-sm text-muted-foreground hover:text-accent transition-colors"
                                      >
                                        {country}
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-sm font-medium hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent text-foreground hover:text-accent">
                      EXPERIENCES
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[700px] p-6 bg-background">
                        <div className="grid grid-cols-3 gap-8">
                          <div>
                            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-accent">Who</h4>
                            <ul className="space-y-2">
                              {experiences.who.map((exp) => (
                                <li key={exp.title}>
                                  <Link
                                    to={exp.link}
                                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                                  >
                                    {exp.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-accent">What</h4>
                            <ul className="space-y-2">
                              {experiences.what.map((exp) => (
                                <li key={exp.title}>
                                  <Link
                                    to={exp.link}
                                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                                  >
                                    {exp.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-accent">Remarkable</h4>
                            <ul className="space-y-2">
                              {experiences.remarkable.map((exp) => (
                                <li key={exp.title}>
                                  <Link
                                    to={exp.link}
                                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                                  >
                                    {exp.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link to="/about" className="px-4 py-2 text-sm font-medium transition-colors hover:text-accent text-foreground">
                      ABOUT
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link to="/contact" className="px-4 py-2 text-sm font-medium transition-colors hover:text-accent text-foreground">
                      CONTACT
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              <Button asChild variant="default" size="lg" className="ml-4">
                <Link to="/trip-finder">Start Your Trip</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 transition-colors text-foreground"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-background pt-20 overflow-y-auto">
          <div className="container mx-auto px-4 py-8">
            <nav className="flex flex-col gap-6">
              <Link to="/" className="text-lg font-medium py-2">HOME</Link>
              <Link to="/destinations" className="text-lg font-medium py-2">DESTINATIONS</Link>
              <Link to="/experiences" className="text-lg font-medium py-2">EXPERIENCES</Link>
              <Link to="/about" className="text-lg font-medium py-2">ABOUT</Link>
              <Link to="/contact" className="text-lg font-medium py-2">CONTACT</Link>
              <Button asChild size="lg" className="mt-4">
                <Link to="/trip-finder">Start Your Trip</Link>
              </Button>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};
