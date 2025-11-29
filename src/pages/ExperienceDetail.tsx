import { useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Heart, Compass } from "lucide-react";
import familyImage from "@/assets/family-holidays.jpg";
import honeymoonImage from "@/assets/honeymoons.jpg";
import safariImage from "@/assets/safari-holidays.jpg";
import remoteImage from "@/assets/remote-destinations.jpg";
import unusualImage from "@/assets/unusual-holidays.jpg";

const experienceData: Record<string, any> = {
  family: {
    title: "Family Holidays",
    subtitle: "Creating memories that last generations",
    icon: Users,
    image: familyImage,
    description: "Luxury family holidays designed with every generation in mind. From toddlers to teens, we create experiences that delight all ages while ensuring parents can truly relax and enjoy.",
    types: [
      { title: "Toddlers", description: "Luxury family holidays with toddlers", link: "/experiences/family/toddlers" },
      { title: "Teens", description: "Specially selected luxury trips for teenagers", link: "/experiences/family/teens" },
      { title: "Adults", description: "High end holidays for families with older kids", link: "/experiences/family/adults" },
      { title: "Multi-Generational", description: "Luxury travel for multi-generational families", link: "/experiences/family/multi-generational" },
    ],
  },
  honeymoons: {
    title: "Honeymoons",
    subtitle: "Begin your journey together in paradise",
    icon: Heart,
    image: honeymoonImage,
    description: "Romantic escapes crafted for newlyweds seeking the perfect blend of adventure, relaxation, and intimacy. Let us create unforgettable moments as you celebrate your love.",
    types: [
      { title: "Beach Retreats", description: "Pristine shores and turquoise waters", link: "/experiences/honeymoons/beach-retreats" },
      { title: "Adventure Romance", description: "Combine thrills with intimate moments", link: "/experiences/honeymoons/adventure-romance" },
      { title: "Cultural Journeys", description: "Discover the world together", link: "/experiences/honeymoons/cultural-journeys" },
      { title: "Island Escapes", description: "Private paradises for two", link: "/experiences/honeymoons/island-escapes" },
    ],
  },
  couples: {
    title: "Couples Holidays",
    subtitle: "Reconnect and rediscover together",
    icon: Heart,
    image: honeymoonImage,
    description: "Whether celebrating an anniversary or simply seeking quality time together, our couples' experiences blend romance, adventure, and relaxation.",
    types: [
      { title: "Romantic Getaways", description: "Intimate escapes to stunning locations", link: "/experiences/couples/romantic-getaways" },
      { title: "Adventure for Two", description: "Share thrilling experiences", link: "/experiences/couples/adventure-for-two" },
      { title: "Wellness Retreats", description: "Rejuvenate together", link: "/experiences/couples/wellness-retreats" },
      { title: "Cultural Exploration", description: "Discover new horizons as a couple", link: "/experiences/couples/cultural-exploration" },
    ],
  },
  solo: {
    title: "Solo Holidays",
    subtitle: "Discover yourself while discovering the world",
    icon: Compass,
    image: remoteImage,
    description: "Empowering solo travelers with carefully curated experiences that offer the perfect balance of independence, safety, and opportunity to connect with like-minded adventurers.",
    types: [
      { title: "Solo Adventures", description: "Challenging yet safe expeditions", link: "/experiences/solo/solo-adventures" },
      { title: "Cultural Immersion", description: "Deep dives into local life", link: "/experiences/solo/cultural-immersion" },
      { title: "Wellness Journeys", description: "Self-discovery and rejuvenation", link: "/experiences/solo/wellness-journeys" },
      { title: "Photography Tours", description: "Capture the world's beauty", link: "/experiences/solo/photography-tours" },
    ],
  },
  group: {
    title: "Group Holidays",
    subtitle: "Shared adventures, lasting friendships",
    icon: Users,
    image: familyImage,
    description: "Whether friends, extended family, or special interest groups, we design journeys that bring people together through shared experiences and discovery.",
    types: [
      { title: "Friends & Celebrations", description: "Milestone celebrations with your circle", link: "/experiences/group/friends-celebrations" },
      { title: "Extended Family", description: "Multi-family adventures", link: "/experiences/group/extended-family" },
      { title: "Special Interest", description: "Photography, culinary, wellness groups", link: "/experiences/group/special-interest" },
      { title: "Corporate Retreats", description: "Team building in extraordinary places", link: "/experiences/group/corporate-retreats" },
    ],
  },
  safari: {
    title: "Safari Holidays",
    subtitle: "Witness nature's greatest spectacle",
    icon: Compass,
    image: safariImage,
    description: "From the Serengeti to the Okavango Delta, experience Africa's wildlife in luxury lodges and intimate camps that bring you close to nature without compromising comfort.",
    types: [
      { title: "Classic Safari", description: "Traditional game drives and luxury lodges", link: "/experiences/safari/classic-safari" },
      { title: "Walking Safari", description: "Intimate encounters on foot", link: "/experiences/safari/walking-safari" },
      { title: "Migration Safari", description: "Witness the Great Migration", link: "/experiences/safari/migration-safari" },
      { title: "Gorilla Trekking", description: "Once-in-a-lifetime primate encounters", link: "/experiences/safari/gorilla-trekking" },
    ],
  },
  remote: {
    title: "Remote Destinations",
    subtitle: "Journey to the edge of the map",
    icon: Compass,
    image: remoteImage,
    description: "For those seeking true escape, we offer access to the world's most pristine and untouched corners, where few travelers venture.",
    types: [
      { title: "Arctic Expeditions", description: "Polar bears and northern lights", link: "/experiences/remote/arctic-expeditions" },
      { title: "Antarctic Cruises", description: "The final frontier", link: "/experiences/remote/antarctic-cruises" },
      { title: "Island Isolation", description: "Private island paradises", link: "/experiences/remote/island-isolation" },
      { title: "Mountain Hideaways", description: "High-altitude serenity", link: "/experiences/remote/mountain-hideaways" },
    ],
  },
  adventure: {
    title: "Adventure Holidays",
    subtitle: "Push boundaries, create stories",
    icon: Compass,
    image: safariImage,
    description: "For the thrill-seekers and adrenaline enthusiasts, we design adventures that challenge and exhilarate while maintaining the highest safety standards.",
    types: [
      { title: "Mountain Expeditions", description: "Trekking to legendary peaks", link: "/experiences/adventure/mountain-expeditions" },
      { title: "Water Sports", description: "Diving, surfing, and sailing", link: "/experiences/adventure/water-sports" },
      { title: "Desert Adventures", description: "Dune bashing and camel treks", link: "/experiences/adventure/desert-adventures" },
      { title: "Extreme Sports", description: "Skydiving, bungee, and more", link: "/experiences/adventure/extreme-sports" },
    ],
  },
  beach: {
    title: "Beach Holidays",
    subtitle: "Sun, sand, and serenity",
    icon: Compass,
    image: honeymoonImage,
    description: "From the Maldives to the Mediterranean, discover the world's most beautiful coastlines with exclusive beach access and world-class resorts.",
    types: [
      { title: "Tropical Paradise", description: "Palm-fringed shores and crystal waters", link: "/experiences/beach/tropical-paradise" },
      { title: "Mediterranean Charm", description: "Historic coasts and azure seas", link: "/experiences/beach/mediterranean-charm" },
      { title: "Caribbean Dreams", description: "Island-hopping in paradise", link: "/experiences/beach/caribbean-dreams" },
      { title: "Private Islands", description: "Your own slice of heaven", link: "/experiences/beach/private-islands" },
    ],
  },
  unusual: {
    title: "Unusual Holidays",
    subtitle: "Experiences beyond imagination",
    icon: Compass,
    image: unusualImage,
    description: "For those who seek the extraordinary, we curate unique experiences that defy convention and create stories worth telling.",
    types: [
      { title: "Space Tourism", description: "The ultimate frontier", link: "/experiences/unusual/space-tourism" },
      { title: "Submarine Exploration", description: "Discover the ocean depths", link: "/experiences/unusual/submarine-exploration" },
      { title: "Ice Hotel Stays", description: "Sleep in sculpted ice", link: "/experiences/unusual/ice-hotel-stays" },
      { title: "Desert Camping", description: "Luxury under the stars", link: "/experiences/unusual/desert-camping" },
    ],
  },
  slow: {
    title: "Slow Holidays",
    subtitle: "Savor every moment",
    icon: Compass,
    image: remoteImage,
    description: "In a world that rushes, we invite you to slow down. Immerse yourself deeply in a destination, connecting with local culture and rhythms.",
    types: [
      { title: "Village Stays", description: "Live like a local", link: "/experiences/slow/village-stays" },
      { title: "Cooking Immersions", description: "Master regional cuisines", link: "/experiences/slow/cooking-immersions" },
      { title: "Art & Craft", description: "Learn traditional skills", link: "/experiences/slow/art-craft" },
      { title: "Wine Country", description: "Vineyard tours and tastings", link: "/experiences/slow/wine-country" },
    ],
  },
  train: {
    title: "Train Travel",
    subtitle: "Journey in elegant comfort",
    icon: Compass,
    image: unusualImage,
    description: "Experience the romance of rail travel aboard the world's most luxurious trains, where the journey is as magnificent as the destination.",
    types: [
      { title: "Orient Express", description: "European elegance on rails", link: "/experiences/train/orient-express" },
      { title: "Trans-Siberian", description: "Cross continents in style", link: "/experiences/train/trans-siberian" },
      { title: "Rocky Mountaineer", description: "Scenic Canadian journeys", link: "/experiences/train/rocky-mountaineer" },
      { title: "Royal Scotsman", description: "Highland luxury", link: "/experiences/train/royal-scotsman" },
    ],
  },
  eclipse: {
    title: "Eclipse Service",
    subtitle: "Witness celestial wonders",
    icon: Compass,
    image: remoteImage,
    description: "Join us for nature's most spectacular phenomenon. We position you in the best locations worldwide to witness total solar eclipses in comfort and style.",
    types: [
      { title: "Solar Eclipses", description: "Total eclipse viewing experiences", link: "/experiences/eclipse/solar-eclipses" },
      { title: "Lunar Events", description: "Super moons and blood moons", link: "/experiences/eclipse/lunar-events" },
      { title: "Meteor Showers", description: "Stargazing in dark sky reserves", link: "/experiences/eclipse/meteor-showers" },
      { title: "Aurora Borealis", description: "Northern lights adventures", link: "/experiences/eclipse/aurora-borealis" },
    ],
  },
  proposal: {
    title: "Proposal Travel",
    subtitle: "The perfect moment, perfectly planned",
    icon: Heart,
    image: honeymoonImage,
    description: "Make your proposal unforgettable with our bespoke planning service. We handle every detail to create a magical moment neither of you will ever forget.",
    types: [
      { title: "Romantic Destinations", description: "Picture-perfect proposal spots", link: "/experiences/proposal/romantic-destinations" },
      { title: "Adventure Proposals", description: "Pop the question with a thrill", link: "/experiences/proposal/adventure-proposals" },
      { title: "Private Events", description: "Intimate celebrations", link: "/experiences/proposal/private-events" },
      { title: "Surprise Planning", description: "Complete secrecy guaranteed", link: "/experiences/proposal/surprise-planning" },
    ],
  },
};

