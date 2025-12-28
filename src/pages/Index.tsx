
import { Projects } from "@/components/Projects";
import { Navigation } from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <div className="relative z-10">
        <Navigation />
        <Projects />
      </div>
    </div>
  );
};

export default Index;
