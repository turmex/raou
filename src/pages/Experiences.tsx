import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import familyImage from "@/assets/family-holidays.jpg";
import honeymoonImage from "@/assets/honeymoons.jpg";
import safariImage from "@/assets/safari-holidays.jpg";
import remoteImage from "@/assets/remote-destinations.jpg";
import unusualImage from "@/assets/unusual-holidays.jpg";

const experiencesData = {
  who: [
    {
      title: "Family Holidays",
      slug: "family",
      description: "Creating memories that last generations with experiences for all ages",
      image: familyImage,
    },
    {
      title: "Honeymoons",
      slug: "honeymoons",
      description: "Begin your journey together in paradise with romantic escapes",
      image: honeymoonImage,
    },
    {
      title: "Couples Holidays",
      slug: "couples",
      description: "Reconnect and rediscover together with intimate getaways",
      image: honeymoonImage,
    },
    {
      title: "Solo Holidays",
      slug: "solo",
      description: "Discover yourself while discovering the world on your own terms",
      image: remoteImage,
    },
    {
      title: "Group Holidays",
      slug: "group",
      description: "Shared adventures and lasting friendships with friends and family",
      image: familyImage,
    },
  ],
  what: [
    {
      title: "Safari Holidays",
      slug: "safari",
      description: "Witness nature's greatest spectacle in Africa's wilderness",
      image: safariImage,
    },
    {
      title: "Remote Destinations",
      slug: "remote",
      description: "Journey to the edge of the map and discover pristine corners",
      image: remoteImage,
    },
    {
      title: "Adventure Holidays",
      slug: "adventure",
      description: "Push boundaries and create stories with thrilling experiences",
      image: safariImage,
    },
    {
      title: "Beach Holidays",
      slug: "beach",
      description: "Sun, sand, and serenity on the world's most beautiful coastlines",
      image: honeymoonImage,
    },
    {
      title: "Unusual Holidays",
      slug: "unusual",
      description: "Experiences beyond imagination that defy convention",
      image: unusualImage,
    },
    {
      title: "Slow Holidays",
      slug: "slow",
      description: "Savor every moment with immersive cultural experiences",
      image: remoteImage,
    },
    {
      title: "Train Travel",
      slug: "train",
      description: "Journey in elegant comfort aboard luxury trains",
      image: unusualImage,
    },
  ],
  remarkable: [
    {
      title: "Eclipse Service",
      slug: "eclipse",
      description: "Witness celestial wonders with expertly curated viewing experiences",
      image: remoteImage,
    },
    {
      title: "Proposal Travel",
      slug: "proposal",
      description: "The perfect moment, perfectly planned for your special question",
      image: honeymoonImage,
    },
  ],
};

const Experiences = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-20">
        {/* Hero */}
        <section className="py-24 bg-muted">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="text-5xl md:text-7xl font-serif mb-6 animate-fade-in-up">
              Curated Experiences
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: "100ms" }}>
              Every journey is thoughtfully designed to inspire curiosity, awaken wonder, 
              and create experiences that last a lifetime
            </p>
          </div>
        </section>

        {/* Who's Traveling */}
        <section className="py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-serif mb-4">Who's Traveling?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Tailored experiences for every type of traveler
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {experiencesData.who.map((exp, index) => (
                <Link
                  key={exp.slug}
                  to={`/experiences/${exp.slug}`}
                  className="group animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Card className="overflow-hidden border-0 shadow-card hover:shadow-luxury transition-all duration-300 hover:scale-105">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={exp.image}
                        alt={exp.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-overlay opacity-60 group-hover:opacity-80 transition-opacity"></div>
                      <div className="absolute inset-0 flex items-end p-6">
                        <h3 className="text-2xl font-serif text-white">{exp.title}</h3>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <p className="text-muted-foreground mb-4">{exp.description}</p>
                      <div className="flex items-center gap-2 text-accent font-medium group-hover:gap-3 transition-all">
                        Explore
                        <ArrowRight size={16} />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* What Type of Holiday */}
        <section className="py-24 bg-muted">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-serif mb-4">What Type of Holiday?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Choose your adventure style
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {experiencesData.what.map((exp, index) => (
                <Link
                  key={exp.slug}
                  to={`/experiences/${exp.slug}`}
                  className="group animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Card className="overflow-hidden border-0 shadow-card hover:shadow-luxury transition-all duration-300 hover:scale-105">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={exp.image}
                        alt={exp.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-overlay opacity-60 group-hover:opacity-80 transition-opacity"></div>
                      <div className="absolute inset-0 flex items-end p-6">
                        <h3 className="text-2xl font-serif text-white">{exp.title}</h3>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <p className="text-muted-foreground mb-4">{exp.description}</p>
                      <div className="flex items-center gap-2 text-accent font-medium group-hover:gap-3 transition-all">
                        Discover
                        <ArrowRight size={16} />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Remarkable Experiences */}
        <section className="py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-serif mb-4">Remarkable Experiences</h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Our signature journeys designed to create unforgettable moments
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
              {experiencesData.remarkable.map((exp, index) => (
                <Link
                  key={exp.slug}
                  to={`/experiences/${exp.slug}`}
                  className="group animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Card className="overflow-hidden border-0 shadow-card hover:shadow-luxury transition-all duration-300 hover:scale-105">
                    <div className="relative h-80 overflow-hidden">
                      <img
                        src={exp.image}
                        alt={exp.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-overlay opacity-60 group-hover:opacity-80 transition-opacity"></div>
                      <div className="absolute inset-0 flex items-end p-8">
                        <div>
                          <h3 className="text-3xl font-serif text-white mb-2">{exp.title}</h3>
                          <p className="text-white/90">{exp.description}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Experiences;
