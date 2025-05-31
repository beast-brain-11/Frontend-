import React, { useEffect, useRef } from 'react';
import { 
  Wand2, 
  Sparkles, 
  Clock, 
  Palette, 
  Image, 
  VolumeX, 
  Expand, 
  Target 
} from 'lucide-react';

const Features: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(sectionRef.current);
    
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const features = [
    {
      icon: <Wand2 className="h-6 w-6 text-violet-400" />,
      title: "Creative Collaboration",
      description: "Work together with our AI to develop concepts that align perfectly with your brand and goals."
    },
    {
      icon: <Clock className="h-6 w-6 text-violet-400" />,
      title: "Fast Turnaround",
      description: "Generate professional-quality video ads in minutes instead of days or weeks."
    },
    {
      icon: <Palette className="h-6 w-6 text-violet-400" />,
      title: "Multiple Styles",
      description: "Choose from various visual styles and aesthetics to match your brand identity."
    },
    {
      icon: <Image className="h-6 w-6 text-violet-400" />,
      title: "Custom Visuals",
      description: "Incorporate your own imagery or use our vast library of stock photos and videos."
    },
    {
      icon: <VolumeX className="h-6 w-6 text-violet-400" />,
      title: "AI Voiceover",
      description: "Add professional narration with our natural-sounding AI voices in multiple languages."
    },
    {
      icon: <Sparkles className="h-6 w-6 text-violet-400" />,
      title: "Special Effects",
      description: "Enhance your videos with transitions, animations, and visual effects."
    },
    {
      icon: <Expand className="h-6 w-6 text-violet-400" />,
      title: "Multiple Formats",
      description: "Export your ads in various dimensions optimized for different platforms."
    },
    {
      icon: <Target className="h-6 w-6 text-violet-400" />,
      title: "Performance Analytics",
      description: "Track how your ads perform with integrated analytics and optimization suggestions."
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-20 relative opacity-0 transition-opacity duration-1000"
      id="features"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Features & Benefits</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-violet-500 to-fuchsia-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto">
            Our AI-powered platform offers everything you need to create stunning video advertisements that convert.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-violet-500/30 transition-all duration-300 group"
            >
              <div className="p-3 bg-slate-900 rounded-lg inline-block mb-4 group-hover:bg-violet-900/20 transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-flex p-1 bg-slate-800/80 backdrop-blur-sm rounded-full mb-8">
            <button className="px-6 py-2 text-sm font-medium rounded-full bg-violet-600 text-white">
              Start Free Trial
            </button>
            <button className="px-6 py-2 text-sm font-medium rounded-full text-slate-300 hover:text-white transition-colors">
              View Pricing
            </button>
          </div>
          
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            No credit card required to start. Try our platform free for 7 days and see the difference AI-powered video creation can make for your business.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;