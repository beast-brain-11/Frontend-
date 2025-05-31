import React, { useEffect, useRef } from 'react';
import { MessageSquare, Sparkles, Share2 } from 'lucide-react';

const HowItWorks: React.FC = () => {
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

  const steps = [
    {
      icon: <MessageSquare className="h-10 w-10 text-violet-400" />,
      title: "Chat with Agent",
      description: "Collaborate with our intelligent AI to brainstorm concepts and refine your vision."
    },
    {
      icon: <Sparkles className="h-10 w-10 text-fuchsia-400" />,
      title: "AI Generates",
      description: "Our AI transforms your ideas into stunning video advertisements with custom visuals and audio."
    },
    {
      icon: <Share2 className="h-10 w-10 text-blue-400" />,
      title: "Download & Share",
      description: "Export in multiple formats and share directly to social media platforms."
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-20 relative opacity-0 transition-opacity duration-1000"
      id="how-it-works"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-violet-500 to-fuchsia-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto">
            Creating professional video ads has never been easier. Follow these simple steps to generate your perfect advertisement.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 hover:border-violet-500/50 transition-all duration-300 group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-violet-600/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative">
                <div className="flex justify-center items-center w-16 h-16 rounded-full bg-slate-900 mb-6 mx-auto">
                  {step.icon}
                </div>
                
                <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center font-medium text-violet-400">
                  {index + 1}
                </div>
                
                <h3 className="text-xl font-semibold mb-3 text-center">{step.title}</h3>
                <p className="text-slate-400 text-center">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Connector lines between steps (visible on desktop) */}
        <div className="hidden md:block">
          <div className="absolute top-1/2 left-1/3 w-1/6 h-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 transform -translate-y-16"></div>
          <div className="absolute top-1/2 right-1/3 w-1/6 h-0.5 bg-gradient-to-r from-fuchsia-500 to-blue-500 transform -translate-y-16"></div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;