const ExperienceDetail = () => {
  const { slug } = useParams();
  const experience = experienceData[slug || ""] || experienceData.family;
  const Icon = experience.icon;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-20">
        {/* Hero */}
        <section className="relative h-[70vh] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${experience.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-hero"></div>
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center animate-fade-in-up">
            <Icon className="w-16 h-16 text-primary-foreground mx-auto mb-4" />
            <h1 className="text-5xl md:text-7xl font-serif text-primary-foreground mb-4">
              {experience.title}
            </h1>
            <p className="text-2xl text-primary-foreground/90 max-w-2xl mx-auto">
              {experience.subtitle}
            </p>
          </div>
        </section>

        {/* Overview */}
        <section className="py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <p className="text-xl text-muted-foreground leading-relaxed">
                {experience.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {experience.types.map((type: any, index: number) => (
                <Card
                  key={type.title}
                  className="group border-0 shadow-card hover:shadow-luxury transition-all duration-300 hover:scale-105 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-serif mb-3 group-hover:text-accent transition-colors">
                      {type.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">{type.description}</p>
                    <Link to={type.link}>
                      <Button variant="link" className="p-0 h-auto text-accent group-hover:gap-3 gap-2 transition-all">
                        Explore
                        <ArrowRight size={16} />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-muted">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Ready to Begin?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's craft your perfect {experience.title.toLowerCase()} experience
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/trip-finder">Start Planning</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default ExperienceDetail;
