
import { useState, useEffect } from "react";
import { Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('dancondurateanu@gmail.com');
      toast.success('Email Address Copied');
    } catch (err) {
      toast.error('Failed to copy email');
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/80 ${
      isScrolled ? 'backdrop-blur-md border-b border-border' : ''
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-xl font-bold gradient-text">
              Ioan Dan
            </div>
            <div className="text-sm text-muted-foreground">
              Fullstack Developer
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="hover:scale-110 transition-transform"
                asChild
              >
                <a href="https://www.linkedin.com/in/condurateanu-dan/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="hover:scale-110 transition-transform"
                onClick={copyEmail}
              >
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
