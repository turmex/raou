import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import safariImage from "@/assets/safari-holidays.jpg";
import remoteImage from "@/assets/remote-destinations.jpg";
import unusualImage from "@/assets/unusual-holidays.jpg";
import bespokeImage from "@/assets/bespoke-travel.jpg";
import honeymoonImage from "@/assets/honeymoons.jpg";
import familyImage from "@/assets/family-holidays.jpg";

const destinationsData = [
  {
    region: "South America",
    slug: "south-america",
    description: "From the Amazon rainforest to Patagonian glaciers, discover a continent of contrasts",
    countries: ["Argentina", "Brazil", "Chile", "Peru", "Colombia", "Ecuador"],
    image: remoteImage,
  },
  {
    region: "Central America",
    slug: "central-america",
    description: "Ancient ruins, pristine beaches, and vibrant cultures await",
    countries: ["Costa Rica", "Panama", "Guatemala", "Belize", "Nicaragua"],
    image: unusualImage,
  },
  {
    region: "Asia",
    slug: "asia",
    description: "Temples, traditions, and transformative experiences across the world's largest continent",
    countries: ["Japan", "Thailand", "Indonesia", "Vietnam", "India", "Sri Lanka"],
    image: bespokeImage,
  },
  {
    region: "Europe",
    slug: "europe",
    description: "Timeless elegance, rich history, and culinary excellence",
    countries: ["Italy", "France", "Spain", "Greece", "Portugal", "Switzerland"],
    image: honeymoonImage,
  },
  {
    region: "North America",
    slug: "north-america",
    description: "Diverse landscapes from Arctic tundra to tropical beaches",
    countries: ["USA", "Canada", "Mexico"],
    image: familyImage,
  },
  {
    region: "Africa",
    slug: "africa",
    description: "Epic wildlife, ancient civilizations, and landscapes that take your breath away",
    countries: ["South Africa", "Kenya", "Tanzania", "Morocco", "Botswana", "Rwanda"],
    image: safariImage,
  },
  {
    region: "The Caribbean",
    slug: "caribbean",
    description: "Island paradises with turquoise waters and white sand beaches",
    countries: ["Bahamas", "Jamaica", "Barbados", "St. Lucia", "Turks & Caicos"],
    image: honeymoonImage,
  },
  {
    region: "Middle East",
    slug: "middle-east",
    description: "Where ancient history meets modern luxury",
    countries: ["UAE", "Jordan", "Oman", "Israel", "Lebanon"],
    image: unusualImage,
  },
];

const Destinations = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-20">
        {/* Hero */}
        <section className="py-24 bg-muted">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="text-5xl md:text-7xl font-serif mb-6 animate-fade-in-up">
              Explore the World
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: "100ms" }}>
              From remote wilderness to cultural capitals, discover destinations that inspire wonder and create lasting memories
            </p>
          </div>
        </section>

        {/* Destinations Grid */}
        <section className="py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {destinationsData.map((dest, index) => (
                <Card
                  key={dest.slug}
                  className="group overflow-hidden border-0 shadow-card hover:shadow-luxury transition-all duration-300 hover:scale-[1.02] animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={dest.image}
                      alt={dest.region}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-overlay"></div>
                    <div className="absolute top-6 left-6">
                      <span className="text-xs uppercase tracking-widest text-accent bg-accent/20 backdrop-blur-sm px-3 py-1 rounded-full">
                        Region
                      </span>
                    </div>
                  </div>

                  <CardContent className="p-8">
                    <h2 className="text-3xl font-serif mb-3 group-hover:text-accent transition-colors">
                      {dest.region}
                    </h2>
                    <p className="text-muted-foreground mb-6">{dest.description}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {dest.countries.slice(0, 6).map((country) => (
                        <Link
                          key={country}
                          to={`/destinations/${country.toLowerCase().replace(/ /g, "-")}`}
                          className="text-sm px-3 py-1 bg-muted hover:bg-accent hover:text-accent-foreground rounded-full transition-colors"
                        >
                          {country}
                        </Link>
                      ))}
                    </div>

                    <Link
                      to={`/destinations/${dest.slug}`}
                      className="inline-flex items-center gap-2 text-accent font-medium hover:gap-3 transition-all"
                    >
                      Explore {dest.region}
                      <ArrowRight size={20} />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Planning CTA */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Not Sure Where to Go?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-primary-foreground/90">
              Let us help you discover your perfect destination based on your interests and travel style
            </p>
            <Link
              to="/trip-finder"
              className="inline-flex items-center gap-3 bg-accent text-accent-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-accent/90 transition-colors"
            >
              Take Our Trip Finder Quiz
              <ArrowRight size={24} />
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Destinations;
