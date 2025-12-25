
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";

export const Projects = () => {
  const handleTestClick = () => {
    alert('Test button works!');
  };

  const projects = [
    {
      title: "Haip - Game Playtesting Platform",
      description: "Complete website transformation from template to production-ready website: Rebranded logo, colors, fonts. Built custom case studies carousel with navigation, implemented animated testimonials system with infinite scroll. Created admin panels for content management, redesigned How It Works section with diagonal layout and custom cards. Added Analytics tracking and privacy compliance (cookie policy). Implemented professional booking system. Updated all contact info and social links. Fixed mobile responsiveness issues, and optimized typography across all breakpoints.",
      github: "#",
      live: "https://haip.space",
      image: "🎮",
      logo: "/Haip black logo copy.png"
    },
    {
      title: "Custom Wine Tasting Form",
      description: "Developed a dynamic wine tasting form that tailors input fields to each wine's unique attributes, stored in a database. This fullstack application enhances user engagement by providing a seamless, intuitive interface for wine enthusiasts and event organizers to record tasting notes. Developed the admin interface and report generation logic for a dynamic wine tasting form, enabling seamless management of wine data and insightful analytics for event organizers. Collaborated with a partner who built the user-facing frontend, ensuring smooth integration between back-end systems and an engaging user experience.",
      github: "#",
      live: "https://corks-wine-rating-dlay.vercel.app/",
      image: "🍷"
    },
    {
      title: "Steamroad Browser Game",
      description: "An interactive browser-based merchant trading game built with React and TypeScript. Players navigate a fantasy steampunk world, buying and selling goods between cities, completing quests, and engaging in turn-based combat while building their reputation and wealth. Key Features: Interactive map-based navigation system, Dynamic trading marketplace with fluctuating prices, Turn-based combat with gear and consumables, Quest and contract management, Character progression and reputation system, Real-time inventory and banking mechanics.",
      github: "#",
      live: "https://youtu.be/1qN1wwWJNJc",
      image: "📋"
    }
  ];

  return (
    <section id="projects" className="py-20 px-6 bg-secondary/20">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 gradient-text">
          Featured Projects
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={project.title} className="space-y-4">
              <Card
                className="gradient-border overflow-hidden hover:scale-105 transition-transform duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardHeader>
                  <div className="mb-4 text-center flex items-center justify-center" style={{ minHeight: '80px' }}>
                    {project.logo ? (
                      <img
                        src={project.logo}
                        alt={`${project.title} logo`}
                        className="h-16 w-auto object-contain"
                      />
                    ) : (
                      <div className="text-6xl">{project.image}</div>
                    )}
                  </div>
                  <CardTitle className="text-2xl mb-2">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    {project.description}
                  </p>
                </CardContent>
              </Card>
              
              {project.live !== "#" && (
                <div className="text-center">
                  <button 
                    onClick={() => {
                      window.open(project.live, '_blank');
                    }}
                    style={{
                      padding: '12px 24px',
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '14px'
                    }}
                  >
                    <ExternalLink className="h-4 w-4" />
                    {project.title === "Steamroad Browser Game" ? "Video Demo" : "Live Demo"}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
