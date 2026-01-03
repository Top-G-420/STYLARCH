import { Home, Building2, FileSearch, FolderKanban } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { architecturalStyles } from "@/data/architecturalStyles";
import heroBlueprint from "@/assets/hero-blueprint.jpg";

const quickAccessItems = [
  {
    icon: Home,
    title: "Residential Design",
    description: "Create beautiful homes and apartments",
    path: "/design?type=residential",
    color: "bg-blueprint/10 text-blueprint",
  },
  {
    icon: Building2,
    title: "Commercial Design",
    description: "Design offices, retail, and industrial spaces",
    path: "/design?type=commercial",
    color: "bg-copper/10 text-copper",
  },
  {
    icon: FileSearch,
    title: "Interpret Design",
    description: "Upload and analyze existing designs",
    path: "/interpret",
    color: "bg-muted text-foreground",
  },
  {
    icon: FolderKanban,
    title: "Project Management",
    description: "Track and manage projects",
    path: "/projects",
    color: "bg-accent/10 text-accent",
  },
];

export default function Index() {
  const navigate = useNavigate();

  const handleStyleClick = (prompt: string) => {
    navigate(`/design?prompt=${encodeURIComponent(prompt)}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground min-h-[80vh] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${heroBlueprint})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/70" />
        <div className="container mx-auto px-4 py-20 lg:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold mb-6 animate-fade-in">
              Welcome to <span className="text-accent">STYLARCH</span>
            </h1>
            <p
              className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto animate-slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              AI-driven architectural assistant that makes professional building
              design simple. Create, modify, and interpret floorplans in minutes
              for homes, offices, and large commercial spaces.
            </p>
            <div
              className="flex flex-wrap justify-center gap-4 animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <Button variant="hero" size="xl" asChild>
                <Link to="/design">Start Designing</Link>
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Link to="/faqs">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Quick Access Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Quick Access
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Jump right into what you need. Our AI-powered tools are ready to
              help you design, analyze, and manage your architectural projects.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickAccessItems.map((item, index) => (
              <Link key={item.title} to={item.path}>
                <Card
                  className="h-full hover-lift cursor-pointer group hover:border-accent/50"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <item.icon className="w-8 h-8" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Architectural Styles Section */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Modern Architectural Inspiration
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore a comprehensive collection of architectural styles. Click
              any style to start designing with that aesthetic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {architecturalStyles.map((style, index) => (
              <Card
                key={style.id}
                className="overflow-hidden hover-lift cursor-pointer group"
                onClick={() => handleStyleClick(style.prompt)}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={style.image}
                    alt={style.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-5">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                    {style.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {style.description}
                  </p>
                  <p className="text-xs text-blueprint font-medium">
                    Floor Plan: {style.floorPlanCharacteristics.slice(0, 80)}...
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Create Your Vision?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start a new project and let our AI help you bring your
              architectural dreams to life.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/design">Start New Project</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
