import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { useContent } from "@/hooks/useContent";
import bespokeImage from "@/assets/bespoke-travel.jpg";

const About = () => {
  const { content } = useContent();

  if (!content) return null;

  const { about } = content;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-20">
        {/* Hero */}
        <section className="relative h-[60vh] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${about.hero.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-hero"></div>
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-serif text-primary-foreground mb-6">{about.hero.title}</h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              {about.hero.subtitle}
            </p>
          </div>
        </section>

        {/* What We're About */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-serif mb-8 text-center">{about.whatWereAbout.title}</h2>

              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                {about.whatWereAbout.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Philosophy */}
        <section id="philosophy" className="py-24 bg-muted">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-serif mb-6 text-center">{about.philosophy.title}</h2>
              <p className="text-xl text-center text-muted-foreground mb-16 max-w-3xl mx-auto">
                {about.philosophy.subtitle}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {about.philosophy.values.map((value, index) => (
                  <Card key={value.title} className="border-0 shadow-card animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                    <CardContent className="p-6">
                      <div className="text-accent text-4xl font-serif mb-3">{String(index + 1).padStart(2, '0')}</div>
                      <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why RAOU */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-serif mb-12 text-center">{about.whyChooseRaou.title}</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {about.whyChooseRaou.items.map((item, index) => (
                  <Card key={item.title} className="border-0 shadow-card text-center animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                    <CardContent className="p-8">
                      <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <div className="text-2xl font-serif text-accent">{index + 1}</div>
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Commitment */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-serif mb-6">{about.commitment.title}</h2>
              {about.commitment.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-lg mb-8">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default About;
