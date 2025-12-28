
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export const Projects = () => {
  const [currentScreenshots, setCurrentScreenshots] = useState<{ [key: string]: number }>({});
  const [circleScales, setCircleScales] = useState<number[]>([0, 0, 0]);
  const [gradientOpacity, setGradientOpacity] = useState<number>(0);
  const [slideDirection, setSlideDirection] = useState<{ [key: string]: 'left' | 'right' }>({});
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const endSpaceRef = useRef<HTMLDivElement | null>(null);

  const projects = [
    {
      title: "Haip Custom Website",
      description: "Complete website transformation from template to production-ready website: Rebranded logo, colors, fonts. Built custom case studies carousel with navigation, implemented animated testimonials system with infinite scroll. Created admin panels for content management, redesigned How It Works section with diagonal layout and custom cards. Added Analytics tracking and privacy compliance (cookie policy). Implemented professional booking system. Updated all contact info and social links. Fixed mobile responsiveness issues, and optimized typography across all breakpoints.",
      github: "#",
      live: "https://haip.space",
      image: "🎮",
      logo: "/Haip black logo copy.png",
      screenshots: [
        "/Screenshot 2025-12-28 at 17.53.26.png",
        "/Screenshot 2025-12-28 at 17.33.05.png",
        "/Screenshot 2025-12-28 at 17.32.32.png",
        "/Screenshot 2025-12-28 at 17.31.46.png"
      ]
    },
    {
      title: "Custom Wine Tasting Form",
      description: "Developed a dynamic wine tasting form that tailors input fields to each wine's unique attributes, stored in a database. This fullstack application enhances user engagement by providing a seamless, intuitive interface for wine enthusiasts and event organizers to record tasting notes. Developed the admin interface and report generation logic for a dynamic wine tasting form, enabling seamless management of wine data and insightful analytics for event organizers. Collaborated with a partner who built the user-facing frontend, ensuring smooth integration between back-end systems and an engaging user experience.",
      github: "#",
      live: "https://corks-wine-rating-dlay.vercel.app/",
      image: "🍷",
      screenshots: [
        "/d4f2b18d-d26e-4b8f-abe1-b4472e2c80ec.JPG",
        "/ffa9bea5-5e5f-45c2-b3c2-7d2e8b9f8ddf.JPG"
      ]
    },
    {
      title: "Steamroad Browser Game",
      description: "An interactive browser-based merchant trading game built with React and TypeScript. Players navigate a fantasy steampunk world, buying and selling goods between cities, completing quests, and engaging in turn-based combat while building their reputation and wealth. Key Features: Interactive map-based navigation system, Dynamic trading marketplace with fluctuating prices, Turn-based combat with gear and consumables, Quest and contract management, Character progression and reputation system, Real-time inventory and banking mechanics.",
      github: "#",
      live: "https://youtu.be/1qN1wwWJNJc",
      image: "📋",
      screenshots: [
        "/Screenshot 2025-12-10 at 04.14.39.png",
        "/Screenshot 2025-12-10 at 05.01.24.png",
        "/Screenshot 2025-12-10 at 05.01.14.png"
      ]
    }
  ];

  const nextScreenshot = (projectTitle: string, totalScreenshots: number) => {
    setSlideDirection(prev => ({ ...prev, [projectTitle]: 'right' }));
    setCurrentScreenshots(prev => {
      const current = prev[projectTitle] ?? -1;
      const next = current + 1;
      return {
        ...prev,
        [projectTitle]: next >= totalScreenshots ? -1 : next
      };
    });
  };

  const prevScreenshot = (projectTitle: string, totalScreenshots: number) => {
    setSlideDirection(prev => ({ ...prev, [projectTitle]: 'left' }));
    setCurrentScreenshots(prev => {
      const current = prev[projectTitle] ?? -1;
      const previous = current - 1;
      return {
        ...prev,
        [projectTitle]: previous < -1 ? totalScreenshots - 1 : previous
      };
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const newScales = projectRefs.current.map((ref, index) => {
        if (!ref) return 0;

        const rect = ref.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const center = viewportHeight / 2;
        const elementCenter = rect.top + rect.height / 2;

        // Calculate distance from viewport center
        let distance = Math.abs(center - elementCenter);

        // Make circles 2 and 3 (index 1 and 2) start growing sooner by reducing their distance
        if (index === 1 || index === 2) {
          distance = Math.max(0, distance - viewportHeight * 0.3); // Start 30% earlier
        }

        const maxDistance = viewportHeight;

        // Scale from 0 to 1.1 based on proximity to center
        // Start growing when card enters viewport, reach 110% size at center
        const scale = Math.max(0, Math.min(1.1, 1.1 * (1 - distance / maxDistance)));

        return scale;
      });

      setCircleScales(newScales);

      // Calculate gradient opacity based on scroll position past the last card
      if (endSpaceRef.current) {
        const rect = endSpaceRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const endSpaceHeight = endSpaceRef.current.offsetHeight;

        // Start fading to black when the end space enters the viewport
        if (rect.top < viewportHeight) {
          // Total distance to scroll: from when endSpace enters until it completely exits viewport
          const totalScrollDistance = viewportHeight + endSpaceHeight;
          // Current scroll position into the endSpace
          const scrolledIntoSpace = viewportHeight - rect.top;
          // Progress from 0 to 1 based on scrolling through the entire endSpace
          const scrollProgress = Math.max(0, Math.min(1, scrolledIntoSpace / totalScrollDistance));
          setGradientOpacity(scrollProgress);
        } else {
          setGradientOpacity(0);
        }
      }
    };

    handleScroll(); // Initial calculation
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="projects" className="py-20 px-6 relative">
      <div className="container mx-auto max-w-7xl relative">
        <div className="flex flex-col gap-[66vh] lg:ml-[8%] lg:w-[60%] relative">
          {projects.map((project, index) => {
            let scale = circleScales[index] || 0;
            const ref = projectRefs.current[index];
            let circlePosition: 'fixed' | 'absolute' = 'fixed';
            let circleTop = '50vh';

            // Alternate circle positions: index 0,2,4... on left (20%), index 1,3,5... on right (80%)
            const circleLeft = index === 1 ? '80%' : '20%';

            // Circle size: first circle is smaller
            const circleSize = index === 0 ? 680 : 1200;

            // Tie circle to card's vertical position
            if (ref) {
              const rect = ref.getBoundingClientRect();
              const viewportHeight = window.innerHeight;
              const cardCenter = rect.top + rect.height / 2;

              // Always position the circle at the card's center
              circleTop = `${cardCenter}px`;

              // When the card center passes above the viewport center and is going off screen
              if (cardCenter < viewportHeight / 2 && rect.bottom < viewportHeight) {
                if (index === 0) {
                  // First circle continues growing as it moves up
                  const offset = viewportHeight / 2 - cardCenter;
                  scale = 1.1 + (offset / viewportHeight);
                } else {
                  scale = 1.1; // Keep other circles at 110% size when scrolling up
                }
              }
            }
            const currentScreenshot = currentScreenshots[project.title] ?? -1;
            const hasScreenshots = project.screenshots && project.screenshots.length > 0;
            const direction = slideDirection[project.title] || 'right';

            return (
              <div
                key={project.title}
                ref={(el) => (projectRefs.current[index] = el)}
                className="relative"
                style={{
                  minHeight: '0',
                  paddingTop: '0',
                  marginTop: index === 0 ? '400px' : '0'
                }}
              >
                {/* Expanding circles for this project */}
                <div className="pointer-events-none absolute inset-0" style={{ zIndex: -1 }}>
                  <div
                    style={{
                      position: circlePosition,
                      left: circleLeft,
                      top: circleTop,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    {/* Single large expanding circle */}
                    <div
                      className="absolute rounded-full"
                      style={{
                        width: `${circleSize}px`,
                        height: `${circleSize}px`,
                        left: `-${circleSize / 2}px`,
                        top: `-${circleSize / 2}px`,
                        willChange: 'transform, opacity',
                        transform: `scale(${scale})`,
                        opacity: scale,
                        background: 'linear-gradient(135deg, hsl(262 83% 58%) 0%, hsl(213 93% 68%) 100%)',
                        transition: 'transform 0.3s ease-out, opacity 0.3s ease-out'
                      }}
                    />
                  </div>
                </div>

                {/* LEVEL UP Text - between circles and cards */}
                {index === 0 && (
                  <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 flex flex-col items-center" style={{ fontSize: '200px', fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 900, lineHeight: 1 }}>
                      {[...Array(20)].map((_, idx) => (
                        <div
                          key={idx}
                          style={{
                            color: 'hsl(217 33% 8%)',
                            opacity: 1,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          LEVEL UP
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div
                  className="sticky"
                  style={{
                    bottom: '0',
                    top: 'auto',
                    zIndex: 1
                  }}
                >
                  <Card
                    className="gradient-border overflow-hidden transition-shadow duration-300 animate-fade-in hover:shadow-2xl"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <CardHeader className="relative pb-4">
                      <div className="flex items-start justify-between mb-3">
                        <CardTitle className="text-4xl font-bold flex-1 gradient-text">{project.title}</CardTitle>
                        {project.logo && (
                          <img
                            src={project.logo}
                            alt={`${project.title} logo`}
                            className="h-10 w-auto object-contain ml-4"
                          />
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="pt-6 pb-6">
                      {hasScreenshots ? (
                        <div className="relative group mb-6">
                          <div className="relative aspect-video bg-secondary/30 overflow-hidden rounded-lg">
                            {currentScreenshot === -1 ? (
                              <div
                                key={`text-${project.title}`}
                                className="w-full h-full flex items-center justify-center p-6 animate-slide-in"
                                style={{
                                  animation: `slideIn${direction === 'right' ? 'Right' : 'Left'} 0.4s ease-out`
                                }}
                              >
                                <p className="text-muted-foreground leading-relaxed text-center">
                                  {project.description}
                                </p>
                              </div>
                            ) : (
                              <img
                                key={`img-${project.title}-${currentScreenshot}`}
                                src={project.screenshots[currentScreenshot]}
                                alt={`${project.title} screenshot ${currentScreenshot + 1}`}
                                className="w-full h-full object-cover"
                                style={{
                                  animation: `slideIn${direction === 'right' ? 'Right' : 'Left'} 0.4s ease-out`
                                }}
                              />
                            )}

                            <button
                              onClick={() => prevScreenshot(project.title, project.screenshots.length)}
                              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 z-10"
                              aria-label="Previous screenshot"
                            >
                              <ChevronLeft className="h-6 w-6" />
                            </button>

                            <button
                              onClick={() => nextScreenshot(project.title, project.screenshots.length)}
                              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 z-10"
                              aria-label="Next screenshot"
                            >
                              <ChevronRight className="h-6 w-6" />
                            </button>

                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                              {[-1, ...project.screenshots.keys()].map((idx) => (
                                <div
                                  key={idx}
                                  className={`h-1.5 rounded-full transition-all ${
                                    idx === currentScreenshot
                                      ? 'w-6 bg-white'
                                      : 'w-1.5 bg-white/50'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          {project.description}
                        </p>
                      )}

                      {project.live !== "#" && (
                        <div className="text-center">
                          <Button
                            onClick={() => window.open(project.live, '_blank')}
                            size="lg"
                            className="px-8 relative z-10"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            {project.title === "Steamroad Browser Game" ? "Video Demo" : "Live Demo"}
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>

        {/* Extra scroll space after cards */}
        <div ref={endSpaceRef} style={{ height: '400vh' }} />
      </div>

      {/* Black gradient overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, transparent 0%, black 100%)`,
          opacity: gradientOpacity,
          zIndex: 50,
          transition: 'opacity 0.1s ease-out'
        }}
      />
    </section>
  );
};
