import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Users, Heart, Compass, Mountain, Palmtree, Train, Sparkles, Globe } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useContent } from "@/hooks/useContent";
import heroImage from "@/assets/hero-background.jpg";
import familyImage from "@/assets/family-holidays.jpg";
import honeymoonImage from "@/assets/honeymoons.jpg";
import safariImage from "@/assets/safari-holidays.jpg";
import remoteImage from "@/assets/remote-destinations.jpg";
import unusualImage from "@/assets/unusual-holidays.jpg";
import bespokeImage from "@/assets/bespoke-travel.jpg";

// Icon mapping for dynamic rendering
const iconMap: Record<string, any> = {
  Users,
  Heart,
  Compass,
  Mountain,
  Palmtree,
  Train,
  Sparkles,
  Globe,
};

const Home = () => {
  const { content } = useContent();

  if (!content) return null;

  const { home, experiences, destinations } = content;
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-hero"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center animate-fade-in-up">
          <p className="text-primary-foreground/90 uppercase tracking-widest text-sm mb-4">{home.hero.subtitle}</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-primary-foreground mb-6 leading-tight">
            {home.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-12 max-w-3xl mx-auto">
            {home.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
              <Link to={home.hero.primaryCta.path}>{home.hero.primaryCta.label}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <Link to={home.hero.secondaryCta.path}>{home.hero.secondaryCta.label}</Link>
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-primary-foreground/50 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Who Are You Traveling With */}
      <section className="py-24 bg-brand-warm">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-serif mb-4">{home.whosTraveling.title}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {home.whosTraveling.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {experiences.who.map((item, index) => {
              const Icon = iconMap[item.icon] || Users;
              return (
                <Link
                  key={item.slug}
                  to={item.link || `/experiences/${item.slug}`}
                  className="group animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Card className="overflow-hidden border-0 shadow-card hover:shadow-luxury transition-all duration-300 group-hover:scale-105">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-overlay opacity-60 group-hover:opacity-80 transition-opacity"></div>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                        <Icon size={40} className="mb-3" />
                        <h3 className="text-xl font-semibold">{item.title}</h3>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-4">{home.featuredDestinations.title}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {home.featuredDestinations.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.slice(0, 4).map((dest, index) => (
              <Card
                key={dest.slug}
                className="group overflow-hidden border-0 shadow-card hover:shadow-luxury transition-all duration-300 hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-80">
                  <img
                    src={dest.image}
                    alt={dest.region}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-overlay"></div>
                  <CardContent className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                    <span className="text-sm uppercase tracking-wider text-accent mb-2">Region</span>
                    <h3 className="text-2xl font-serif mb-3">{dest.region}</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {dest.countries.slice(0, 3).map((country) => (
                        <span key={country} className="text-xs px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                          {country}
                        </span>
                      ))}
                    </div>
                    <Link
                      to={`/destinations/${dest.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors"
                    >
                      Explore {dest.region}
                      <ArrowRight size={16} />
                    </Link>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What Type of Holiday */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-4">{home.whatCallsToYou.title}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{home.whatCallsToYou.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.what.map((item, index) => {
              const Icon = iconMap[item.icon] || Mountain;
              return (
                <Link
                  key={item.slug}
                  to={item.link || `/experiences/${item.slug}`}
                  className="group animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Card className="overflow-hidden border-0 shadow-card hover:shadow-luxury transition-all duration-300">
                    <div className="relative h-72 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-overlay opacity-50 group-hover:opacity-70 transition-opacity"></div>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                        <Icon size={48} className="mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="text-2xl font-semibold text-center">{item.title}</h3>
                        <ArrowRight className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Remarkable Experiences */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-4">{home.remarkableExperiences.title}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {home.remarkableExperiences.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {home.remarkableExperiences.items.map((item, index) => (
              <Card
                key={item.title}
                className="group overflow-hidden border-0 shadow-card hover:shadow-luxury transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-overlay opacity-60"></div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-serif mb-3">{item.title}</h3>
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                  <Button variant="link" className="p-0 h-auto text-accent group-hover:gap-3 gap-2 transition-all">
                    Learn more
                    <ArrowRight size={16} />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why RAOU */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">{home.whyRaou.title}</h2>
            <p className="text-xl mb-12 text-primary-foreground/90">
              {home.whyRaou.description}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              {content.about.philosophy.values.map((value, index) => (
                <div key={value.title} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                  <div className="text-accent text-4xl font-serif mb-2">{String(index + 1).padStart(2, "0")}</div>
                  <div className="text-sm uppercase tracking-wider">{value.title}</div>
                </div>
              ))}
            </div>

            <Button asChild size="lg" variant="secondary">
              <Link to={home.whyRaou.ctaPath}>{home.whyRaou.ctaLabel}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-brand-warm">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-serif mb-6">{home.finalCta.title}</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {home.finalCta.description}
          </p>
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <Link to={home.finalCta.ctaPath}>{home.finalCta.ctaLabel}</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
