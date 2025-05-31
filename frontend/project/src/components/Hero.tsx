import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!heroRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(heroRef.current);
    
    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current);
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative pt-24 md:pt-32 pb-16 md:pb-24 opacity-0 transition-opacity duration-1000"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-fuchsia-500/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-violet-200 to-fuchsia-200">
            AI Video Ads, Crafted With You
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-3xl mx-auto">
            Collaborate with our AI agent to brainstorm, design, and generate unique video advertisements effortlessly. Transform your ideas into stunning video content in minutes.
          </p>
          
          <div className="group relative inline-flex">
            <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-500 opacity-70 blur-sm group-hover:opacity-100 transition duration-300"></div>
            <a 
              href="#" 
              className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-all duration-300"
            >
              Get Started / Create Your Ad
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </div>
          
          <div className="mt-16 flex justify-center space-x-4 md:space-x-8">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-violet-400 mb-1">500+</div>
              <div className="text-sm text-slate-400">Templates</div>
            </div>
            <div className="w-px h-16 bg-slate-700"></div>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-violet-400 mb-1">24/7</div>
              <div className="text-sm text-slate-400">AI Support</div>
            </div>
            <div className="w-px h-16 bg-slate-700"></div>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-violet-400 mb-1">10K+</div>
              <div className="text-sm text-slate-400">Happy Users</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;