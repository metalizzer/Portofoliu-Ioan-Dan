
import { Button } from "@/components/ui/button";
import { Github, Linkedin } from "lucide-react";

export const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="container mx-auto text-center animate-fade-in">
        <div className="animate-float">
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="gradient-text">Ioan</span> Dan
          </h1>
        </div>
        <p className="text-xl md:text-2xl text-muted-foreground mb-4">
          Fullstack Developer
        </p>
        
        <div className="flex justify-center space-x-4 mb-12">
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
      </div>
    </section>
  );
};
