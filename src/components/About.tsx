
import { Button } from "@/components/ui/button";
import { Github, Linkedin } from "lucide-react";

export const About = () => {
  const skills = [
    "React", "JavaScript", "TypeScript", "Tailwind CSS", "Pocketbase", "Claude Code", "Midjourney", "Cursor"
  ];

  return (
    <section id="about" className="min-h-screen flex items-center justify-center py-20 px-6">
      <div className="container mx-auto text-center">
        <div className="animate-float mb-8">
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="gradient-text">Ioan</span> Dan
          </h1>
        </div>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8">
          Fullstack Developer
        </p>
        
        <div className="flex justify-center space-x-4 mb-16">
          <Button 
            variant="outline" 
            size="icon"
            className="hover:scale-110 transition-transform"
            asChild
          >
            <a href="https://github.com/metalizzer" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            className="hover:scale-110 transition-transform"
            asChild
          >
            <a href="https://www.linkedin.com/in/condurateanu-dan/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
        </div>

        <h2 className="text-4xl font-bold mb-16 gradient-text">
          About Me
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-in-left">
            <p className="text-lg text-muted-foreground mb-8">
              Junior fullstack developer driven by a passion for crafting fast, user-friendly applications that spark joy and deliver meaningful solutions for users.
            </p>
          </div>
          
          <div className="animate-fade-in">
            <h3 className="text-2xl font-semibold mb-6">Tech Stack</h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-secondary rounded-full text-secondary-foreground 
                           hover:bg-primary hover:text-primary-foreground transition-colors
                           cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
